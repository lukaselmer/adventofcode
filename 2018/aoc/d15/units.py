from __future__ import annotations

from aoc.d15.point import Point, next_to_each_other


class Unit:
    position: Point
    hit_points = 200
    attack_points = 3

    def __init__(self, position: Point):
        self.position = position

    @property
    def display(self):
        raise NotImplementedError

    @property
    def alive(self):
        return self.hit_points > 0

    @property
    def dead(self):
        return not self.alive

    def attacked_by(self, unit: Unit):
        self.hit_points -= unit.attack_points

    def can_attack(self, unit: Unit):
        return unit.can_be_attacked_from(self, self.position)

    def can_be_attacked_from(self, unit: Unit, position: Point):
        if not self.can_attack_if_near(unit):
            return False
        return next_to_each_other(self.position, position)

    def can_attack_if_near(self, unit: Unit):
        return not unit.dead and self.__class__ is not unit.__class__


class Goblin(Unit):
    def __str__(self):
        return f"Goblin <pos={self.position} hp={self.hit_points} ap={self.attack_points}>"

    @property
    def display(self):
        return "G"


class Elf(Unit):
    def __str__(self):
        return f"Elf    <pos={self.position} hp={self.hit_points} ap={self.attack_points}>"

    @property
    def display(self):
        return "E"
