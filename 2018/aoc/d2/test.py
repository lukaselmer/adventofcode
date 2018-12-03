import unittest
from unittest.mock import mock_open, patch

from aoc.d2.main import checksum, find_near_duplicate


class ActuatorTestCase(unittest.TestCase):
    def test_checksum(self):
        data = "abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab"
        with patch("builtins.open", mock_open(read_data=data)):
            self.assertEqual(12, checksum())

    def test_find_near_duplicate(self):
        data = "abcde\nfghij\nklmno\npqrst\nfguij\naxcye\nwvxyz"
        with patch("builtins.open", mock_open(read_data=data)):
            self.assertEqual("fgij", find_near_duplicate())


if __name__ == "__main__":
    unittest.main()
