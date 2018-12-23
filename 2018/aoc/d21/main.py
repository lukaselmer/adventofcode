from __future__ import annotations

from typing import Dict

from aoc.d19.main import Simulator, _read_instructions


def simulate(filename: str):
    simulators: Dict[int, Simulator] = dict()
    instructions = _read_instructions(filename, "21")
    for register_0_value in range(0, 1000):
        simulator = Simulator(*instructions, register_0_value)
        simulator.blacklist = 4
        simulators[register_0_value] = simulator
    tick = 0
    while True:
        if tick % 1000 == 0:
            print(tick)
        tick += 1
        simulators_to_remove = []
        for register_0_value, simulator in simulators.items():
            if not simulator.points_to_instruction:
                return register_0_value
            simulator.run_instruction()
            simulator.increase_instruction_pointer()
            if simulator.stuck:
                simulators_to_remove.append(register_0_value)
        if simulators_to_remove:
            for register_0_value in simulators_to_remove:
                del simulators[register_0_value]
            print(len(simulators_to_remove))
            simulators_to_remove = []


if __name__ == "__main__":
    print(simulate("input"))
