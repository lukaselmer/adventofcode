import { Group } from "./group";

export class Parser {
  private state: ("nothing" | "group" | "garbage" | "ignore")[] = ["nothing"];
  private groups = [new Group()];

  constructor(private input: string) {}

  parse(): Group {
    this.input.split("").forEach(char => this.next(char));
    if (this.groups.length !== 1)
      throw new Error(
        `Groups should exactly contain root group, but actually are ${
          this.groups
        }`
      );
    return this.currentGroup;
  }

  private next(char: string) {
    switch (this.state[this.state.length - 1]) {
      case "nothing":
        if (char === "{") return this.startGroup();
        if (char === "!") return this.startIgnore();
        if (char === "<") return this.startGarbage();
        throw new Error(`Unexpected char ${char} in state ${this.state}`);

      case "group":
        if (char === "{") return this.startGroup();
        if (char === "}") return this.endGroup();
        if (char === "!") return this.startIgnore();
        if (char === "<") return this.startGarbage();
        return this.appendGroup(char);

      case "garbage":
        if (char === "!") return this.startIgnore();
        if (char === ">") return this.endGarbage();
        return this.appendGarbage(char);

      case "ignore":
        return this.endIgnore(char);
    }
  }

  private startIgnore() {
    this.state.push("ignore");
  }

  private endIgnore(_char: string) {
    this.state.pop();
  }

  private startGarbage() {
    this.state.push("garbage");
  }

  private appendGarbage(_char: string) {
    this.currentGroup.addGarbage();
  }

  private endGarbage() {
    this.state.pop();
  }

  private startGroup() {
    this.state.push("group");
    this.groups.push(new Group());
  }

  private appendGroup(_char: string) {
    // Nothing to do here (yet)
  }

  private endGroup() {
    this.state.pop();
    const closedGroup = this.groups.pop();

    if (!closedGroup)
      throw new Error(`Group should not be defined, but is ${closedGroup}`);

    this.currentGroup.addGroup(closedGroup);
  }

  get currentGroup() {
    return this.groups[this.groups.length - 1];
  }
}
