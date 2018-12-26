from __future__ import annotations

from typing import Dict, Tuple

from dataclasses import dataclass

Coordinate = Tuple[int, int]

# def shortest_path(depth: int, target: Coordinate):
#     checked = {(0, 0)}


def total_risk_level(depth: int, target: Coordinate):
    cave = Cave(depth, target, dict())
    coords = [(x, y) for x in range(target[0] + 1) for y in range(target[1] + 1)]
    risk_levels = {coord: _risk_level(cave, coord) for coord in coords}
    return sum([risk_levels[coord] for coord in coords])


def _risk_level(cave: Cave, coord: Coordinate):
    geo_index = _geo_index(cave, coord)
    return _erosion_levels(cave, geo_index) % 3


def _geo_index(cave: Cave, coord: Coordinate):
    if coord not in cave.geo_indices:
        if coord in {cave.target, (0, 0)}:
            return 0

        x, y = coord

        # If the region's Y coordinate is 0, the geo index is its X coordinate times 16807.
        if y == 0:
            return x * 16807

        # If the region's X coordinate is 0, the geo index is its Y coordinate times 48271.
        if x == 0:
            return y * 48271

        # Otherwise, the region's geo index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
        geo_index_a = _geo_index(cave, (x - 1, y))
        geo_index_b = _geo_index(cave, (x, y - 1))
        cave.geo_indices[coord] = _erosion_levels(cave, geo_index_a) * _erosion_levels(cave, geo_index_b)
    return cave.geo_indices[coord]


# A region's erosion level is its geo index plus the cave system's depth, all modulo 20183. Then:
def _erosion_levels(cave: Cave, geo_index: int):
    return (geo_index + cave.depth) % 20183


def _print_risk_levels(risk_levels: Dict[Coordinate, int], target: Coordinate):
    types: Dict[Coordinate, str] = dict()
    mapping = {0: ".", 1: "=", 2: "|"}
    for coord, risk_level in risk_levels.items():
        types[coord] = mapping[risk_level]

    for y in range(0, target[1] + 1):
        for x in range(0, target[0] + 1):
            type_char = types[(x, y)]
            if (x, y) == (0, 0):
                type_char = "M"
            if (x, y) == target:
                type_char = "T"
            print(type_char, end="")
        print()


@dataclass
class Cave:
    depth: int
    target: Coordinate
    geo_indices: Dict[Coordinate, int]


if __name__ == "__main__":
    print(total_risk_level(depth=11541, target=(14, 778)))
