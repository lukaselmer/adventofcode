from __future__ import annotations

from typing import Dict, Tuple, cast

from dataclasses import dataclass


def sum_pot_numbers_containing_plants():
    cellar = _read_cellar()
    for _ in range(0, 20):
        cellar.simulate()
    return cellar.sum_pot_numbers_containing_plants()


def _read_cellar():
    initial_state, *raw_rules = _read_input()
    state: Dict[int, bool] = {
        pot_number: char == "#" for pot_number, char in enumerate(list(initial_state))
    }
    parsed_rules = [_parse_rule(raw_rule) for raw_rule in raw_rules]
    return Cellar(state, {rule: alive for rule, alive in parsed_rules}, 0, len(state) - 1)


def _parse_rule(raw_rule: str) -> Tuple[LocalState, bool]:
    state, raw_alive = raw_rule.split(" => ")
    state_list = [char == "#" for char in state]
    return (cast(LocalState, tuple(state_list)), raw_alive == "#")


def _read_input():
    with open("aoc/d12/input.txt") as file:
        yield file.readline().strip().replace("initial state: ", "")
        for line in file.readlines():
            if line.strip():
                yield line.strip()


LocalState = Tuple[bool, bool, bool, bool, bool]


@dataclass
class Cellar:
    state: Dict[int, bool]
    rules: Dict[LocalState, bool]
    min_index: int
    max_index: int

    def simulate(self):
        new_state: Dict[int, bool] = dict()

        for pot_number in self.state:
            neighbours = tuple([self.state.get(pot_number + offset, False) for offset in range(-2, 3)])
            new_state[pot_number] = self.rules.get(neighbours, False)

        for pot_number in [
            self.min_index - 2,
            self.min_index - 1,
            self.max_index + 1,
            self.max_index + 2,
        ]:
            neighbours = tuple([self.state.get(pot_number + offset, False) for offset in range(-2, 3)])
            alive = self.rules.get(neighbours, False)
            if alive:
                new_state[pot_number] = alive
                self.min_index = min(self.min_index, pot_number)
                self.max_index = max(self.max_index, pot_number)

        self.state = new_state

    def sum_pot_numbers_containing_plants(self):
        return sum([pot_number for pot_number, alive in self.state.items() if alive])

    def __str__(self):
        return "".join(
            [
                "#" if self.state.get(index, False) else "."
                for index in range(self.min_index, self.max_index + 1)
            ]
        )


if __name__ == "__main__":
    print(sum_pot_numbers_containing_plants())
