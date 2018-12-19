import unittest

from aoc.d17.main import count_reachable_tiles, count_still_water_tiles


class TestCase(unittest.TestCase):
    def test_count_reachable_tiles(self):
        self.assertEqual(count_reachable_tiles("example"), 57)

    def test_count_still_water_tiles(self):
        self.assertEqual(count_still_water_tiles("example"), 29)


if __name__ == "__main__":
    unittest.main()
