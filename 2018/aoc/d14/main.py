from __future__ import annotations

from typing import List, Tuple


def time_to_produce(goal_recipies_str: str):
    elf_positions = (4, 6)
    recipies = [3, 7, 1, 0, 1, 0, 1]
    index = 0
    goal_recipies = list(map(int, list(goal_recipies_str)))
    while True:
        number_of_new_recipies, elf_positions = _make_recipies(elf_positions, recipies)
        if number_of_new_recipies == 1:
            if (
                recipies[index] == goal_recipies[0]
                and recipies[index + 1] == goal_recipies[1]
                and recipies[index + 2] == goal_recipies[2]
                and recipies[index + 3] == goal_recipies[3]
                and recipies[index + 4] == goal_recipies[4]
                and recipies[index + 5] == goal_recipies[5]
            ):
                return index
            index += 1
        else:
            if (
                recipies[index] == goal_recipies[0]
                and recipies[index + 1] == goal_recipies[1]
                and recipies[index + 2] == goal_recipies[2]
                and recipies[index + 3] == goal_recipies[3]
                and recipies[index + 4] == goal_recipies[4]
                and recipies[index + 5] == goal_recipies[5]
            ):
                return index
            index += 1
            if (
                recipies[index] == goal_recipies[0]
                and recipies[index + 1] == goal_recipies[1]
                and recipies[index + 2] == goal_recipies[2]
                and recipies[index + 3] == goal_recipies[3]
                and recipies[index + 4] == goal_recipies[4]
                and recipies[index + 5] == goal_recipies[5]
            ):
                return index
            index += 1


def scores_after(num_recipies: int):
    elf_positions = (0, 1)
    recipies = [3, 7]
    while len(recipies) <= num_recipies + 12:
        _, elf_positions = _make_recipies(elf_positions, recipies)
    return "".join([str(score) for score in recipies[num_recipies : num_recipies + 10]])


def _make_recipies(elf_positions: Tuple[int, int], recipies: List[int]):
    recipie = recipies[elf_positions[0]] + recipies[elf_positions[1]]
    if recipie >= 10:
        recipies.append(1)
    recipies.append(recipie % 10)

    return (
        2 if recipie >= 10 else 1,
        (
            (elf_positions[0] + recipies[elf_positions[0]] + 1) % len(recipies),
            (elf_positions[1] + recipies[elf_positions[1]] + 1) % len(recipies),
        ),
    )


if __name__ == "__main__":
    print(scores_after(825401))
    print(time_to_produce("825401"))
