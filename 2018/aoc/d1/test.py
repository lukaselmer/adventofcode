import unittest
from unittest.mock import mock_open, patch

from aoc.d1.main import first_repetition, sum_up


class ActuatorTestCase(unittest.TestCase):
    def test_sum_up(self):
        with patch("builtins.open", mock_open(read_data="+10\n-15\n+7")):
            self.assertEqual(2, sum_up())

    def test_first_repetition_a(self):
        with patch("builtins.open", mock_open(read_data="+1\n-1")):
            self.assertEqual(0, first_repetition())

    def test_first_repetition_b(self):
        with patch("builtins.open", mock_open(read_data="+3\n+3\n+4\n-2\n-4")):
            self.assertEqual(10, first_repetition())

    def test_first_repetition_c(self):
        with patch("builtins.open", mock_open(read_data="-6\n+3\n+8\n+5\n-6")):
            self.assertEqual(5, first_repetition())

    def test_first_repetition_d(self):
        with patch("builtins.open", mock_open(read_data="+7\n+7\n-2\n-7\n-4")):
            self.assertEqual(14, first_repetition())


if __name__ == "__main__":
    unittest.main()
