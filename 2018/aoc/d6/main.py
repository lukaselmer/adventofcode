from __future__ import annotations

from collections import Counter
from typing import List, Tuple

from dataclasses import dataclass


def find_largest_area():
    pairs: List[Tuple[int, int]] = list(_read_input())
    height = max([x for (x, _) in pairs]) + 2
    width = max([y for (_, y) in pairs]) + 2
    matrix = [[Field(value=0, iteration=0) for _ in range(0, height)] for _ in range(0, width)]

    for index, (x_coord, y_coord) in enumerate(pairs):
        matrix[y_coord][x_coord] = Field(value=index + 1, iteration=0)

    for iteration in range(1, 999_999_999):
        # print(iteration)
        # _print(matrix)
        if not _fill_matrix(matrix, iteration):
            break

    # _print(matrix)
    counts = Counter()
    for row in matrix:
        for field in row:
            if field.value != -1:
                counts[field.value] += 1

    for y_coord, row in enumerate(matrix):
        for x_coord, field in enumerate(row):
            if y_coord == 0 or x_coord == 0 or y_coord == len(matrix) - 1 or x_coord == len(matrix[0]):
                counts[field.value] = 0

    return max(counts.values())


def _read_input():
    with open("aoc/d6/input.txt") as file:
        for line in file.readlines():
            if line.strip():
                yield tuple(map(int, line.strip().split(", ")))


def _fill_matrix(matrix: List[List[Field]], iteration: int):
    changed = False
    for y_coord, row in enumerate(matrix):
        for x_coord, field in enumerate(row):
            values = [
                _get_field_value(matrix, y_coord - 1, x_coord, iteration),
                _get_field_value(matrix, y_coord + 1, x_coord, iteration),
                _get_field_value(matrix, y_coord, x_coord - 1, iteration),
                _get_field_value(matrix, y_coord, x_coord + 1, iteration),
            ]
            set_values = {value for value in values if value}
            if len(set_values) >= 1:
                value = set_values.pop() if len(set_values) == 1 else -1
                if field.mark(value, iteration):
                    # print(f"marked {y_coord}, {x_coord} with {value}")
                    changed = True

    return changed


def _get_field_value(matrix: List[List[Field]], y_coord: int, x_coord: int, iteration: int):
    if 0 <= y_coord < len(matrix) and 0 <= x_coord < len(matrix[y_coord]):
        field = matrix[y_coord][x_coord]
        if field.iteration < iteration:
            return field.value
    return 0


def _print(matrix: List[List[Field]]):
    print()
    for line in matrix:
        print("".join([f"{_convert_number(num.value)}" for num in line]))
    print()


def _convert_number(value: int):
    if value == 0:
        return "-"
    if value == -1:
        return "."
    return value


@dataclass
class Field:
    value: int
    iteration: int

    def mark(self, value: int, iteration: int):
        if self.iteration and self.iteration < iteration:
            return False

        self.iteration = iteration

        if self.value == value:
            return False

        if self.value:
            self.value = -1
        else:
            self.value = value
        return True


if __name__ == "__main__":
    print(find_largest_area())
