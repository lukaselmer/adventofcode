from __future__ import annotations

from typing import Optional

from aoc.d15.point import Point
from aoc.d15.units import Elf, Goblin, Unit


def parse_field(position: Point, raw_field: str, elf_attack_power: int):
    if raw_field == "#":
        return Wall(position)
    if raw_field == ".":
        return Field(position)
    if raw_field == "G":
        return Field(position, Goblin(position, 3))
    if raw_field == "E":
        return Field(position, Elf(position, elf_attack_power))
    raise RuntimeError(f"Invalid field {raw_field}")


class FieldBase:
    position: Point

    def __init__(self, position: Point):
        self.position = position

    @staticmethod
    def is_wall():
        return False

    @staticmethod
    def is_free():
        return False

    @staticmethod
    def has_unit():
        return False

    @property
    def display(self):
        raise NotImplementedError


class Wall(FieldBase):
    @staticmethod
    def is_wall():
        return True

    @property
    def display(self):
        return "#"


class Field(FieldBase):
    unit: Optional[Unit]

    def __init__(self, position: Point, unit: Optional[Unit] = None):
        super().__init__(position)
        self.unit = unit

    def has_unit(self):
        return self.unit and not self.unit.dead

    def is_free(self):
        return not self.has_unit()

    @property
    def display(self):
        if self.has_unit():
            return self.unit.display
        return "."
