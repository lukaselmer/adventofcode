import unittest

from aoc.d24.main import alive_after_minimum_boost_required, count_alive_units


class TestCase(unittest.TestCase):
    def test_count_alive_units(self):
        self.assertEqual(count_alive_units("example-1", 0), ("infection", 5216))

    def test_boost_immune_winning(self):
        self.assertEqual(count_alive_units("example-1", 1570), ("immune", 51))

    def test_boost_infection_winning(self):
        self.assertEqual(count_alive_units("example-1", 1569), ("infection", 139))

    def test_minimum_boost_required(self):
        self.assertEqual(alive_after_minimum_boost_required("example-1"), 51)


if __name__ == "__main__":
    unittest.main()
