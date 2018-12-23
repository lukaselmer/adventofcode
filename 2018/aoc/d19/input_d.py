# pylint: disable=C0103


def main():
    r0 = r1 = r2 = r4 = r5 = 0

    # part 1
    r1 = 153
    r4 = 989

    # part 2
    r1 = 10550400
    r4 = 10551389

    while True:
        while True:
            while True:
                r5 = 1
                while True:
                    r2 = 1
                    r1 = r5 * r2
                    r1 = 1 if r2 == 1 else 0
                    if r2 == 1:
                        r0 += r5
                    r2 += 1
                    if r2 > r4:
                        r1 = 1
                        break
                    else:
                        r1 = 0
                r5 += 1
                if r5 > r4:
                    r1 = 1
                    break
                else:
                    r1 = 0
            return r0
        while True:
            r4 = 836 * r4 * r4 + 22 * r1 + 153
            r1 = r1 * 22 + 153
            if r0 == 0:
                break
            if r0 >= 1:
                r1 = 27
                r1 *= 28
                r1 += 29
                r1 *= 30
                r1 *= 14
                r1 *= 32
                r4 += r1
                r0 = 0
            break


print(main())
