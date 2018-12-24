import unittest

from aoc.d23.main import best_position_distance, nanobots_in_radius


class TestCase(unittest.TestCase):
    def test_nanobots_in_radius(self):
        self.assertEqual(nanobots_in_radius("example-part-1"), 7)

    def test_best_position(self):
        self.assertEqual(best_position_distance("example-part-2"), 36)


if __name__ == "__main__":
    unittest.main()
