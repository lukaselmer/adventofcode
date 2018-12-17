from __future__ import annotations

from typing import Any, Dict, List, Tuple


def largest_grid_value_coords(serial_number: int):
    cache: Dict[Any, int] = dict()
    maximum = ((-1, -1, -1), -1_000_000)
    for size in range(1, 301):
        # print(size, end=" ", flush=True)
        current = _largest_grid_value_coords_of(cache, _matrix(serial_number), size)
        if maximum[1] < current[1]:
            maximum = ((current[0][0], current[0][1], size), current[1])

    return maximum[0]


def largest_grid_value_coords_of_3x3(serial_number: int):
    return _largest_grid_value_coords_of(dict(), _matrix(serial_number), 3)[0]


def _matrix(serial_number: int):
    return [
        [
            _calculate_value(serial_number=serial_number, position=(x_coord, y_coord))
            for y_coord in range(1, 302)
        ]
        for x_coord in range(1, 302)
    ]


def _largest_grid_value_coords_of(cache: Dict[Any, int], matrix: List[List[int]], size: int):
    maximum = ((-1, -1), -1_000_000)
    current_sum = -999_999_999
    for y_coord in range(0, 302 - size):
        for x_coord in range(0, 302 - size):
            current_sum = _sum_in_square(cache, matrix, (x_coord, y_coord), size)
            if maximum[1] < current_sum:
                maximum = ((x_coord + 1, y_coord + 1), current_sum)

    return maximum


def _sum_in_square(cache: Dict[Any, int], matrix: List[List[int]], position: Tuple[int, int], size: int):
    cache_key = (position[0], position[1], size)
    if cache_key in cache:
        return cache[cache_key]

    if size == 1:
        return matrix[position[0]][position[1]]

    cache[cache_key] = (
        _sum_in_square(cache, matrix, position, size - 1)
        + _sum_horizontal_line(cache, matrix, (position[0] + size - 1, position[1]), size)
        + _sum_vertical_line(cache, matrix, (position[0], position[1] + size - 1), size - 1)
    )
    return cache[cache_key]


def _sum_horizontal_line(
    cache: Dict[Any, int], matrix: List[List[int]], position: Tuple[int, int], size: int
):
    if size == 1:
        return matrix[position[0]][position[1]]

    cache_key = (-1, position[0], position[1], size)
    if not cache_key in cache:
        cache[cache_key] = (
            _sum_horizontal_line(cache, matrix, position, size - 1)
            + matrix[position[0]][position[1] + size - 1]
        )

    return cache[cache_key]


def _sum_vertical_line(
    cache: Dict[Any, int], matrix: List[List[int]], position: Tuple[int, int], size: int
):
    if size == 1:
        return matrix[position[0]][position[1]]

    cache_key = (-2, position[0], position[1], size)
    if not cache_key in cache:
        cache[cache_key] = (
            _sum_vertical_line(cache, matrix, position, size - 1)
            + matrix[position[0] + size - 1][position[1]]
        )

    return cache[cache_key]


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
    print(largest_grid_value_coords(9445))
