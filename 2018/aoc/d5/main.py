from __future__ import annotations

from typing import List


def calculate_shortest_polymer_length():
    polymer = list(_read_input())
    letters = {letter.lower() for letter in polymer}
    return min([_trigger_all_reactions_without(polymer, letter) for letter in letters])


def _trigger_all_reactions_without(polymer: List[str], letter_filter: str):
    print(letter_filter)
    shorter_polymer = [letter for letter in polymer if letter_filter != letter.lower()]
    return _trigger_all_reactions(shorter_polymer)


def calculate_polymer_length():
    polymer = list(_read_input())
    return _trigger_all_reactions(polymer)


def _trigger_all_reactions(polymer: List[str]):
    while _react_on(polymer):
        pass
    return len(polymer)


def _read_input():
    with open("aoc/d5/input.txt") as file:
        return file.readline().strip()


def _react_on(polymer: List[str]):
    reacted = False
    for index, _ in enumerate(polymer):
        if index >= len(polymer) - 1:
            break
        if _can_react(polymer[index], polymer[index + 1]):
            del polymer[index + 1]
            del polymer[index]
            reacted = True
    return reacted


def _can_react(char_a: str, char_b: str):
    return char_a != char_b and char_a.lower() == char_b.lower()


if __name__ == "__main__":
    # print(calculate_polymer_length())
    print(calculate_shortest_polymer_length())
