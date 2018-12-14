import unittest
from unittest.mock import mock_open, patch

from aoc.d12.main import sum_pot_numbers_containing_plants

DATA = "initial state: #..#.#..##......###...###\n\n...## => #\n..#.. => #\n.#... => #\n.#.#. => #\n.#.## => #\n.##.. => #\n.#### => #\n#.#.# => #\n#.### => #\n##.#. => #\n##.## => #\n###.. => #\n###.# => #\n####. => #\n"


class TestCase(unittest.TestCase):
    def test_find_largest_area(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual(325, sum_pot_numbers_containing_plants())


if __name__ == "__main__":
    unittest.main()
