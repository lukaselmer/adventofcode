from collections import defaultdict
from typing import DefaultDict


def checksum():
    counts = defaultdict(int)
    for line in read_input():
        occurrences = _count_occurrences(line)
        if 2 in occurrences:
            counts[2] += 1
        if 3 in occurrences:
            counts[3] += 1
    return counts[2] * counts[3]


def _count_occurrences(line: str):
    counts: DefaultDict[str, int] = defaultdict(int)
    for char in line:
        counts[char] += 1
    return set(counts.values())


def read_input():
    with open("aoc/d2/input.txt") as file:
        for line in file:
            if line:
                yield line.strip()


if __name__ == "__main__":
    print(checksum())
