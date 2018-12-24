from __future__ import annotations

from aoc.d19.main import Simulator, _read_instructions
from aoc.d21.annotated_input_v4 import main as part2


def simulate(filename: str):
    instructions = _read_instructions(filename, "21")
    simulator = Simulator(*instructions, 10504829)
    simulator.watchlist = 28
    while simulator.points_to_instruction:
        simulator.run_instruction()
        simulator.increase_instruction_pointer()


if __name__ == "__main__":
    simulate("input")
    print(part2())
