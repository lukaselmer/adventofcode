from __future__ import annotations

from collections import Counter, defaultdict
from typing import List

from dataclasses import dataclass


def find_most_spleepy_guard():
    shifts = _parse_shifts()
    sleep_minutes = Counter()
    for shift in shifts:
        sleep_minutes[shift.guard] += shift.count_sleep_minutes()
    [(guard, sleep_minutes)] = sleep_minutes.most_common(1)

    guard_shifts = [shift for shift in shifts if shift.guard == guard]
    guard_sleep_minutes = Counter()
    for shift in guard_shifts:
        for minute in shift.sleep_minutes():
            guard_sleep_minutes[minute] += 1
    [(minute, _counts)] = guard_sleep_minutes.most_common(1)

    return minute * guard


def find_most_spleepy_timeslot():
    shifts = _parse_shifts()
    guard_sleep_minutes = defaultdict(Counter)
    for shift in shifts:
        for minute in shift.sleep_minutes():
            guard_sleep_minutes[shift.guard][minute] += 1
    most_common_minutes = [
        _extract_most_common_minute(counter, guard) for guard, counter in guard_sleep_minutes.items()
    ]
    (_counts, minute, guard) = max(most_common_minutes)
    return minute * guard


def _extract_most_common_minute(counter: Counter, guard: int):
    [(minute, counts)] = counter.most_common(1)
    return (counts, minute, guard)


def _parse_shifts():
    lines = sorted(_read_input())
    shifts = []
    for line in map(_parse_line, lines):
        action, day, guard = line
        if action.is_start:
            shifts.append(Shift(guard=guard, day=day, actions=[]))
        shifts[-1].add_action(action)
    return shifts


def _read_input():
    with open("aoc/d4/input.txt") as file:
        return [line.strip() for line in file.readlines() if line.strip()]


def _parse_line(line: str):
    day, time_str, rest = _extract_day_and_time(line)
    time = _parse_time(time_str)
    if "begins shift" in line:
        return (Action(time=time, type="start"), day, _extract_guard(rest))
    if "falls asleep" in line:
        return (Action(time=time, type="sleep"), day, None)
    if "wakes up" in line:
        return (Action(time=time, type="wake"), day, None)
    raise RuntimeError(f"Unexpected line {line}")


def _extract_day_and_time(line: str):
    date_and_time, rest = line.replace("[", "").split("] ")
    day, time = date_and_time.split(" ")
    return (day, time, rest)


def _parse_time(time_str: str) -> Time:
    time = list(map(int, time_str.split(":")))
    return Time(hour=time[0], minute=time[1])


def _extract_guard(rest: str):
    return int(rest.replace("#", "").split(" ")[1])


@dataclass
class Time:
    hour: int
    minute: int

    def diff(self, other: Time):
        return (self.hour - other.hour) * 60 + self.minute - other.minute


@dataclass
class Action:
    type: str
    time: Time

    @property
    def is_start(self):
        return self.type == "start"

    @property
    def is_wake(self):
        return self.type == "wake"

    @property
    def is_sleep(self):
        return self.type == "sleep"


@dataclass()
class Shift:
    guard: int
    day: str
    actions: List[Action]

    def add_action(self, action: Action):
        self.actions.append(action)

    def count_sleep_minutes(self):
        total_sleep_minutes = 0
        for i, action in enumerate(self.actions):
            if action.is_wake:
                total_sleep_minutes += action.time.diff(self.actions[i - 1].time)
        return total_sleep_minutes

    def sleep_minutes(self):
        for i, action in enumerate(self.actions):
            if action.is_wake:
                for minute in range(self.actions[i - 1].time.minute, action.time.minute):
                    yield minute


if __name__ == "__main__":
    print(find_most_spleepy_guard())
    print(find_most_spleepy_timeslot())
