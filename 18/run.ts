import * as fs from "fs";

export function run() {
  console.log(
    `Example part 1: ${readInstructions("example").runUntilRecover()}`
  );
  console.log(`Part 1: ${readInstructions("input").runUntilRecover()}`);
}

function readInstructions(filename: string) {
  return new SoundCardSimulator(
    fs
      .readFileSync(`./18/${filename}.txt`)
      .toString()
      .trim()
      .split("\n")
      .map(line => line.trim())
      .map(line => convertToInstruction(...line.split(" ")))
  );
}

function convertToInstruction(
  operation?: string,
  register?: string,
  registerOrValueAsString?: string
): Instruction {
  if (!operation || !register)
    throw new Error(
      `Operation and register must be set, but got ${operation} and ${register}`
    );

  if (operation === "snd") return new SendInstruction(register);
  if (operation === "rcv") return new RecoverInstruction(register);

  if (!registerOrValueAsString)
    throw new Error(
      `Register or value expected for ${operation} with register ${register}`
    );

  const registerOrValue = convertRegisterOrValue(registerOrValueAsString);

  switch (operation) {
    case "set":
      return new SetInstruction(register, registerOrValue);
    case "add":
      return new AddInstruction(register, registerOrValue);
    case "mul":
      return new MultiplyInstruction(register, registerOrValue);
    case "mod":
      return new ModuloInstruction(register, registerOrValue);
    case "jgz":
      return new JumpInstruction(register, registerOrValue);
    default:
      throw new Error(
        `Unknown instruction ${operation} with parameters ${register}, ${registerOrValue}`
      );
  }
}

function convertRegisterOrValue(
  registerOrValueAsString: string
): string | number {
  const num = parseInt(registerOrValueAsString, 10);
  if (isNaN(num)) return registerOrValueAsString;
  return num;
}

class Registers {
  currentInstructionIndex = 0;
  lastSound: number;
  running = true;

  private registers: { [register: string]: number | undefined } = {};

  get(register: string): number {
    const value = this.registers[register];
    if (value === undefined) return 0;
    return value;
  }

  set(register: string, value: number) {
    this.registers[register] = value;
  }

  storeSound(sound: number) {
    this.lastSound = sound;
  }

  halt() {
    this.running = false;
  }
}

class SoundCardSimulator {
  constructor(private instructions: Instruction[]) {}

  runUntilRecover() {
    const registers = new Registers();
    while (registers.running) {
      const instruction = this.instructions[registers.currentInstructionIndex];
      instruction.apply(registers);
      registers.currentInstructionIndex += 1;
    }
    return registers.lastSound;
  }
}

interface Instruction {
  apply(registers: Registers): void;
}

class SendInstruction implements Instruction {
  constructor(private register: string) {}

  apply(registers: Registers) {
    registers.storeSound(registers.get(this.register));
  }
}

class RecoverInstruction implements Instruction {
  constructor(private register: string) {}

  apply(registers: Registers) {
    if (registers.get(this.register) === 0) return;
    registers.halt();
  }
}

abstract class ValueInstruction {
  constructor(
    protected register: string,
    private registerOrValue: string | number
  ) {}

  getValue(registers: Registers) {
    if (typeof this.registerOrValue === "number") return this.registerOrValue;
    return registers.get(this.registerOrValue);
  }
}

class JumpInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    if (registers.get(this.register) <= 0) return;
    registers.currentInstructionIndex += this.getValue(registers) - 1;
  }
}

class SetInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    registers.set(this.register, this.getValue(registers));
  }
}

class AddInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    const newValue = registers.get(this.register) + this.getValue(registers);
    registers.set(this.register, newValue);
  }
}

class MultiplyInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    const newValue = registers.get(this.register) * this.getValue(registers);
    registers.set(this.register, newValue);
  }
}

class ModuloInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    const newValue = registers.get(this.register) % this.getValue(registers);
    registers.set(this.register, newValue);
  }
}

run();
