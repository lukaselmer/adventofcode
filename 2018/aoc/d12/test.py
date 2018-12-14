import unittest
from unittest.mock import mock_open, patch

from aoc.d12.main import sum_pot_numbers_containing_plants

DATA = "initial state: #..#.#..##......###...###\n\n...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #\n"


class TestCase(unittest.TestCase):
    def test_sum_pot_numbers_containing_plants_after_20_iterations(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual(325, sum_pot_numbers_containing_plants())

    def test_sum_pot_numbers_containing_plants_after_40_000_iterations(self):
        self.assertEqual(920457, sum_pot_numbers_containing_plants(40000))


if __name__ == "__main__":
    unittest.main()
