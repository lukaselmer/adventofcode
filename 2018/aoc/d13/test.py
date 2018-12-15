import unittest

from aoc.d13.main import first_crash_location, surviving_cart


class TestCase(unittest.TestCase):
    def test_first_crash_location(self):
        self.assertEqual((7, 3), first_crash_location("example"))

    def test_surviving_cart(self):
        self.assertEqual((6, 4), surviving_cart("crash"))


if __name__ == "__main__":
    unittest.main()
