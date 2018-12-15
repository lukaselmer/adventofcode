from __future__ import annotations

from typing import List, Tuple


def scores_after(num_recipies: int):
    elf_positions = (0, 1)
    recipies = [3, 7]
    while len(recipies) <= num_recipies + 12:
        elf_positions = _make_recipies(elf_positions, recipies)
    return "".join([str(score) for score in recipies[num_recipies : num_recipies + 10]])


def _make_recipies(elf_positions: Tuple[int, int], recipies: List[int]):
    recipie = recipies[elf_positions[0]] + recipies[elf_positions[1]]
    if recipie >= 10:
        recipies.append(1)
    recipies.append(recipie % 10)

    return (
        (elf_positions[0] + recipies[elf_positions[0]] + 1) % len(recipies),
        (elf_positions[1] + recipies[elf_positions[1]] + 1) % len(recipies),
    )


if __name__ == "__main__":
    print(scores_after(825401))
