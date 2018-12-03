# from collections import defaultdict
from typing import List, Set, Tuple

from dataclasses import dataclass


def multi_claimed_square_inches():
    fabric = _fill_fabric()
    return fabric.count_multi_claimed_square_inches()


def find_intact_claim():
    fabric = _fill_fabric()
    return fabric.find_intact_claim()


def _fill_fabric():
    fabric = Fabric(1000)
    for claim in _read_input():
        fabric.fill(claim)
    return fabric


@dataclass
class Claim:
    identifier: int
    top_left: Tuple[int, int]
    dimensions: Tuple[int, int]

    @property
    def top(self):
        return self.top_left[0]

    @property
    def right(self):
        return self.left + self.dimensions[1]

    @property
    def bottom(self):
        return self.top + self.dimensions[0]

    @property
    def left(self):
        return self.top_left[1]


class Fabric:
    _rows: List[List[Set[int]]]

    def __init__(self, size):
        self._rows = list(list(set() for _ in range(size)) for _ in range(size))

    def fill(self, claim: Claim):
        for x_cord in range(claim.left, claim.right):
            for y_cord in range(claim.top, claim.bottom):
                self._rows[x_cord][y_cord].add(claim.identifier)

    def count_multi_claimed_square_inches(self):
        count = 0
        for row in self._rows:
            for cell in row:
                if len(cell) > 1:
                    count += 1
        return count

    def find_intact_claim(self):
        valid_claims: Set[int] = set([claim.identifier for claim in _read_input()])
        for row in self._rows:
            for cell in row:
                if len(cell) > 1:
                    for claim_identifier in cell:
                        if claim_identifier in valid_claims:
                            valid_claims.remove(claim_identifier)
        assert len(valid_claims) == 1
        return valid_claims.pop()

    def __repr__(self):
        return "\n".join(["".join(map(str, row)) for row in self._rows])


def _read_input():
    with open("aoc/d3/input.txt") as file:
        for line in file:
            if line:
                yield _parse_claim(line.strip())


def _parse_claim(line: str):
    clean_line = line.replace(":", "").replace("@ ", "").replace("#", "")
    [identifier, coords, dim] = clean_line.split(" ")
    [x_cord, y_cord] = map(int, coords.split(","))
    [width, height] = map(int, dim.split("x"))
    return Claim(identifier=int(identifier), top_left=(x_cord, y_cord), dimensions=(width, height))


if __name__ == "__main__":
    print(multi_claimed_square_inches())
    print(find_intact_claim())
