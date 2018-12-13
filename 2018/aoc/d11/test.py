import unittest
from unittest.mock import mock_open, patch

from aoc.d11.main import Cell, largest_grid_value_coords


class TestCase(unittest.TestCase):
    def test_cell_value(self):
        self.assertEqual(4, Cell(8, (3, 5)).value)
        self.assertEqual(-5, Cell(57, (122, 79)).value)
        self.assertEqual(0, Cell(39, (217, 196)).value)
        self.assertEqual(4, Cell(71, (101, 153)).value)

    def test_max_grid_value(self):
        self.assertEqual((33, 45), largest_grid_value_coords(18))
        self.assertEqual((21, 61), largest_grid_value_coords(42))


if __name__ == "__main__":
    unittest.main()
