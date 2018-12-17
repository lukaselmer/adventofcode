from __future__ import annotations

from typing import Callable, Dict, List

from dataclasses import dataclass

Registers = List[int]


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
