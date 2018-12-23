from __future__ import annotations

from typing import List, Tuple

from aoc.d16.operators import ALL, Operation, OperationParams

Instruction = Tuple[Operation, OperationParams]
Instructions = List[Instruction]


def simulate(filename: str):
    simulator = Simulator(*_read_instructions(filename))
    while simulator.points_to_instruction:
        simulator.run_instruction()
        simulator.increase_instruction_pointer()
    return simulator.register_0_value


def _read_instructions(filename: str) -> Tuple[int, Instructions]:
    instruction_pointer_register, *instruction_strings = _read_file_contents(filename)
    instructions = [_parse_instruction(instruction_str) for instruction_str in instruction_strings]
    return int(instruction_pointer_register), instructions


def _parse_instruction(instruction_str: str) -> Instruction:
    name, val_a, val_b, val_c = instruction_str.split(" ")
    params = OperationParams(int(val_a), int(val_b), int(val_c))
    return ALL[name], params


def _read_file_contents(filename: str):
    with open(f"aoc/d19/{filename}.txt") as file:
        yield file.readline().replace("#ip ", "")
        for line in file.readlines():
            if line.strip():
                yield line.strip()


class Simulator:
    def __init__(self, instruction_pointer_regiser: int, instructions: Instructions):
        self._instructions: Instructions = instructions
        self._instruction_pointer_register = instruction_pointer_regiser
        self._registers = [0, 0, 0, 0, 0, 0]
        self._instruction_pointer_value = 0

    @property
    def points_to_instruction(self):
        return 0 <= self.instruction_pointer_value < len(self._instructions)

    @property
    def instruction_pointer_value(self):
        return self._instruction_pointer_value

    @property
    def register_0_value(self):
        return self._registers[0]

    def run_instruction(self):
        self._registers[self._instruction_pointer_register] = self._instruction_pointer_value
        operation, params = self._instructions[self.instruction_pointer_value]
        operation(self._registers, params)
        self._instruction_pointer_value = self._registers[self._instruction_pointer_register]

    def increase_instruction_pointer(self):
        self._instruction_pointer_value += 1


if __name__ == "__main__":
    print(simulate("input"))
