import unittest
from unittest.mock import mock_open, patch

from aoc.d8.main import metadata_sum

DATA = "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2\n"


class TestCase(unittest.TestCase):
    def test_metadata_sum(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual(138, metadata_sum())


if __name__ == "__main__":
    unittest.main()
