import unittest
from unittest.mock import mock_open, patch

from aoc.d7.main import step_order

DATA = "Step C must be finished before step A can begin.\nStep C must be finished before step F can begin.\nStep A must be finished before step B can begin.\nStep A must be finished before step D can begin.\nStep B must be finished before step E can begin.\nStep D must be finished before step E can begin.\nStep F must be finished before step E can begin.\n"


class TestCase(unittest.TestCase):
    def test_step_order(self):
        with patch("builtins.open", mock_open(read_data=DATA)):
            self.assertEqual("CABDFE", step_order())


if __name__ == "__main__":
    unittest.main()
