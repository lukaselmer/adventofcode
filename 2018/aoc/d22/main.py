from __future__ import annotations

from typing import Dict, Tuple

Coordinate = Tuple[int, int]


def total_risk_level(depth: int, target: Coordinate):
    geo_indices: Dict[Coordinate, int] = dict()
    geo_indices[(0, 0)] = 0
    geo_indices[target] = 0
    coordinates = [(x, y) for x in range(target[0] + 1) for y in range(target[1] + 1)]

    # If the region's Y coordinate is 0, the geo index is its X coordinate times 16807.
    for x in range(1, target[0] + 1):
        geo_indices[(x, 0)] = x * 16807

    # If the region's X coordinate is 0, the geo index is its Y coordinate times 48271.
    for y in range(1, target[1] + 1):
        geo_indices[(0, y)] = y * 48271

    # Otherwise, the region's geo index is the result of multiplying the erosion levels of the regions at X-1,Y and X,Y-1.
    # X-1,Y and X,Y-1
    for coord in coordinates:
        _geo_index(depth, geo_indices, coord)

    risk_levels: Dict[Coordinate, int] = dict()
    for coord, geo_index in geo_indices.items():
        risk_levels[coord] = _erosion_levels(depth, geo_index) % 3

    return sum([risk_levels[coord] for coord in coordinates])


def _geo_index(depth: int, geo_indices: Dict[Coordinate, int], coord: Coordinate):
    if coord not in geo_indices:
        x, y = coord
        geo_index_a = _geo_index(depth, geo_indices, (x - 1, y))
        geo_index_b = _geo_index(depth, geo_indices, (x, y - 1))
        geo_indices[coord] = _erosion_levels(depth, geo_index_a) * _erosion_levels(depth, geo_index_b)
    return geo_indices[coord]


# A region's erosion level is its geo index plus the cave system's depth, all modulo 20183. Then:
def _erosion_levels(depth: int, geo_index: int):
    return (geo_index + depth) % 20183


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


if __name__ == "__main__":
    print(total_risk_level(depth=11541, target=(14, 778)))
