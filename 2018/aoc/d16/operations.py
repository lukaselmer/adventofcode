from __future__ import annotations

from typing import Tuple

from aoc.d16.operators import ALL, Operation, OperationParams, Registers
from dataclasses import dataclass

InputRegisters = Tuple[int, int, int, int]


def matching_operations(recording: Recording):
    return set([name for name, operation in ALL.items() if _matches(recording, operation)])


def _matches(recording: Recording, operation: Operation):
    registers = Registers(*[(index, recording.before[index]) for index in range(0, 4)])
    operation(registers, recording.params)
    actual = (registers[0], registers[1], registers[2], registers[3])
    return actual == recording.after


@dataclass
class Recording:
    before: InputRegisters
    after: InputRegisters
    operation_id: int
    params: OperationParams
