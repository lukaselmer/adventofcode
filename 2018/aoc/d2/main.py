from collections import defaultdict
from typing import DefaultDict, Iterator


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


def find_near_duplicate():
    sets = defaultdict(set)
    for line in read_input():
        for index, variant in enumerate(_variants(line)):
            if variant in sets[index]:
                return variant
            sets[index].add(variant)
    raise RuntimeError("No near-duplicate found")


def _variants(line: str) -> Iterator[str]:
    for index, _ in enumerate(line):
        yield line[0:index] + line[index + 1 : len(line)]


def read_input():
    with open("aoc/d2/input.txt") as file:
        for line in file:
            if line:
                yield line.strip()


if __name__ == "__main__":
    print(checksum())
    print(find_near_duplicate())
