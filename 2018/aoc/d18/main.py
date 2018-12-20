from __future__ import annotations

from typing import List

Fields = List[List[str]]


OPEN = "."
TREE = "|"
LUMBERYARD = "#"


def resource_values(filename: str, turns: int):
    fields = simulate(filename, turns)
    flat_fields = [field for row in fields for field in row]
    return len([field for field in flat_fields if field == TREE]) * len(
        [field for field in flat_fields if field == LUMBERYARD]
    )


def simulate(filename: str, turns: int):
    magic_fields = _read_magical_fields(filename)
    for _ in range(0, turns):
        magic_fields = _turn(magic_fields)
    return magic_fields


def _fields_str(fields: Fields):
    return "\n".join(["".join(row) for row in fields])


def _read_magical_fields(filename: str) -> Fields:
    lines = _read_file_contents(filename)
    return [[field for field in line] for line in lines]


def _read_file_contents(filename: str):
    with open(f"aoc/d18/{filename}.txt") as file:
        for line in file.readlines():
            if line.strip():
                yield line.strip()


def _turn(fields: Fields):
    return [[_next_value(fields, x, y) for x in range(len(fields[y]))] for y in range(len(fields))]


def _next_value(fields: Fields, x: int, y: int):
    neighbors = _neighbors(fields, x, y)
    tree_count = len([None for field in neighbors if field == TREE])
    lumberyard_count = len([None for field in neighbors if field == LUMBERYARD])
    if fields[y][x] == OPEN:
        return TREE if tree_count >= 3 else OPEN
    if fields[y][x] == TREE:
        return LUMBERYARD if lumberyard_count >= 3 else TREE
    return LUMBERYARD if lumberyard_count >= 1 and tree_count >= 1 else OPEN


def _neighbors(fields: Fields, x: int, y: int):
    coords = [
        (y - 1, x - 1),
        (y - 1, x),
        (y - 1, x + 1),
        (y, x - 1),
        (y, x + 1),
        (y + 1, x - 1),
        (y + 1, x),
        (y + 1, x + 1),
    ]
    return [
        fields[y_coord][x_coord]
        for (y_coord, x_coord) in coords
        if 0 <= y_coord < len(fields) and 0 <= x_coord < len(fields[y_coord])
    ]


if __name__ == "__main__":
    print(resource_values("input", turns=10))
