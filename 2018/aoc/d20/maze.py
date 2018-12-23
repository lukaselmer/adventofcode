from __future__ import annotations

from typing import Set, Tuple

from aoc.d20.parser import Node, parse


def build_maze(regex: str):
    tree = parse(regex)
    maze = Maze()
    _build_maze_rec({(0, 0)}, maze, tree)
    return maze


def _build_maze_rec(starting_points: Set[Tuple[int, int]], maze: Maze, node: Node):
    if node.__class__ == str:
        return maze.add_path(starting_points, node)

    new_starting_points: Set[Tuple[int, int]] = set()
    next_or = False
    origin_starting_points = starting_points
    for child in node.children:
        if child == "|":
            next_or = True
        else:
            if next_or:
                next_or = False
                points = _build_maze_rec(origin_starting_points, maze, child)
                new_starting_points |= points
                starting_points = points
            else:
                starting_points = _build_maze_rec(starting_points, maze, child)
    return new_starting_points | starting_points


class Maze:
    def __init__(self):
        self.doors: Set[Tuple[Tuple[int, int], Tuple[int, int]]] = set()

    def add_path(self, starting_points: Set[Tuple[int, int]], directions: str):
        new_starting_points = set()
        for starting_point in starting_points:
            for direction in directions:
                if direction == "N":
                    starting_point = self._add_doors_to(starting_point, (0, -1))
                elif direction == "E":
                    starting_point = self._add_doors_to(starting_point, (1, 0))
                elif direction == "S":
                    starting_point = self._add_doors_to(starting_point, (0, 1))
                elif direction == "W":
                    starting_point = self._add_doors_to(starting_point, (-1, 0))
            new_starting_points.add(starting_point)
        return new_starting_points

    def _add_doors_to(self, starting_point: Tuple[int, int], movement: Tuple[int, int]):
        new_starting_point = (starting_point[0] + movement[0], starting_point[1] + movement[1])
        self._add_door(starting_point, new_starting_point)
        return new_starting_point

    def _add_door(self, room_a: Tuple[int, int], room_b: Tuple[int, int]):
        if room_a <= room_b:
            self.doors.add((room_a, room_b))
        else:
            self.doors.add((room_b, room_a))

    def __str__(self):
        min_x = min([min([door[0][0], door[1][0]]) for door in self.doors])
        min_y = min([min([door[0][1], door[1][1]]) for door in self.doors])
        max_x = max([max([door[0][0], door[1][0]]) for door in self.doors])
        max_y = max([max([door[0][1], door[1][1]]) for door in self.doors])

        lines = ""
        for y in range(min_y, max_y + 2):
            line1 = ""
            for x in range(min_x, max_x + 2):
                line1 += f"{'#' if x <= max_x else ''}{'-' if ((x, y-1), (x, y)) in self.doors else '#'}"
            lines += f"{line1}\n"
            line2 = ""
            for x in range(min_x, max_x + 2):
                line2 += f"{'|' if ((x-1, y), (x, y)) in self.doors else '#'}{'X' if x == 0 and y == 0 else '.' if x <= max_x else ''}"
            if y <= max_y:
                lines += f"{line2}\n"
        return lines
