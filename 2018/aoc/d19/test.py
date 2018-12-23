import unittest

from aoc.d19.main import simulate


class TestCase(unittest.TestCase):
    def test_simulate(self):
        self.assertEqual(simulate("example"), 6)


if __name__ == "__main__":
    unittest.main()
