from __future__ import annotations

import re
from typing import Dict, List, Set

from dataclasses import dataclass

DamageType = str

IMMUNE_GROUP = "immune"
INFECTION_GROUP = "infection"


def alive_after_minimum_boost_required(filename: str):
    for boost in range(1, 10000):
        result = count_alive_units(filename, boost)
        if result[0] == "immune":
            return result[1]
    return None


def count_alive_units(filename: str, boost: int):
    armies: List[Army] = list(_read_armies(filename))

    for army in armies:
        if army.group == IMMUNE_GROUP:
            army.damage.power += boost

    alive_units = sum([army.units for army in armies])
    while _opponents_are_alive(armies):
        _simulate_turn(armies)
        alive_units_before = alive_units
        alive_units = sum([army.units for army in armies])
        if alive_units == alive_units_before:
            return ("draw", -1)
    return _alive_armies(armies)[0].group, alive_units


def _alive_armies(armies: Armies):
    return [army for army in armies if army.units > 0]


def _opponents_are_alive(armies: Armies):
    alive_armies = _alive_armies(armies)
    group = alive_armies[0].group
    for army in alive_armies:
        if army.group != group:
            return True
    return False


def _simulate_turn(armies: Armies):
    armies = sorted(armies, key=lambda army: (-army.effective_power, -army.initiative))

    opponents = dict()
    opponents[INFECTION_GROUP] = _armies_by_group(armies, IMMUNE_GROUP)
    opponents[IMMUNE_GROUP] = _armies_by_group(armies, INFECTION_GROUP)
    selected_opponents: Dict[int, Army] = dict()
    for army in armies:
        target = _choose_target(army, opponents[army.group])
        if target:
            opponents[army.group].remove(target)
            selected_opponents[army.initiative] = target

    armies = sorted(armies, key=lambda army: (-army.initiative))
    for army in armies:
        if army.initiative in selected_opponents:
            opponent = selected_opponents[army.initiative]
            army.attack(opponent)


def _armies_by_group(armies: Armies, group: str):
    return [army for army in armies if army.group == group and army.units > 0]


def _choose_target(army: Army, opponents: Armies):
    if not opponents:
        return None
    best_opponent: Army = sorted(
        opponents,
        key=lambda opponent: (
            -army.potential_damage_to(opponent),
            -opponent.effective_power,
            -army.initiative,
        ),
    )[0]
    if army.potential_damage_to(best_opponent) == 0:
        return None
    return best_opponent


def _read_armies(filename: str):
    group = ""
    for army_number, line in enumerate(_readlines(filename)):
        if line.startswith("Immune"):
            group = IMMUNE_GROUP
        elif line.startswith("Infection"):
            group = INFECTION_GROUP
        else:
            yield _parse_army(army_number, group, line)


def _readlines(filename: str):
    with open(f"aoc/d24/{filename}.txt") as file:
        for raw_line in file.readlines():
            line = raw_line.strip()
            if line:
                yield line


def _parse_army(army_number: int, group: str, line: str):
    pattern = r"(\d+) units each with (\d+) hit points (\(.*\) )?with an attack that does (\d+) (\w+) damage at initiative (\d+)"
    res = re.match(pattern, line)
    if res:
        result = res.groups()
        units, hitpoints, weaknesses_and_immunities, damage_power, damage_type, initiative = result
        return Army(
            group=group,
            units=int(units),
            hitpoints=int(hitpoints),
            initiative=int(initiative),
            weaknesses=_parse_weaknesses_and_immunities(weaknesses_and_immunities, "weak"),
            immunities=_parse_weaknesses_and_immunities(weaknesses_and_immunities, "immune"),
            damage=Damage(power=int(damage_power), type=damage_type),
        )
    raise RuntimeError(f"Unable to parse line {line}")


def _parse_weaknesses_and_immunities(weaknesses_and_immunities: str, weak_or_immune: str):
    if weaknesses_and_immunities:
        weaknesses_and_immunities = weaknesses_and_immunities.replace("(", "").replace(")", "").strip()
        sentences = [sentence.strip() for sentence in weaknesses_and_immunities.split("; ")]
        for sentence in sentences:
            extracted_weak_or_immune, damage_types_raw = sentence.split(" to ")
            damage_types = set(damage_types_raw.split(", "))
            if extracted_weak_or_immune == weak_or_immune:
                return damage_types
    return set()


@dataclass
class Army:
    units: int
    hitpoints: int
    initiative: int
    group: str
    weaknesses: Set[DamageType]
    immunities: Set[DamageType]
    damage: Damage

    def __init__(self, **kwargs):
        self.units: int = kwargs["units"]
        self.hitpoints: int = kwargs["hitpoints"]
        self.initiative: int = kwargs["initiative"]
        self.group: str = kwargs["group"]
        self.weaknesses: Set[DamageType] = kwargs["weaknesses"]
        self.immunities: Set[DamageType] = kwargs["immunities"]
        self.damage: Damage = kwargs["damage"]

    @property
    def effective_power(self):
        return self.units * self.damage.power

    def potential_damage_to(self, other: Army):
        if self.damage.type in other.immunities:
            return 0
        if self.damage.type in other.weaknesses:
            return self.effective_power * 2
        return self.effective_power

    def attack(self, other: Army):
        if other.units == 0:
            return
        potential_units_killed = self.potential_damage_to(other) // other.hitpoints
        other.units = max([other.units - potential_units_killed, 0])


Armies = List[Army]


@dataclass
class Damage:
    power: int
    type: DamageType


if __name__ == "__main__":
    print(count_alive_units("input", 0))
    print(alive_after_minimum_boost_required("input"))
