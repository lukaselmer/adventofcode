# pylint: disable=C0103

from typing import Set


def main(magic_number: int = -1):
    r3 = r4 = 0
    magic_numbers: Set[int] = set()
    last_magic_number = None

    while True:
        r4 = r3 | 65536
        r3 = 10_649_702
        while True:
            r3 = (((r3 + (r4 & 255)) & 16_777_215) * 65899) & 16_777_215
            if r4 >= 256:
                r4 = determine_r4(r4)
            else:
                if r3 in magic_numbers:
                    return last_magic_number
                last_magic_number = r3
                magic_numbers.add(r3)
                if magic_number == r3:
                    return last_magic_number
                break


def determine_r4(r4: int):
    r5 = 0
    while True:
        r5 += 1
        if r5 * 256 > r4:
            return r5 - 1


if __name__ == "__main__":
    print(main(-1))
