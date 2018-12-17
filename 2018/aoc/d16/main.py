from __future__ import annotations

from aoc.d16.operations import InputRegisters, Recording, matching_operations
from aoc.d16.operators import Operation, OperationParams, Registers


def count_operations_with_3_or_more_matches():
    recordings = list(_read_recordings())
    return len([recording for recording in recordings if len(matching_operations(recording)) >= 3])


def _read_recordings():
    lines = _read_recording_lines()
    while lines:
        before_str, params_str, after_str, *lines = lines
        before = _parse_numbers(before_str.replace("Before: [", "").replace("]", "").replace(",", ""))
        operation_id, *params = _parse_numbers(params_str)
        after = _parse_numbers(after_str.replace("After:  [", "").replace("]", "").replace(",", ""))
        yield Recording(before, after, operation_id, OperationParams(*params))


def _read_recording_lines():
    with open("aoc/d16/recordings.txt") as file:
        return [line.strip() for line in file.readlines() if line.strip()]


def _parse_numbers(numbers_str: str) -> InputRegisters:
    param_a, param_b, param_c, param_d = map(int, numbers_str.split(" "))
    return (param_a, param_b, param_c, param_d)


if __name__ == "__main__":
    print(count_operations_with_3_or_more_matches())
