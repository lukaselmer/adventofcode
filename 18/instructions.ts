import { Registers } from "./registers";

export function convertToInstruction(
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
    case "sub":
      return new SubtractInstruction(register, registerOrValue);
    case "mul":
      return new MultiplyInstruction(register, registerOrValue);
    case "mod":
      return new ModuloInstruction(register, registerOrValue);
    case "jgz":
      return new JumpIfGtZeroInstruction(register, registerOrValue);
    case "jnz":
      return new JumpIfNotZeroInstruction(register, registerOrValue);
    default:
      throw new Error(
        `Unknown instruction ${operation} with parameters ${register}, ${registerOrValue}`
      );
  }
}

export function convertRegisterOrValue(
  registerOrValueAsString: string
): string | number {
  const num = parseInt(registerOrValueAsString, 10);
  if (isNaN(num)) return registerOrValueAsString;
  return num;
}

export interface Instruction {
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

abstract class JumpInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  jump(registers: Registers) {
    registers.currentInstructionIndex += this.getValue(registers) - 1;
  }
}

class JumpIfGtZeroInstruction extends JumpInstruction {
  apply(registers: Registers) {
    if (this.register !== "1" && registers.get(this.register) <= 0) return;
    this.jump(registers);
  }
}

class JumpIfNotZeroInstruction extends JumpInstruction {
  apply(registers: Registers) {
    if (this.register !== "1" && registers.get(this.register) === 0) return;
    this.jump(registers);
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

class SubtractInstruction extends ValueInstruction {
  constructor(register: string, registerOrValue: string | number) {
    super(register, registerOrValue);
  }

  apply(registers: Registers) {
    const newValue = registers.get(this.register) - this.getValue(registers);
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
    registers.multiplicationsCount += 1;
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
