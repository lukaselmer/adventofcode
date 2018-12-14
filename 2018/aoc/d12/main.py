from __future__ import annotations

from typing import Dict, Tuple, cast


def sum_pot_numbers_containing_plants(generations=20, fast=False, verbose=False):
    if fast:
        # iter     sum
        #    0    3071
        # 1000   23457
        # 2000   46457
        # 3000   69457
        # 4000   92457
        # ...
        # 10000 230457
        # 40000 920457
        #
        # => per 1000 iterations, the sum increases by 23_000, resulting in a total of 23_000 + 457 = 23_457
        # => after 40_000 iterations, the sum increases by (40_000 / 1000) * 23_000 = 40 * 23_000, resulting in a total of (40 * 23_000) + 457 = 920_457
        # => after 50_000_000_000 iterations, the total is ((50_000_000_000 / 1000) * 23_000) + 457 = ((50_000_000) * 23_000) + 457 = 1_150_000_000_457
        return (generations * 23) + 457

    cellar = _read_cellar()
    for index in range(0, generations):
        if verbose and index % 1000 == 0:
            print(index, end=" ", flush=True)
            print(len(cellar.state), end=" ", flush=True)
            print(cellar.sum_pot_numbers_containing_plants(), end=" ", flush=True)
            print(cellar)
        cellar.simulate()
    return cellar.sum_pot_numbers_containing_plants()


def _read_cellar():
    initial_state, *raw_rules = _read_input()
    state: Dict[int, bool] = {
        pot_number: char == "#" for pot_number, char in enumerate(list(initial_state))
    }
    parsed_rules = [_parse_rule(raw_rule) for raw_rule in raw_rules]
    return Cellar(state, {rule: alive for rule, alive in parsed_rules})


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


class Cellar:
    state: Dict[int, bool]
    rules: Dict[LocalState, bool]
    min_index: int
    max_index: int

    def __init__(self, state: Dict[int, bool], rules: Dict[LocalState, bool]):
        self.state = state
        self.rules = rules
        self.min_index = 0
        self.max_index = len(state) - 1

    def simulate(self):
        new_state = dict()

        self.state[self.min_index - 2] = False
        self.state[self.min_index - 1] = False
        self.state[self.max_index + 1] = False
        self.state[self.max_index + 2] = False
        for pot_number in self.state:
            neighbours = tuple([self.state.get(pot_number + offset, False) for offset in range(-2, 3)])
            new_state[pot_number] = self.rules.get(neighbours, False)

        self.min_index = self.min_index - 2
        self.max_index = self.max_index + 2
        for index in range(self.min_index, self.max_index + 1):
            if new_state[index]:
                break
            del new_state[index]
            self.min_index = index + 1
        for index in range(self.max_index, self.min_index - 1, -1):
            if new_state[index]:
                break
            del new_state[index]
            self.max_index = index - 1

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
    print(sum_pot_numbers_containing_plants(40000, verbose=True))
    print(sum_pot_numbers_containing_plants(50_000_000_000, fast=True))
