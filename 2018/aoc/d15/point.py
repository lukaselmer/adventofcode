from typing import Tuple

Point = Tuple[int, int]


def next_to_each_other(point_a: Point, point_b: Point):
    return point_a in neighbors(point_b)


def neighbors(point: Point):
    return [
        (point[0] + 1, point[1]),
        (point[0] - 1, point[1]),
        (point[0], point[1] + 1),
        (point[0], point[1] - 1),
    ]
