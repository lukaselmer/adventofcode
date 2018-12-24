# pylint: disable=C0103


def main(magic_number: int):
    r3 = r4 = 0

    while True:
        r4 = r3 | 65536
        r3 = 10649702
        while True:
            r3 = (((r3 + (r4 & 255)) & 16777215) * 65899) & 16777215
            if r4 >= 256:
                r4 = determine_r4(r4)
            else:
                print(r3)
                if magic_number == r3:
                    return
                break


def determine_r4(r4: int):
    r5 = 0
    while True:
        r5 += 1
        if r5 * 256 > r4:
            return r5 - 1


if __name__ == "__main__":
    main(10504829)
