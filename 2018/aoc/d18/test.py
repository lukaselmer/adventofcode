import unittest

from aoc.d18.main import _fields_str, resource_values, simulate


def readlines(filename):
    with open(f"aoc/d18/{filename}.txt") as file:
        lines = [line.strip() for line in file.readlines() if line.strip()]
        return "\n".join(lines)


class TestCase(unittest.TestCase):
    def test_simulate_1_turn(self):
        self.assertEqual(_fields_str(simulate("example-input", turns=1)), readlines("example-1-turn"))

    def test_simulate_10_turns(self):
        self.assertEqual(_fields_str(simulate("example-input", turns=10)), readlines("example-10-turn"))

    def test_resource_values_after_10_turns(self):
        self.assertEqual(resource_values("example-input", turns=10), 1147)


if __name__ == "__main__":
    unittest.main()
