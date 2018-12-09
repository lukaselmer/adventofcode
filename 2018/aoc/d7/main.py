from __future__ import annotations

from collections import defaultdict
from typing import DefaultDict, List, Set, Tuple


def step_order():
    assembly_steps: List[Tuple[str, str]] = list(_read_input())
    requirements, following, starting_steps = _prepare_datastructures(assembly_steps)
    return "".join(_assemble_sledge_simple(requirements, following, starting_steps))


def _assemble_sledge_simple(
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


def time_required(seconds_per_step: int, workers: int):
    assembly_steps: List[Tuple[str, str]] = list(_read_input())
    requirements, following, starting_steps = _prepare_datastructures(assembly_steps)
    return _assemble_sledge_concurrent(
        seconds_per_step, workers, requirements, following, starting_steps
    )


def _assemble_sledge_concurrent(
    fixed_seconds_per_step: int,
    workers: int,
    requirements: DefaultDict[str, Set[str]],
    following: DefaultDict[str, Set[str]],
    starting_steps: Set[str],
):
    working: List[Tuple[str, int]] = []
    seconds_passed = 0
    while starting_steps or working:
        if starting_steps and len(working) < workers:
            current_step: str = sorted(starting_steps)[0]
            starting_steps.remove(current_step)
            until = seconds_passed + fixed_seconds_per_step + _seconds_per_step(current_step)
            working.append((current_step, until))
        else:
            seconds_passed = min([until for _, until in working])
            finishing = [step for step, until in working if until == seconds_passed]
            working = [(step, until) for step, until in working if until != seconds_passed]

            for current_step in finishing:
                for next_step in following[current_step]:
                    requirements[next_step].remove(current_step)
                    if not requirements[next_step]:
                        starting_steps.add(next_step)

    return seconds_passed


def _seconds_per_step(letter: str):
    return ord(letter) - ord("A") + 1


def _prepare_datastructures(assembly_steps: List[Tuple[str, str]]):
    requirements: DefaultDict[str, Set[str]] = defaultdict(set)
    following: DefaultDict[str, Set[str]] = defaultdict(set)
    for before, after in assembly_steps:
        requirements[after].add(before)
        following[before].add(after)

    starting_steps = set()
    for before, after in assembly_steps:
        if not requirements[before]:
            starting_steps.add(before)
        if not requirements[after]:
            starting_steps.add(after)

    return requirements, following, starting_steps


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
    print(time_required(60, 5))
