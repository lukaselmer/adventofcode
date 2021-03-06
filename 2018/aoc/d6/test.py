import unittest
from unittest.mock import mock_open, patch

from aoc.d6.main import count_fields_within, find_largest_area

DATA = "1, 1\n1, 6\n8, 3\n3, 4\n5, 5\n8, 9\n"


class TestCase(unittest.TestCase):
    def test_find_largest_area(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual(17, find_largest_area())

    def test_count_fields_within(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual(16, count_fields_within(32))


if __name__ == "__main__":
    unittest.main()
