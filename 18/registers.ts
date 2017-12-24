export class Registers {
  sentMessagesCount = 0;
  currentInstructionIndex = 0;
  lastSound: number;
  running = true;
  sendingMessages: number[] = [];
  receivingMessages: number[] = [];

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
    this.sendingMessages.push(message);
    this.sentMessagesCount++;
  }

  hasMessage() {
    return this.receivingMessages.length > 0;
  }

  receiveMessage() {
    const message = this.receivingMessages.shift();
    if (message === undefined) throw new Error("Invalid message received");
    return message;
  }
}
