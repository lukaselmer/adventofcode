from __future__ import annotations

from typing import Tuple

from dataclasses import dataclass


def best_position_distance(filename: str):
    nanobots = list(_read_nanobots(filename))

    x_coords = [bot.position[0] for bot in nanobots]
    y_coords = [bot.position[1] for bot in nanobots]
    z_coords = [bot.position[2] for bot in nanobots]

    zoom = 1.0
    while zoom < max(x_coords) - min(x_coords):
        zoom *= 2

    while True:
        best_count = 0
        best_position = (0, 0, 0)
        best_distance = 999_999_999_999
        for x in range(min(x_coords), max(x_coords) + 1, int(zoom) + 1):
            for y in range(min(y_coords), max(y_coords) + 1, int(zoom) + 1):
                for z in range(min(z_coords), max(z_coords) + 1, int(zoom) + 1):
                    count = count_bots_in_range(nanobots, x, y, z, zoom)
                    current_distance = abs(x) + abs(y) + abs(z)
                    if best_count < count:
                        best_count = count
                        best_distance = current_distance
                        best_position = (x, y, z)
                    elif count == best_count and current_distance < best_distance:
                        best_distance = current_distance
                        best_position = (x, y, z)

        if zoom == 1:
            return best_count, best_position, best_distance

        x_coords = [best_position[0] - int(zoom), best_position[0] + int(zoom)]
        y_coords = [best_position[1] - int(zoom), best_position[1] + int(zoom)]
        z_coords = [best_position[2] - int(zoom), best_position[2] + int(zoom)]
        zoom = zoom / 2.01
        if zoom <= 1:
            zoom = 1


def count_bots_in_range(nanobots, x, y, z, dist):
    count = 0
    for nanobot in nanobots:
        if dist <= 4:
            if nanobot.in_range_of((x, y, z)):
                count += 1
        else:
            distance = (
                abs(x // dist - nanobot.position[0] // dist)
                + abs(y // dist - nanobot.position[1] // dist)
                + abs(z // dist - nanobot.position[2] // dist)
            )
            if distance - 1 <= nanobot.signal // dist:
                count += 1
    return count


def nanobots_in_radius(filename: str):
    nanobots = list(_read_nanobots(filename))
    boss_nanobot = max(nanobots, key=lambda nanobot: nanobot.signal)
    return len([nanobot for nanobot in nanobots if boss_nanobot.in_range_of(nanobot.position)])


def nanobots_in_range_of(filename: str):
    position = (15_972_003, 44_657_553, 29_285_970)
    nanobots = list(_read_nanobots(filename))
    return len([nanobot for nanobot in nanobots if nanobot.in_range_of(position)])


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
        return self.distance_to(other_position) <= self.signal

    def distance_to(self, other_position: Tuple[int, int, int]):
        return (
            abs(self.position[0] - other_position[0])
            + abs(self.position[1] - other_position[1])
            + abs(self.position[2] - other_position[2])
        )


if __name__ == "__main__":
    print(nanobots_in_radius("input"))
    print(nanobots_in_range_of("input"))
    print(best_position_distance("input"))
