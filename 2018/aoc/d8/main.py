from __future__ import annotations

from typing import List

from dataclasses import dataclass


def metadata_sum():
    return _parse_tree().metadata_sum()


def supervalue():
    return _parse_tree().supervalue()


def _parse_tree():
    tree, rest = _parse_node(_read_input())
    assert not rest
    return tree


def _parse_node(unparsed_input: List[int]):
    num_children, num_metadata, *rest = unparsed_input
    children = []
    for _ in range(0, num_children):
        node, rest = _parse_node(rest)
        children.append(node)

    metadata = rest[:num_metadata]
    return Node(children, metadata), rest[num_metadata:]


def _read_input():
    with open("aoc/d8/input.txt") as file:
        return list(map(int, file.readline().strip().split(" ")))


@dataclass
class Node:
    children: List["Node"]
    metadata: List[int]

    def metadata_sum(self):
        return sum(self.metadata) + sum([child.metadata_sum() for child in self.children])

    def supervalue(self):
        if not self.children:
            return sum(self.metadata)

        return sum(
            [
                self.children[meta - 1].supervalue()
                for meta in self.metadata
                if meta and meta <= len(self.children)
            ]
        )


if __name__ == "__main__":
    print(metadata_sum())
    print(supervalue())
