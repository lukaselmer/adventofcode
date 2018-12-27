import unittest

from aoc.d22.main import shortest_path, total_risk_level


class TestCase(unittest.TestCase):
    def test_simulate_1_turn(self):
        self.assertEqual(total_risk_level(depth=510, target=(10, 10)), 114)

    def test_shortest_path(self):
        self.assertEqual(shortest_path(depth=510, target=(10, 10)), 45)


if __name__ == "__main__":
    unittest.main()
