from __future__ import annotations

from typing import List

from dataclasses import dataclass


def surviving_cart(filename: str):
    track = Track(_read_input(filename))

    while len(track.carts) > 1:
        track.tick(stop_on_crash=False)

    return (track.carts[0].y, track.carts[0].x)


def first_crash_location(filename: str):
    track = Track(_read_input(filename))
    while True:
        crash = track.tick(stop_on_crash=True)
        if crash:
            return crash


def _read_input(filename: str):
    with open(f"aoc/d13/{filename}.txt") as file:
        return [line.rstrip() for line in file.readlines() if line.rstrip()]


class Track:
    def __init__(self, lines: List[str]):
        self.track = [[field for field in line] for line in lines]
        self.carts = [
            Cart(x=x, y=y, direction=field, next_turn="left")
            for x, line in enumerate(lines)
            for y, field in enumerate(line)
            if _is_cart(field)
        ]

        for cart in self.carts:
            self._fix_track(cart)

        self.cart_lookup = {(cart.x, cart.y): cart for cart in self.carts}

    def _fix_track(self, cart):
        if cart.direction in "^v":
            self.track[cart.x][cart.y] = "|"
        else:
            self.track[cart.x][cart.y] = "-"

    def __str__(self):
        track = "\n".join(
            [
                "".join(
                    [
                        self.cart_lookup[(x, y)].direction if (x, y) in self.cart_lookup else field
                        for y, field in enumerate(line)
                    ]
                )
                for x, line in enumerate(self.track)
            ]
        )
        return f"{track}\n{self.carts}\n"

    def tick(self, stop_on_crash):
        self.carts.sort(key=lambda cart: (cart.x, cart.y))

        crashed = False
        for cart in self.carts:
            crash_coordinate = self._move_cart(cart)
            if crash_coordinate:
                if stop_on_crash:
                    return crash_coordinate
                crashed = True

        if crashed:
            self.carts = [cart for cart in self.carts if not cart.crashed]

        return None

    def _move_cart(self, cart):
        if cart.crashed:
            return None

        del self.cart_lookup[(cart.x, cart.y)]
        cart.tick()

        if (cart.x, cart.y) in self.cart_lookup:
            cart.crash()
            self.cart_lookup[(cart.x, cart.y)].crash()
            del self.cart_lookup[(cart.x, cart.y)]
            return (cart.y, cart.x)

        self.cart_lookup[(cart.x, cart.y)] = cart

        track_field = self.track[cart.x][cart.y]

        if track_field == "+":
            cart.cross_turn()
        elif track_field in "\\/":
            cart.normal_turn(track_field)

        return None


def _is_cart(field: str):
    return field in "^>v<"


@dataclass
class Cart:
    x: int
    y: int
    direction: str
    next_turn: str

    def cross_turn(self):
        if self.next_turn == "left":
            self.direction = {"^": "<", ">": "^", "v": ">", "<": "v"}[self.direction]
            self.next_turn = "straight"
        elif self.next_turn == "right":
            self.direction = {"^": ">", ">": "v", "v": "<", "<": "^"}[self.direction]
            self.next_turn = "left"
        else:
            self.next_turn = "right"

    def normal_turn(self, track_field: str):
        if track_field == "/":
            self.direction = {"^": ">", ">": "^", "v": "<", "<": "v"}[self.direction]
        else:
            self.direction = {"^": "<", ">": "v", "v": ">", "<": "^"}[self.direction]

    def tick(self):
        x, y = {"^": (-1, 0), ">": (0, 1), "v": (1, 0), "<": (0, -1)}[self.direction]
        self.x += x
        self.y += y

    def crash(self):
        self.direction = "X"

    @property
    def crashed(self):
        return self.direction == "X"


if __name__ == "__main__":
    print(first_crash_location("input"))
    print(surviving_cart("input"))
