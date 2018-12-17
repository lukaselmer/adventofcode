from __future__ import annotations

from typing import List, Tuple

from dataclasses import dataclass


@dataclass
class Light:
    coords: Tuple[int, int]
    velocity: Tuple[int, int]

    def step(self):
        self.coords = (self.coords[0] + self.velocity[0], self.coords[1] + self.velocity[1])

    def unstep(self):
        self.coords = (self.coords[0] - self.velocity[0], self.coords[1] - self.velocity[1])


class Simulator:
    def __init__(self):
        self.last_field_size = 999_999_999
        self.lights: List[Light] = _parse_coordinates()

    def __str__(self):
        x_min = min([light.coords[0] for light in self.lights])
        y_min = min([light.coords[1] for light in self.lights])
        x_max = max([light.coords[0] for light in self.lights])
        y_max = max([light.coords[1] for light in self.lights])
        matrix = [["." for _ in range(x_min, x_max + 1)] for _ in range(y_min, y_max + 1)]
        for light in self.lights:
            matrix[light.coords[1] - y_min][light.coords[0] - x_min] = "#"
        return "\n".join(["".join(row) for row in matrix])

    def run(self):
        seconds = 0
        while not self._interesting_lights():
            # print(".", end="", flush=True)
            self.simulate_step()
            seconds += 1
        self.unsimulate_step()
        return seconds - 1

    def simulate_step(self):
        for light in self.lights:
            light.step()

    def unsimulate_step(self):
        for light in self.lights:
            light.unstep()

    def _interesting_lights(self):
        x_min = min([light.coords[0] for light in self.lights])
        y_min = min([light.coords[1] for light in self.lights])
        x_max = max([light.coords[0] for light in self.lights])
        y_max = max([light.coords[1] for light in self.lights])
        field_size = x_max - x_min + y_max - y_min
        if self.last_field_size < field_size:
            return True

        self.last_field_size = field_size
        return False


def _parse_coordinates() -> List[Light]:
    content = list(_read_input())
    return [_parse_coordinate(numbers) for numbers in content]


def _parse_coordinate(numbers: Tuple[int, int, int, int]):
    x_coord, y_coord, x_velocity, y_velocity = numbers
    return Light(coords=(x_coord, y_coord), velocity=(x_velocity, y_velocity))


def _read_input():
    with open("aoc/d10/input.txt") as file:
        for line in file.readlines():
            if line.strip():
                simlified = " ".join(
                    line.strip()
                    .replace("position=<", " ")
                    .replace("> velocity=<", " ")
                    .replace(">", "")
                    .replace(",", "")
                    .strip()
                    .split()
                )
                yield tuple(map(int, simlified.split(" ")))


def main():
    simulator = Simulator()
    seconds = simulator.run()
    print()
    print(simulator)
    print()
    print(f"Message appeared after {seconds} seconds")
    print()


if __name__ == "__main__":
    main()
