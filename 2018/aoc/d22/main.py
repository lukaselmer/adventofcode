from __future__ import annotations

import heapq
from typing import Dict, List, Set, Tuple

# pylint: disable=C0411
from dataclasses import dataclass

# from sortedcontainers import SortedDict


TOOL_TORCH = "torch"
TOOL_CLIMB = "climb"
TOOL_NONE = "none"
TOOLS = [TOOL_TORCH, TOOL_CLIMB, TOOL_NONE]

TERRAIN_ROCKY = "rocky"
TERRAIN_WET = "wet"
TERRAIN_NARROW = "narrow"

Coordinate = Tuple[int, int]
Tool = str
Minutes = int
Step = Tuple[Coordinate, Tool]


def shortest_path(depth: int, target: Coordinate):
    cave = Cave(depth, target, dict(), dict())
    path = Path()
    heapq.heappush(path.to_check, (0, ((0, 0), TOOL_TORCH)))
    path.distances[((0, 0), TOOL_TORCH)] = 0
    goal = (target, TOOL_TORCH)
    while goal not in path.distances or _has_shorter_route_to_check(path, goal):
        _step(cave, path)
    return path.distances[goal]


def _has_shorter_route_to_check(path: Path, goal: Step):
    minutes_until_goal = path.distances[goal]
    for minutes, _ in path.to_check:
        if minutes < minutes_until_goal:
            return True
    return False


def _step(cave: Cave, path: Path):
    # print("distances")
    # print(path.distances)
    # print("to_check")
    # print(path.to_check)
    # print()
    # could use a SortedDict instead to speed this up

    # current_step, current_minutes = min(path.to_check.items(), key=lambda item: item[1])
    # print(path.to_check)
    current = heapq.heappop(path.to_check)
    while path.to_check and path.to_check[0] == current:
        heapq.heappop(path.to_check)

    current_minutes, current_step = current

    for next_minutes, next_step in _next_steps(cave, current_step, current_minutes):
        if next_step in path.distances:
            path.distances[next_step] = min([path.distances[next_step], next_minutes])
        else:
            path.distances[next_step] = next_minutes
        if next_step in path.visited:
            continue
        heapq.heappush(path.to_check, (next_minutes, next_step))
    path.visited.add(current_step)


def _next_steps(cave: Cave, step: Step, current_minutes: int):
    coord, current_tool = step
    (x, y) = coord
    for new_coord in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
        if _can_go_to(cave, new_coord, current_tool):
            yield (current_minutes + 1, (new_coord, current_tool))
    for tool in TOOLS:
        if tool != current_tool and _can_use_tool(cave, coord, tool):
            yield (current_minutes + 7, (coord, tool))


def _can_go_to(cave: Cave, coord: Coordinate, tool: Tool):
    return coord[0] >= 0 and coord[1] >= 0 and _can_use_tool(cave, coord, tool)


def _can_use_tool(cave: Cave, coord: Coordinate, tool: Tool):
    terrain = _terrain(cave, coord)
    if terrain == TERRAIN_ROCKY:
        return tool != TOOL_NONE
    if terrain == TERRAIN_WET:
        return tool != TOOL_TORCH
    if terrain == TERRAIN_NARROW:
        return tool != TOOL_CLIMB
    raise RuntimeError(f"Invalid terrain / tool combination: {terrain} / {tool}")


def total_risk_level(depth: int, target: Coordinate):
    cave = Cave(depth, target, dict(), dict())
    coords = [(x, y) for x in range(target[0] + 1) for y in range(target[1] + 1)]
    risk_levels = {coord: _risk_level(cave, coord) for coord in coords}
    return sum([risk_levels[coord] for coord in coords])


def _risk_level(cave: Cave, coord: Coordinate):
    geo_index = _geo_index(cave, coord)
    return _erosion_levels(cave, geo_index) % 3


def _terrain(cave: Cave, coord: Coordinate):
    if coord not in cave.terrain:
        cave.terrain[coord] = {0: TERRAIN_ROCKY, 1: TERRAIN_WET, 2: TERRAIN_NARROW}[
            _risk_level(cave, coord)
        ]
    return cave.terrain[coord]


def _terrain_short(cave: Cave, coord: Coordinate):
    return {0: ".", 1: "=", 2: "|"}[_risk_level(cave, coord)]


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


def _print_risk_levels(cave: Cave):
    for y in range(0, cave.target[1] + 1):
        for x in range(0, cave.target[0] + 1):
            type_char = _terrain_short(cave, (x, y))
            if (x, y) == (0, 0):
                type_char = "M"
            elif (x, y) == cave.target:
                type_char = "T"
            print(type_char, end="")
        print()


@dataclass
class Cave:
    depth: int
    target: Coordinate
    geo_indices: Dict[Coordinate, int]
    terrain: Dict[Coordinate, str]


class Path:
    def __init__(self):
        self.distances: Dict[Step, Minutes] = dict()
        self.to_check: List[Tuple[Minutes, Step]] = []
        self.visited: Set[Step] = set()


if __name__ == "__main__":
    print(total_risk_level(depth=11541, target=(14, 778)))
    # 1064 is too low
    print(shortest_path(depth=11541, target=(14, 778)))
