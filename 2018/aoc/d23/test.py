import unittest

from aoc.d23.main import nanobots_in_radius


class TestCase(unittest.TestCase):
    def test_nanobots_in_radius(self):
        self.assertEqual(nanobots_in_radius("example"), 7)


if __name__ == "__main__":
    unittest.main()
