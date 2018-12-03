def run():
    total = 0
    for number in read_input():
        total += number
    return total


def read_input():
    with open("aoc/d1/input.txt") as file:
        for line in file:
            yield int(line.strip())


if __name__ == "__main__":
    print(run())
