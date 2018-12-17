from __future__ import annotations

from typing import List, Optional, Set

from aoc.d15.fields import parse_field
from aoc.d15.point import Point, neighbors, next_to_each_other
from aoc.d15.units import Unit


def lowest_required_attack_power(filename: str):
    for elf_attack_power in range(4, 999_999_999):
        game = _simulate(filename, elf_attack_power)
        if game.flawless_elf_victory():
            return game.score()
    raise RuntimeError("All the elves are dead...")


def simulate(filename: str):
    game = _simulate(filename, 3)
    return game.score()


def _simulate(filename: str, elf_attack_power: int):
    game = _load_game(filename, elf_attack_power)
    while game.has_enimies():
        game.tick()
    return game


def _load_game(filename: str, elf_attack_power: int):
    return Game(_read_input(filename), elf_attack_power)


def _read_input(filename: str):
    with open(f"aoc/d15/{filename}.txt") as file:
        return [line.rstrip() for line in file.readlines() if line.rstrip()]


class Game:
    dimensions: Point
    rounds = 0

    def __init__(self, lines: List[str], attack_power: int):
        self.dimensions = (len(lines), len(lines[0]))
        self.fields = {
            (x, y): parse_field((x, y), field, attack_power)
            for x, line in enumerate(lines)
            for y, field in enumerate(line)
        }
        self.units = [field.unit for field in self.fields.values() if field.has_unit()]

    def __str__(self):
        units = "\n".join(list(map(str, self.units)))
        return f"{self.fields_as_str()}\n{units}\n"

    @property
    def alive_units(self):
        return [unit for unit in self.units if unit.alive]

    def has_enimies(self):
        return self._identify_enemies(self.alive_units[0])

    def fields_as_str(self):
        return "\n".join(
            [
                "".join([self.fields[(x, y)].display for y in range(0, self.dimensions[1])])
                for x in range(0, self.dimensions[0])
            ]
        )

    def tick(self):
        self.rounds += 1
        self._sort_units_by_reading_order()
        for unit in self.alive_units:
            if unit.dead:
                continue
            enemies = self._identify_enemies(unit)
            if not enemies:
                self.rounds -= 1
                return
            enemies_in_range = [enemy for enemy in enemies if unit.can_attack(enemy)]
            if not enemies_in_range:
                if self._move_towards_nearest_enemy(unit):
                    enemies_in_range = [enemy for enemy in enemies if unit.can_attack(enemy)]
            if enemies_in_range:
                self._attack_lowest_hp_enemy(unit, enemies_in_range)

    def _sort_units_by_reading_order(self):
        self.units.sort(key=lambda unit: unit.position)

    def _identify_enemies(self, unit: Unit):
        return [other for other in self.alive_units if unit.can_attack_if_near(other)]

    def _move_towards_nearest_enemy(self, unit: Unit):
        target_position = self._nearest_attackable_enemy_position(unit)
        if not target_position:
            return False
        destination = self._position_to_move_next(unit.position, target_position)
        self._move_unit_to(unit, destination)
        return True

    def _move_unit_to(self, unit: Unit, position: Point):
        old_field = self.fields[unit.position]
        new_field = self.fields[position]
        old_field.unit = None
        new_field.unit = unit
        unit.position = position

    def _nearest_attackable_enemy_position(self, unit: Unit) -> Optional[Point]:
        checked: Set[Point] = set()
        to_check = set([unit.position])
        while to_check:
            to_check = self._positions_reachable_from(to_check) - checked
            checked.update(to_check)
            attackable_enemy_positions = {
                position
                for position in to_check
                if self._has_neighbor_with_attackable_unit(unit, position)
            }
            if attackable_enemy_positions:
                return min(attackable_enemy_positions)
        return None

    def _has_neighbor_with_attackable_unit(self, unit: Unit, position: Point):
        for neighbor_position in neighbors(position):
            field = self.fields[neighbor_position]
            if field.has_unit() and field.unit.can_attack_if_near(unit):
                return True
        return False

    def _position_to_move_next(self, start: Point, destination: Point):
        checked: Set[Point] = set()
        to_check = set([destination])
        while to_check:
            move_candidates = {position for position in to_check if next_to_each_other(start, position)}
            if move_candidates:
                return min(move_candidates)
            to_check = self._positions_reachable_from(to_check) - checked
            checked.update(to_check)
        raise RuntimeError(f"Did not find a shortest path from {start} to {destination}\n{self}")

    def _positions_reachable_from(self, positions: Set[Point]):
        new_reachable = set()
        for position in positions:
            new_reachable.update(
                [
                    (position[0], position[1] + 1),
                    (position[0], position[1] - 1),
                    (position[0] + 1, position[1]),
                    (position[0] - 1, position[1]),
                ]
            )
        return {pos for pos in new_reachable if self.fields[pos].is_free()}

    @staticmethod
    def _attack_lowest_hp_enemy(attacker: Unit, enemies: List[Unit]):
        min(enemies, key=lambda enemy: enemy.hit_points).attacked_by(attacker)

    def score(self):
        hit_points = [unit.hit_points for unit in self.alive_units]
        return sum(hit_points) * self.rounds

    def flawless_elf_victory(self):
        dead_elves = [unit for unit in self.units if unit.dead and unit.elf]
        return not dead_elves


if __name__ == "__main__":
    print(simulate("input"))
    print(lowest_required_attack_power("input"))
