import unittest

from aoc.d25.main import count_clusters


class TestCase(unittest.TestCase):
    def test_count_clusters1(self):
        self.assertEqual(count_clusters("example-1"), 2)

    def test_count_clusters2(self):
        self.assertEqual(count_clusters("example-2"), 1)

    def test_count_clusters3(self):
        self.assertEqual(count_clusters("example-3"), 4)

    def test_count_clusters4(self):
        self.assertEqual(count_clusters("example-4"), 3)

    def test_count_clusters5(self):
        self.assertEqual(count_clusters("example-5"), 8)


if __name__ == "__main__":
    unittest.main()
