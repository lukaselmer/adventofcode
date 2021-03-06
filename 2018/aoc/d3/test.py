import unittest
from unittest.mock import mock_open, patch

from aoc.d3.main import find_intact_claim, multi_claimed_square_inches


class ActuatorTestCase(unittest.TestCase):
    def test_multi_claimed_square_inches(self):
        data = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2"
        with patch("builtins.open", mock_open(read_data=data)):
            self.assertEqual(4, multi_claimed_square_inches())

    def test_find_intact_claim(self):
        data = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2"
        with patch("builtins.open", mock_open(read_data=data)):
            self.assertEqual(3, find_intact_claim())


if __name__ == "__main__":
    unittest.main()
