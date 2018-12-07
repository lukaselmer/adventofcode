import unittest
from unittest.mock import mock_open, patch

from aoc.d5.main import calculate_polymer_length


class TestCase(unittest.TestCase):
    def test_calculate_polymer_length(self):
        with patch("builtins.open", mock_open(read_data="dabAcCaCBAcCcaDA")):
            self.assertEqual(10, calculate_polymer_length())


if __name__ == "__main__":
    unittest.main()
