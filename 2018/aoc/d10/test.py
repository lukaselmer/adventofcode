import unittest
from unittest.mock import mock_open, patch

from aoc.d10.main import Simulator


def readlines(filename):
    with open(filename) as file:
        lines = [line.strip() for line in file.readlines() if line.strip()]
        return "\n".join(lines)


class TestCase(unittest.TestCase):
    def test_initial_step(self):
        step_output = readlines("aoc/d10/step-0.txt")
        with patch("builtins.open", mock_open(read_data=readlines("aoc/d10/example.txt"))):
            simulator = Simulator()
            self.assertEqual(step_output, str(simulator))

    def test_simulation(self):
        step_outputs = [readlines(f"aoc/d10/step-{step}.txt") for step in range(1, 5)]
        with patch("builtins.open", mock_open(read_data=readlines("aoc/d10/example.txt"))):
            simulator = Simulator()
            for step_output in step_outputs:
                simulator.simulate_step()
                self.assertEqual(step_output, str(simulator))

    def test_run(self):
        with patch("builtins.open", mock_open(read_data=readlines("aoc/d10/example.txt"))):
            simulator = Simulator()
            self.assertEqual(3, simulator.run())


if __name__ == "__main__":
    unittest.main()
