from __future__ import annotations

from typing import Set, Tuple

from aoc.d20.maze import build_maze


def main():
    regex = open("aoc/d20/input.txt").read().strip()
    print(longest_path(regex))


def longest_path(regex: str, count_farther_away_than: int = 1000):
    doors = build_maze(regex).doors
    opened_doors: Set[Tuple[Tuple[int, int], Tuple[int, int]]] = set()
    positions: Set[Tuple[int, int]] = {(0, 0)}
    rooms_near: Set[Tuple[int, int]] = set()
    rooms_all: Set[Tuple[int, int]] = set()
    counter = 0
    while doors != opened_doors:
        new_positions = set()
        for position in positions:
            for door in _doors_from_position(position):
                if door not in opened_doors and door in doors:
                    opened_doors.add(door)
                    new_positions.add(door[0])
                    new_positions.add(door[1])
                    rooms_all.add(door[0])
                    rooms_all.add(door[1])
                    if counter < count_farther_away_than - 1:
                        rooms_near.add(door[0])
                        rooms_near.add(door[1])
        positions = new_positions
        counter += 1
    return counter, len(rooms_all) - len(rooms_near)


def _doors_from_position(position: Tuple[int, int]):
    return {
        (position, (position[0] + 1, position[1])),
        (position, (position[0], position[1] + 1)),
        ((position[0] - 1, position[1]), position),
        ((position[0], position[1] - 1), position),
    }


if __name__ == "__main__":
    main()
