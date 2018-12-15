import unittest

from aoc.d14.main import scores_after


class TestCase(unittest.TestCase):
    def test_scores_after_9(self):
        self.assertEqual("5158916779", scores_after(9))

    def test_scores_after_5(self):
        self.assertEqual("0124515891", scores_after(5))

    def test_scores_after_18(self):
        self.assertEqual("9251071085", scores_after(18))

    def test_scores_after_2018(self):
        self.assertEqual("5941429882", scores_after(2018))


if __name__ == "__main__":
    unittest.main()
