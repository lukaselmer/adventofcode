from __future__ import annotations

from typing import List, Tuple


def largest_grid_value_coords(serial_number: int):
    matrix = [
        [Cell(serial_number=serial_number, position=(x_coord, y_coord)) for y_coord in range(1, 302)]
        for x_coord in range(1, 302)
    ]

    maximum = ((-1, -1), -1_000_000)
    for x_coord in range(1, 299):
        for y_coord in range(1, 299):
            current_sum = _sum_in_square(matrix, (x_coord, y_coord))
            if maximum[1] < current_sum:
                maximum = ((x_coord + 1, y_coord + 1), current_sum)

    return maximum[0]


def _sum_in_square(matrix: List[List[Cell]], position):
    return sum(
        [
            matrix[position[0] + x_coord][position[1] + y_coord].value
            for x_coord in range(0, 3)
            for y_coord in range(0, 3)
        ]
    )


class Cell:
    value: int

    def __init__(self, serial_number: int, position: Tuple[int, int]):
        self.value = _calculate_value(serial_number, position)


def _calculate_value(serial_number: int, position: Tuple[int, int]):
    x_coord, y_coord = position
    power_level = (
        x_coord * x_coord * y_coord
        + x_coord * y_coord * 20
        + y_coord * 100
        + serial_number * x_coord
        + serial_number * 10
    )
    power_level = (power_level // 100) % 10
    return power_level - 5


if __name__ == "__main__":
    print(largest_grid_value_coords(9445))
