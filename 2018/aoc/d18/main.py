from __future__ import annotations

from typing import Dict, Tuple

Fields = Tuple[Tuple[str, ...], ...]
Cache = Dict[Fields, Fields]

OPEN = "."
TREE = "|"
LUMBERYARD = "#"


def resource_values(filename: str, turns: int):
    cache: Cache = dict()
    fields = simulate(filename, turns, cache)
    return _values(fields)


def simulate(filename: str, turns: int, cache: Cache):
    fields = _read_magical_fields(filename)
    last_cache_size = 0
    turns_left = turns

    for _ in range(turns):
        turns_left -= 1
        fields = _turn(fields, cache)
        if len(cache) == last_cache_size:
            break
        last_cache_size = len(cache)

    cycle_length = 0
    fields_before_cycle = fields
    for _ in range(turns_left):
        turns_left -= 1
        fields = _turn(fields, cache)
        cycle_length += 1
        if fields == fields_before_cycle:
            break

    turns_left %= cycle_length

    for _ in range(turns_left):
        fields = _turn(fields, cache)

    return fields


def _values(fields: Fields):
    flat_fields = [field for row in fields for field in row]
    return len([field for field in flat_fields if field == TREE]) * len(
        [field for field in flat_fields if field == LUMBERYARD]
    )


def _fields_str(fields: Fields):
    return "\n".join(["".join(row) for row in fields])


def _read_magical_fields(filename: str) -> Fields:
    lines = _read_file_contents(filename)
    return tuple([tuple([field for field in line]) for line in lines])


def _read_file_contents(filename: str):
    with open(f"aoc/d18/{filename}.txt") as file:
        for line in file.readlines():
            if line.strip():
                yield line.strip()


def _turn(fields: Fields, cache: Cache):
    if fields in cache:
        return cache[fields]
    cache[fields] = tuple(
        [tuple([_next_value(fields, x, y) for x in range(len(fields[y]))]) for y in range(len(fields))]
    )
    return cache[fields]


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
    print(resource_values("input", turns=1_000_000_000))
