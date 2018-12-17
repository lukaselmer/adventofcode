from __future__ import annotations

from aoc.d16.operations import InputRegisters, Recording, matching_operations
from aoc.d16.operators import ALL, OperationParams


def execute_test_program():
    mapping = _map_opcodes()
    registers = [0, 0, 0, 0]
    for operation, params in _read_operations(mapping):
        operation(registers, params)
    return registers[0]


def _read_operations(mapping):
    for line in _read_lines("operations"):
        opcode, *params = _parse_numbers(line)
        yield (ALL[mapping[opcode]], OperationParams(*params))


def _map_opcodes():
    matches = [(recording.opcode, matching_operations(recording)) for recording in _read_recordings()]
    opcodes = {opcode for opcode, _ in matches}

    opcode_mapping = {opcode: set(ALL.keys()) for opcode in opcodes}
    for opcode, names in matches:
        opcode_mapping[opcode] &= names

    while [names for names in opcode_mapping.values() if len(names) > 1]:
        taken = {next(iter(names)) for names in opcode_mapping.values() if len(names) == 1}
        for opcode, names in opcode_mapping.items():
            if len(names) > 1:
                opcode_mapping[opcode] -= taken

    return {opcode: next(iter(names)) for opcode, names in opcode_mapping.items()}


def count_operations_with_3_or_more_matches():
    return len(
        [recording for recording in _read_recordings() if len(matching_operations(recording)) >= 3]
    )


def _read_recordings():
    lines = _read_lines("recordings")
    while lines:
        before_str, params_str, after_str, *lines = lines
        before = _parse_numbers(before_str.replace("Before: [", "").replace("]", "").replace(",", ""))
        opcode, *params = _parse_numbers(params_str)
        after = _parse_numbers(after_str.replace("After:  [", "").replace("]", "").replace(",", ""))
        yield Recording(before, after, opcode, OperationParams(*params))


def _read_lines(filename: str):
    with open(f"aoc/d16/{filename}.txt") as file:
        return [line.strip() for line in file.readlines() if line.strip()]


def _parse_numbers(numbers_str: str) -> InputRegisters:
    param_a, param_b, param_c, param_d = map(int, numbers_str.split(" "))
    return (param_a, param_b, param_c, param_d)


if __name__ == "__main__":
    print(count_operations_with_3_or_more_matches())
    print(execute_test_program())
