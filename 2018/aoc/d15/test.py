import unittest

from aoc.d15.main import _load_game, _read_input, lowest_required_attack_power, simulate


class TestCase(unittest.TestCase):
    def test_scenario_1_start(self):
        game = _load_game("scenario1", 3)
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1")))

    def test_scenario_1_tick_1(self):
        game = _load_game("scenario1", 3)
        game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-tick1")))

    def test_scenario_1_tick_2(self):
        game = _load_game("scenario1", 3)
        for _ in range(0, 2):
            game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-tick2")))

    def test_scenario_1_tick_3(self):
        game = _load_game("scenario1", 3)
        for _ in range(0, 3):
            game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-tick3")))

    def test_scenario_1_tick_4(self):
        game = _load_game("scenario1", 3)
        for _ in range(0, 4):
            game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-tick3")))

    def test_scenario_1_tick_10(self):
        game = _load_game("scenario1", 3)
        for _ in range(0, 10):
            game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-tick3")))

    def test_scenario_1_tick_200(self):
        game = _load_game("scenario1", 3)
        for _ in range(0, 200):
            game.tick()
        self.assertEqual(game.fields_as_str(), "\n".join(_read_input("scenario1-last")))

    def test_scenario_2(self):
        self.assertEqual(36334, simulate("scenario2"))

    def test_scenario_3(self):
        self.assertEqual(39514, simulate("scenario3"))

    def test_scenario_4(self):
        self.assertEqual(27755, simulate("scenario4"))

    def test_scenario_5(self):
        self.assertEqual(28944, simulate("scenario5"))

    def test_scenario_6(self):
        self.assertEqual(18740, simulate("scenario6"))

    def test_scenario_7(self):
        self.assertEqual(27730, simulate("scenario7"))

    def test_lowest_required_attack_power_scenario_3(self):
        self.assertEqual(31284, lowest_required_attack_power("scenario3"))

    def test_lowest_required_attack_power_scenario_4(self):
        self.assertEqual(3478, lowest_required_attack_power("scenario4"))

    def test_lowest_required_attack_power_scenario_5(self):
        self.assertEqual(6474, lowest_required_attack_power("scenario5"))

    def test_lowest_required_attack_power_scenario_6(self):
        self.assertEqual(1140, lowest_required_attack_power("scenario6"))

    def test_lowest_required_attack_power_scenario_7(self):
        self.assertEqual(4988, lowest_required_attack_power("scenario7"))


if __name__ == "__main__":
    unittest.main()
