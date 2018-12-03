import unittest
from unittest.mock import mock_open, patch

from aoc.d2.main import checksum


class ActuatorTestCase(unittest.TestCase):
    def test_checksum(self):
        input = "abcdef\nbababc\nabbcde\nabcccd\naabcdd\nabcdee\nababab"
        with patch("builtins.open", mock_open(read_data=input)):
            self.assertEqual(12, checksum())


if __name__ == "__main__":
    unittest.main()
