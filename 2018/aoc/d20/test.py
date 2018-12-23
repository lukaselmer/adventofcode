import unittest

from aoc.d20.main import longest_path
from aoc.d20.maze import build_maze
from aoc.d20.parser import parse
from aoc.d20.tokenizer import tokenize


def _read_file(filename: str):
    with open(f"aoc/d20/{filename}.txt") as file:
        return file.read()


class TokenizerTestCase(unittest.TestCase):
    def test_tokenize_simple(self):
        self.assertListEqual(tokenize("^ENWW$"), ["ENWW"])

    def test_tokenize_brackets(self):
        self.assertListEqual(tokenize("^ENWW(NE|EW)$"), ["ENWW", "(", "NE", "|", "EW", ")"])

    def test_tokenize_partly_empty_bracket(self):
        self.assertListEqual(tokenize("^ENWW(NE|)$"), ["ENWW", "(", "NE", "|", "", ")"])

    def test_tokenize_complex(self):
        self.assertListEqual(
            tokenize("^ENS(NEWS|)SSSEEN(WNSE|)EE(|SWEN)NNN$"),
            [
                "ENS",
                "(",
                "NEWS",
                "|",
                "",
                ")",
                "SSSEEN",
                "(",
                "WNSE",
                "|",
                "",
                ")",
                "EE",
                "(",
                "",
                "|",
                "SWEN",
                ")",
                "NNN",
            ],
        )


class ParserTestCase(unittest.TestCase):
    def test_parse_simple(self):
        tree = parse("^ENWW$")
        self.assertListEqual(tree.children, ["ENWW"])

    def test_parse_brackets(self):
        tree = parse("^ENWW(NE|EW)$")
        self.assertEqual(tree.children[0], "ENWW")
        self.assertEqual(tree.children[1].children[0], "NE")
        self.assertEqual(tree.children[1].children[1], "|")
        self.assertEqual(tree.children[1].children[2], "EW")

    def test_parse_brackets_multi_roots(self):
        tree = parse("^ENWW(NE|EW)SSS$")
        self.assertEqual(tree.children[0], "ENWW")
        self.assertEqual(tree.children[1].children[0], "NE")
        self.assertEqual(tree.children[1].children[1], "|")
        self.assertEqual(tree.children[1].children[2], "EW")
        self.assertEqual(tree.children[2], "SSS")

    def test_parse_deep(self):
        tree = parse("^ENWW(N|(EEE|SSS)|SS)NEW$")
        self.assertEqual(tree.children[0], "ENWW")
        self.assertEqual(tree.children[1].children[0], "N")
        self.assertEqual(tree.children[1].children[1], "|")
        self.assertEqual(tree.children[1].children[2].children[0], "EEE")
        self.assertEqual(tree.children[1].children[2].children[1], "|")
        self.assertEqual(tree.children[1].children[2].children[2], "SSS")
        self.assertEqual(tree.children[1].children[3], "|")
        self.assertEqual(tree.children[1].children[4], "SS")
        self.assertEqual(tree.children[2], "NEW")

    def test_parse_deeper(self):
        tree = parse("^ENWW(N((EEE|SSS)SS))NEW$")
        self.assertEqual(tree.children[0], "ENWW")
        self.assertEqual(tree.children[1].children[0], "N")
        self.assertEqual(tree.children[1].children[1].children[0].children[0], "EEE")
        self.assertEqual(tree.children[1].children[1].children[0].children[1], "|")
        self.assertEqual(tree.children[1].children[1].children[0].children[2], "SSS")
        self.assertEqual(tree.children[1].children[1].children[1], "SS")
        self.assertEqual(tree.children[2], "NEW")


class MazeTestCase(unittest.TestCase):
    def test_build_maze_abc(self):
        self.assertEqual(str(build_maze("^NN(EE)SS$")), _read_file("example-abc"))

    def test_build_maze_a_or_bc(self):
        self.assertEqual(str(build_maze("^NN|(EE)SS$")), _read_file("example-a_or_bc"))

    def test_build_maze_a_or_b_or_c(self):
        self.assertEqual(str(build_maze("^NN|(EE)|SS$")), _read_file("example-a_or_b_or_c"))

    def test_build_maze_ab_or_c(self):
        self.assertEqual(str(build_maze("^NN(EE)|SS$")), _read_file("example-ab_or_c"))

    def test_build_maze_example_1(self):
        self.assertEqual(str(build_maze("^ENWWW(NEEE|SSE(EE|N))$")), _read_file("example-1"))

    def test_build_maze_example_2(self):
        self.assertEqual(
            str(build_maze("^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$")),
            _read_file("example-2"),
        )

    def test_build_maze_example_3(self):
        self.assertEqual(
            str(build_maze("^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$")),
            _read_file("example-3"),
        )


class LongestPathTestCase(unittest.TestCase):
    def test_longest_path_abc(self):
        self.assertEqual(longest_path("^NN(EE)SS$")[0], 6)

    def test_longest_path_example_1(self):
        self.assertEqual(longest_path("^ENWWW(NEEE|SSE(EE|N))$")[0], 10)

    def test_longest_path_example_2(self):
        self.assertEqual(longest_path("^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$")[0], 23)

    def test_longest_path_example_3(self):
        self.assertEqual(
            longest_path("^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$")[0], 31
        )

    def test_longest_path_example_4(self):
        self.assertEqual(longest_path("^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$")[0], 18)

    def test_longest_path_example_5(self):
        self.assertEqual(longest_path("^WNE$")[0], 3)


if __name__ == "__main__":
    unittest.main()
