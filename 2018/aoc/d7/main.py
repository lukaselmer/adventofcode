from __future__ import annotations

from collections import defaultdict
from typing import DefaultDict, List, Set, Tuple


def step_order():
    assembly_steps: List[Tuple[str, str]] = list(_read_input())
    requirements = defaultdict(set)
    following = defaultdict(set)
    for before, after in assembly_steps:
        requirements[after].add(before)
        following[before].add(after)

    starting_steps = set()
    for before, after in assembly_steps:
        if not requirements[before]:
            starting_steps.add(before)
        if not requirements[after]:
            starting_steps.add(after)

    return "".join(_assemble_sledge(requirements, following, starting_steps))


def _assemble_sledge(
    requirements: DefaultDict[str, Set[str]],
    following: DefaultDict[str, Set[str]],
    starting_steps: Set[str],
):
    while starting_steps:
        current_step = sorted(starting_steps)[0]
        yield current_step
        starting_steps.remove(current_step)

        for next_step in following[current_step]:
            requirements[next_step].remove(current_step)
            if not requirements[next_step]:
                starting_steps.add(next_step)


def _read_input():
    with open("aoc/d7/input.txt") as file:
        for line in file.readlines():
            if line.strip():
                simlified = (
                    line.strip()
                    .replace("Step ", "")
                    .replace(" must be finished before step", "")
                    .replace(" can begin.", "")
                )
                yield tuple(simlified.split(" "))


if __name__ == "__main__":
    print(step_order())
