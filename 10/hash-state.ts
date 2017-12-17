export class HashState {
  currentPosition = 0;
  skipSize = 0;

  constructor(public state: number[]) {}

  mutate(num: number) {
    let sublist = this.state.slice(
      this.currentPosition,
      this.currentPosition + num
    );
    if (sublist.length < num)
      sublist = sublist.concat(this.state.slice(0, num - sublist.length));

    sublist.reverse();
    sublist.forEach(
      (value, index) =>
        (this.state[(this.currentPosition + index) % this.state.length] = value)
    );

    this.currentPosition =
      (num + this.currentPosition + this.skipSize) % this.state.length;
    this.skipSize++;
  }

  part1Result() {
    return this.state[0] * this.state[1];
  }
}
