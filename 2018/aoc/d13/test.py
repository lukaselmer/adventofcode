import unittest

from aoc.d13.main import first_crash_location


class TestCase(unittest.TestCase):
    def test_first_crash_location(self):
        self.assertEqual((7, 3), first_crash_location("example"))


if __name__ == "__main__":
    unittest.main()
