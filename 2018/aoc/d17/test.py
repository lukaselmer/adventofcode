import unittest

from aoc.d17.main import count_reachable_tiles


class TestCase(unittest.TestCase):
    def test_count_reachable_tiles(self):
        self.assertEqual(count_reachable_tiles("example"), 57)


if __name__ == "__main__":
    unittest.main()
