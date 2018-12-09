from __future__ import annotations

from collections import Counter
from typing import Counter as CounterType

# from dataclasses import dataclass


def highscore(players: int, last_marble_value: int):
    scores: CounterType[int] = Counter()
    game = [0]
    current_marble_index = 0
    for value in range(1, last_marble_value + 1):
        elf = value % players
        normal_turn = value % 23 > 0
        if normal_turn:
            current_marble_index = (current_marble_index + 1) % len(game) + 1
            game.insert(current_marble_index, value)
        else:
            scores[elf] += value
            current_marble_index = (current_marble_index - 7) % len(game)
            scores[elf] += game[current_marble_index]
            del game[current_marble_index]

    return max(scores.values())


if __name__ == "__main__":
    print(highscore(424, 71482))
