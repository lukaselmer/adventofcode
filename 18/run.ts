import * as fs from "fs";

export function run() {
  console.log(
    `Example part 1: ${new SoundCardSimulator(
      readInstructions("example", 1)
    ).runUntilRecover()}`
  );
  console.log(
    `Part 1: ${new SoundCardSimulator(
      readInstructions("input", 1)
    ).runUntilRecover()}`
  );
  console.log(
    `Example part 2: ${new ProcSimulator(
      readInstructions("example-procs", 2)
    ).runUntilDeadlock()}`
  );
  console.log(
    `Part 2: ${new ProcSimulator(
      readInstructions("input", 2)
    ).runUntilDeadlock()}`
  );
}

function readInstructions(filename: string, part: number) {
  return fs
    .readFileSync(`./18/${filename}.txt`)
    .toString()
    .trim()
    .split("\n")
    .map(line => line.trim())
    .map(line => convertToInstruction(part, ...line.split(" ")));
}

function convertToInstruction(
  part: number,
  operation?: string,
  register?: string,
  registerOrValueAsString?: string
): Instruction {
  if (!operation || !register)
    throw new Error(
      `Operation and register must be set, but got ${operation} and ${register}`
    );

  if (part === 1) {
    if (operation === "snd") return new SoundInstruction(register);
    if (operation === "rcv") return new RecoverInstruction(register);
  } else {
    if (operation === "snd") return new SendInstruction(register);
    if (operation === "rcv") return new ReceiveInstruction(register);
  }

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

// @ts-ignore
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

class ProcSimulator {
  constructor(private instructions: Instruction[]) {}

  runUntilDeadlock() {
    const p0 = new Registers();
    p0.set("p", 0);
    p0.pid = 0;

    const p1 = new Registers();
    p1.set("p", 1);
    p1.pid = 1;

    while (p0.running || p1.running) {
      while (p0.running) this.run(p0);
      while (p1.running) this.run(p1);
      this.sendMessages(p0, p1);
      this.sendMessages(p1, p0);
      if (!p0.running) p0.running = p0.hasMessage();
      if (!p1.running) p1.running = p1.hasMessage();
    }

    return p1.sentMessagesCount;
  }

  sendMessages(sender: Registers, receiver: Registers) {
    while (sender.sendingMessages.length > 0)
      receiver.receivingMessages.push(sender.sendingMessages.shift() as number);
  }

  run(registers: Registers) {
    const instruction = this.instructions[registers.currentInstructionIndex];
    instruction.apply(registers);
    if (registers.running) registers.currentInstructionIndex += 1;
  }
}

class Registers {
  sentMessagesCount = 0;
  currentInstructionIndex = 0;
  lastSound: number;
  running = true;
  sendingMessages: number[] = [];
  receivingMessages: number[] = [];
  pid = 0;

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

  sendMessage(message: number) {
    // console.log(`Sending ${message} from ${this.pid}`);
    this.sendingMessages.push(message);
    this.sentMessagesCount++;
  }

  hasMessage() {
    return this.receivingMessages.length > 0;
  }

  receiveMessage() {
    const message = this.receivingMessages.shift();
    // console.log(`Receiving ${message} in ${this.pid}`);
    if (message === undefined) throw new Error("Invalid message received");
    return message;
  }
}

interface Instruction {
  apply(registers: Registers): void;
}

class SoundInstruction implements Instruction {
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

class SendInstruction implements Instruction {
  constructor(private register: string) {}

  apply(registers: Registers) {
    registers.sendMessage(registers.get(this.register));
  }
}

class ReceiveInstruction implements Instruction {
  constructor(private register: string) {}

  apply(registers: Registers) {
    if (registers.hasMessage())
      registers.set(this.register, registers.receiveMessage());
    else registers.halt();
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
    if (this.register !== "1" && registers.get(this.register) <= 0) return;
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
