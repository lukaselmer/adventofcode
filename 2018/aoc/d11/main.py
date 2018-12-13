from __future__ import annotations

from typing import List, Tuple


def largest_grid_value_coords(serial_number: int):
    maximum = ((-1, -1, -1), -1_000_000)
    for size in range(1, 301):
        print(size, end=" ", flush=True)
        current = _largest_grid_value_coords_of(_matrix(serial_number), size)
        if maximum[1] < current[1]:
            maximum = ((current[0][0], current[0][1], size), current[1])

    return maximum[0]


def largest_grid_value_coords_of_3x3(serial_number: int):
    return _largest_grid_value_coords_of(_matrix(serial_number), 3)[0]


def _matrix(serial_number: int):
    return [
        [
            _calculate_value(serial_number=serial_number, position=(x_coord, y_coord))
            for y_coord in range(1, 302)
        ]
        for x_coord in range(1, 302)
    ]


def _largest_grid_value_coords_of(matrix: List[List[int]], size: int):
    maximum = ((-1, -1), -1_000_000)
    for x_coord in range(0, 302 - size):
        for y_coord in range(0, 302 - size):
            current_sum = _sum_in_square(matrix, (x_coord, y_coord), size)
            if maximum[1] < current_sum:
                maximum = ((x_coord + 1, y_coord + 1), current_sum)

    return maximum


def _sum_in_square(matrix: List[List[int]], position: Tuple[int, int], size: int):
    return sum(
        [
            matrix[position[0] + x_coord][position[1] + y_coord]
            for x_coord in range(0, size)
            for y_coord in range(0, size)
        ]
    )


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
    print(largest_grid_value_coords_of_3x3(9445))
