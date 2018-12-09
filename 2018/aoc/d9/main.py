from __future__ import annotations

from collections import Counter
from typing import Counter as CounterType
from typing import cast

from dataclasses import dataclass


def highscore(players: int, last_marble_value: int):
    scores: CounterType[int] = Counter()
    current_node = _init_game()
    for value in range(1, last_marble_value + 1):
        elf = value % players
        normal_turn = value % 23 > 0
        if normal_turn:
            current_node = current_node.advance(1).insert(value)
        else:
            current_node = current_node.back(7)
            scores[elf] += value + current_node.value
            current_node = current_node.remove()
        # _print_game(current_node)

    return max(scores.values())


def _init_game():
    game = Node(value=0, next=cast(Node, None), prev=cast(Node, None))
    game.next = game
    game.prev = game
    return game


def _print_game(current_node: Node):
    node = current_node
    while node.value != 0:
        node = node.next

    start = node
    outputs = []
    start_printed = False
    while not start_printed or start is not node:
        start_printed = True
        current = current_node is node
        outputs.append("%s%2d%s" % ("(" if current else " ", node.value, ")" if current else " "))
        node = node.next
    print(" ".join(outputs))


@dataclass
class Node:
    value: int
    next: Node
    prev: Node

    def advance(self, times: int):
        node = self
        for _ in range(0, times):
            node = node.next
        return node

    def back(self, times: int):
        node = self
        for _ in range(0, times):
            node = node.prev
        return node

    def insert(self, value: int):
        self.next = Node(value=value, prev=self, next=self.next)
        self.next.next.prev = self.next
        return self.next

    def remove(self):
        self.prev.next = self.next
        self.next.prev = self.prev
        return self.next


if __name__ == "__main__":
    print(highscore(424, 71482))
    print(highscore(424, 7148200))
