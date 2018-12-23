from __future__ import annotations

from typing import List, Union

from aoc.d20.tokenizer import tokenize

# pylint: disable=C0411
from dataclasses import dataclass


def parse(regex: str):
    tokens = tokenize(regex)
    stack: List[Node] = [Node()]
    for token in tokens:
        if token == "(":
            stack.append(Node())
        elif token == ")":
            finished_node = stack.pop()
            stack[len(stack) - 1].children.append(finished_node)
        elif token == "|":
            # before_or = stack[len(stack) - 1].children.pop()
            stack[len(stack) - 1].children.append(token)
            # stack[len(stack) - 1].children.append(before_or)
        else:
            stack[len(stack) - 1].children.append(token)
    return stack.pop()


@dataclass(init=False)
class Node:
    children: List[Union[str, Node]]

    def __init__(self):
        self.children: List[Union[str, Node]] = []
