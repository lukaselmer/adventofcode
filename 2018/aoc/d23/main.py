from __future__ import annotations

from typing import Tuple

from dataclasses import dataclass


def best_position_distance(filename: str):
    nanobots = list(_read_nanobots(filename))
    return 42


def nanobots_in_radius(filename: str):
    nanobots = list(_read_nanobots(filename))
    boss_nanobot = max(nanobots, key=lambda nanobot: nanobot.signal)
    return len([nanobot for nanobot in nanobots if boss_nanobot.in_range_of(nanobot.position)])


def _read_nanobots(filename: str):
    for line in _read_lines(filename):
        pos_str, signal = line.split(" ")
        pos_a, pos_b, pos_c = map(int, pos_str.split(","))
        yield Nanobot(int(signal), (pos_a, pos_b, pos_c))


def _read_lines(filename: str):
    with open(f"aoc/d23/{filename}.txt") as file:
        return file.read().strip().replace("pos=<", "").replace(">, r=", " ").split("\n")


@dataclass
class Nanobot:
    signal: int
    position: Tuple[int, int, int]

    def in_range_of(self, other_position: Tuple[int, int, int]):
        distance = (
            abs(self.position[0] - other_position[0])
            + abs(self.position[1] - other_position[1])
            + abs(self.position[2] - other_position[2])
        )
        return distance <= self.signal


if __name__ == "__main__":
    print(nanobots_in_radius("input"))
