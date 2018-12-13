import unittest
from unittest.mock import mock_open, patch

from aoc.d11.main import _calculate_value, largest_grid_value_coords, largest_grid_value_coords_of_3x3


class TestCase(unittest.TestCase):
    def test_cell_value(self):
        self.assertEqual(4, _calculate_value(8, (3, 5)))
        self.assertEqual(-5, _calculate_value(57, (122, 79)))
        self.assertEqual(0, _calculate_value(39, (217, 196)))
        self.assertEqual(4, _calculate_value(71, (101, 153)))

    def test_max_grid_value_of_3x3(self):
        self.assertEqual((33, 45), largest_grid_value_coords_of_3x3(18))
        self.assertEqual((21, 61), largest_grid_value_coords_of_3x3(42))

    def test_max_grid_value_of_any_size_18(self):
        self.assertEqual((90, 269, 16), largest_grid_value_coords(18))

    def test_max_grid_value_of_any_size_42(self):
        self.assertEqual((232, 251, 12), largest_grid_value_coords(42))


if __name__ == "__main__":
    unittest.main()
