from __future__ import annotations

from typing import Iterable, Set, Tuple


def count_reachable_tiles(filename: str):
    maze = _read_maze(filename)
    while maze.simulate_step():
        # print(maze)
        pass
    # print(maze)
    return maze.wet_tiles()


def _read_maze(filename: str):
    coordinates = _read_clay_coordinates(filename)
    maze = Maze(coordinates)
    return maze


def _read_clay_coordinates(filename: str):
    for line in _read_file_contents(filename):
        for coordinate in _parse_coordinates(line):
            yield coordinate


def _read_file_contents(filename: str):
    with open(f"aoc/d17/{filename}.txt") as file:
        for line in file.readlines():
            if line.strip():
                yield line.strip()


def _parse_coordinates(line: str) -> Iterable[Coordinate]:
    simple_part, complex_part = list(map(_parse_coordinate, line.split(", ")))
    for index in _parse_range(complex_part[1]):
        if simple_part[0] == "x":
            yield (int(simple_part[1]), index)
        else:
            yield (index, int(simple_part[1]))


def _parse_range(range_str: str):
    num_from, num_to = range_str.split("..")
    for num in range(int(num_from), int(num_to) + 1):
        yield num


def _parse_coordinate(coordinate: str):
    name, number = coordinate.split("=")
    return (name, number)


Coordinate = Tuple[int, int]


class Maze:
    def __init__(self, coordinates: Iterable[Coordinate]):
        self._clay: Set[Coordinate] = set(coordinates)
        self._running_water: Set[Coordinate] = set([(500, 1)])
        self._still_water: Set[Coordinate] = set()
        self._relevant_coords = set([(500, 1)])
        self._relevant_coords_next = set([(500, 1)])

        self._height = max([coordinate[1] for coordinate in self._clay])

    def __str__(self):
        range_x = range(
            min([coordinate[0] for coordinate in self._clay]) - 1,
            max([coordinate[0] for coordinate in self._clay]) + 2,
        )
        range_y = range(0, self._height + 1)
        return "\n".join(["".join([self._at((x, y)) for x in range_x]) for y in range_y]) + "\n"

    def simulate_step(self):
        len_before = (len(self._running_water), len(self._still_water))
        self._relevant_coords_next = set()
        self._simulate_running_water()
        self._relevant_coords = self._relevant_coords_next
        return len_before != (len(self._running_water), len(self._still_water))

    def _simulate_running_water(self):
        for coord in self._relevant_coords:
            if not coord in self._running_water:
                continue
            if _below(coord)[1] > self._height:
                continue
            if self._is_sand(_below(coord)):
                if not _below(coord) in self._running_water:
                    self._running_water.add(_below(coord))
                    self._relevant_coords_next.add(_below(coord))
            elif self._captures_water(_below(coord)):
                self._fill_sideways(coord)

    def _fill_sideways(self, coord: Coordinate):
        while self._is_penetrable(_left(coord)) and self._captures_water(_below(coord)):
            coord = _left(coord)
        left_coord = coord
        while self._is_penetrable(_right(coord)) and (
            self._captures_water(_below(coord)) or self._captures_water(_right(_below(coord)))
        ):
            coord = _right(coord)
        right_coord = coord

        is_pool = (
            self._captures_water(_below(left_coord))
            and self._captures_water(_left(left_coord))
            and self._captures_water(_below(right_coord))
            and self._captures_water(_right(right_coord))
        )
        for coord_to_fill in _line_range(left_coord, right_coord):
            if is_pool:
                if not coord_to_fill in self._still_water:
                    self._still_water.add(coord_to_fill)
                    self._running_water.discard(coord_to_fill)
                    self._relevant_coords_next.add(_above(coord_to_fill))
                    self._relevant_coords_next.add(coord_to_fill)
            else:
                if not coord_to_fill in self._running_water:
                    self._running_water.add(coord_to_fill)
                    self._relevant_coords_next.add(coord_to_fill)

    def _is_sand(self, coord: Coordinate):
        return self._at(coord) == "."

    def _is_penetrable(self, coord: Coordinate):
        return coord in self._running_water or self._at(coord) == "."

    def _is_clay(self, coord: Coordinate):
        return coord in self._clay

    def _captures_water(self, coord: Coordinate):
        return coord in self._clay or coord in self._still_water

    def wet_tiles(self):
        count_from_height = min([coordinate[1] for coordinate in self._clay])
        return len(
            {
                (x, y)
                for x, y in (self._running_water | self._still_water)
                if count_from_height <= y <= self._height
            }
        )

    def _at(self, coordinate: Coordinate):
        if coordinate in self._still_water:
            return "~"
        if coordinate in self._running_water:
            return "|"
        if coordinate == (500, 0):
            return "+"
        if coordinate in self._clay:
            return "#"
        return "."


def _left(coord: Coordinate):
    return (coord[0] - 1, coord[1])


def _right(coord: Coordinate):
    return (coord[0] + 1, coord[1])


def _below(coord: Coordinate):
    return (coord[0], coord[1] + 1)


def _above(coord: Coordinate):
    return (coord[0], coord[1] - 1)


def _line_range(left: Coordinate, right: Coordinate):
    for x in range(left[0], right[0] + 1):
        yield (x, left[1])


if __name__ == "__main__":
    print(count_reachable_tiles("input"))
