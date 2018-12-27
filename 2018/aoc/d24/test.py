import unittest

from aoc.d24.main import count_alive_units


class TestCase(unittest.TestCase):
    def test_count_alive_units(self):
        self.assertEqual(count_alive_units("example-1"), 5216)


if __name__ == "__main__":
    unittest.main()
