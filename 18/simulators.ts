import { Instruction } from "./instructions";
import { Registers } from "./registers";

export class SoundCardSimulator {
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

export class ProcSimulator {
  constructor(private instructions: Instruction[]) {}

  runUntilDeadlock() {
    const p0 = new Registers();
    p0.set("p", 0);

    const p1 = new Registers();
    p1.set("p", 1);

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
