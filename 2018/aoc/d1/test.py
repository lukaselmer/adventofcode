import unittest
from unittest.mock import mock_open, patch

from aoc.d1.main import run


class ActuatorTestCase(unittest.TestCase):
    def test_run(self):
        with patch("builtins.open", mock_open(read_data="+10\n-15\n+7")):
            self.assertEqual(2, run())


if __name__ == "__main__":
    unittest.main()
