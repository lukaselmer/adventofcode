import unittest

from aoc.d9.main import highscore


class TestCase(unittest.TestCase):
    def test_highscore_with_25_marbles(self):
        self.assertEqual(32, highscore(players=9, last_marble_value=25))

    def test_highscore_with_1618_marbles(self):
        self.assertEqual(8317, highscore(players=10, last_marble_value=1618))

    def test_highscore_with_7999_marbles(self):
        self.assertEqual(146373, highscore(players=13, last_marble_value=7999))

    def test_highscore_with_1104_marbles(self):
        self.assertEqual(2764, highscore(players=17, last_marble_value=1104))

    def test_highscore_with_6111_marbles(self):
        self.assertEqual(54718, highscore(players=21, last_marble_value=6111))

    def test_highscore_with_5807_marbles(self):
        self.assertEqual(37305, highscore(players=30, last_marble_value=5807))


if __name__ == "__main__":
    unittest.main()
