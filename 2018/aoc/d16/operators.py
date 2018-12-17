from __future__ import annotations

from collections import defaultdict
from typing import Callable, DefaultDict, Dict, Iterable, Tuple

from dataclasses import dataclass


def addr(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] + reg[params.b]


def addi(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] + params.b


def mulr(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] * reg[params.b]


def muli(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] * params.b


def banr(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] & reg[params.b]


def bani(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] & params.b


def borr(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] | reg[params.b]


def bori(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a] | params.b


def setr(reg: Registers, params: OperationParams):
    reg[params.c] = reg[params.a]


def seti(reg: Registers, params: OperationParams):
    reg[params.c] = params.a


def gtir(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if params.a > reg[params.b] else 0


def gtri(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if reg[params.a] > params.b else 0


def gtrr(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if reg[params.a] > reg[params.b] else 0


def eqir(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if params.a == reg[params.b] else 0


def eqri(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if reg[params.a] == params.b else 0


def eqrr(reg: Registers, params: OperationParams):
    reg[params.c] = 1 if reg[params.a] == reg[params.b] else 0


class Registers:
    _contents: DefaultDict[int, int] = defaultdict(int)

    def __init__(self, *args: Tuple[int, int]):
        for index, content in args:
            self._contents[index] = content

    def reset(self):
        self._contents = defaultdict(int)

    def set_all(self, registers: Iterable[int]):
        for index, content in enumerate(registers):
            self._contents[index] = content

    def __getitem__(self, register_index: int):
        return self._contents[register_index]

    def __setitem__(self, register_index: int, value: int):
        self._contents[register_index] = value


@dataclass
class OperationParams:
    a: int
    b: int
    c: int


Operation = Callable[[Registers, OperationParams], None]

ALL: Dict[str, Operation] = dict(
    addr=addr,
    addi=addi,
    mulr=mulr,
    muli=muli,
    banr=banr,
    bani=bani,
    borr=borr,
    bori=bori,
    setr=setr,
    seti=seti,
    gtir=gtir,
    gtri=gtri,
    gtrr=gtrr,
    eqir=eqir,
    eqri=eqri,
    eqrr=eqrr,
)
