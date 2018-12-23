# pylint: disable=C0103


def main():
    r0 = r1 = r2 = r3 = r4 = r5 = 0

    # ip 3
    r3 = r3 + 16  # 0
    r3 = r3 + 16  # 0
    r5 = 1  # 1
    r2 = 1  # 2
    r1 = r5 * r2  # 3
    r1 = 1 if r1 == r5 else 0  # 4
    r3 = r1 + r3  # 5
    r3 = r3 + 1  # 6
    r0 = r5 + r0  # 7
    r2 = r2 + 1  # 8
    r1 = 1 if r2 > r4 else 0  # 9
    r3 = r3 + r1  # 10
    r3 = 2  # 11
    r5 = r5 + 1  # 12
    r1 = 1 if r5 > r4 else 0  # 13
    r3 = r1 + r3  # 14
    r3 = 1  # 15
    r3 = r3 * r3  # 16
    r4 = r4 + 2  # 17
    r4 = r4 * r4  # 18
    r4 = r3 * r4  # 19
    r4 = r4 * 11  # 20
    r1 = r1 + 6  # 21
    r1 = r1 * r3  # 22
    r1 = r1 + 21  # 23
    r4 = r4 + r1  # 24
    r3 = r3 + r0  # 25
    r3 = 0  # 26
    r1 = r3  # 27
    r1 = r1 * r3  # 28
    r1 = r3 + r1  # 29
    r1 = r3 * r1  # 30
    r1 = r1 * 14  # 31
    r1 = r1 * r3  # 32
    r4 = r4 + r1  # 33
    r0 = 0  # 34
    r3 = 0  # 35


main()
