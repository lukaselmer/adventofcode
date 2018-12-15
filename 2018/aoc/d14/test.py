import unittest

from aoc.d14.main import scores_after, time_to_produce


class TestCase(unittest.TestCase):
    def test_scores_after_9(self):
        self.assertEqual("5158916779", scores_after(9))

    def test_scores_after_5(self):
        self.assertEqual("0124515891", scores_after(5))

    def test_scores_after_18(self):
        self.assertEqual("9251071085", scores_after(18))

    def test_scores_after_2018(self):
        self.assertEqual("5941429882", scores_after(2018))

    def test_time_to_produce_51589(self):
        self.assertEqual(9, time_to_produce("51589"))

    def test_time_to_produce_01245(self):
        self.assertEqual(5, time_to_produce("01245"))

    def test_time_to_produce_92510(self):
        self.assertEqual(18, time_to_produce("92510"))

    def test_time_to_produce_59414(self):
        self.assertEqual(2018, time_to_produce("59414"))


if __name__ == "__main__":
    unittest.main()
