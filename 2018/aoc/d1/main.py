def sum_up():
    total = 0
    for number in read_input():
        total += number
    return total


def first_repetition():
    total = 0
    frequencies = set([0])
    while True:
        for number in read_input():
            total += number
            if total in frequencies:
                return total
            frequencies.add(total)


def read_input():
    with open("aoc/d1/input.txt") as file:
        for line in file:
            if line:
                yield int(line.strip())


if __name__ == "__main__":
    print(sum_up())
    print(first_repetition())
