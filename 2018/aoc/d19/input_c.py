# pylint: disable=C0103


def main():
    r0 = r1 = r2 = r4 = r5 = 0
    r4 = 153
    r1 = 153

    while True:
        r5 = 1
        while r5 <= r4:
            r2 = 1
            while r2 <= r4:
                if r2 == r5:
                    r0 += r5
                r2 += 1
            r5 += 1
        return r0
        while True:
            r4 = 836 * r4 * r4 + 22 * r1 + 153
            r1 = r1 * 22 + 153
            if r0 == 0:
                break
            if r0 >= 10:
                return r0
            if r0 >= 1:
                r1 = 27
                if r0 >= 2:
                    r1 *= 28
                    if r0 >= 3:
                        r1 += 29
                        if r0 >= 4:
                            r1 *= 30
                            if r0 >= 5:
                                r1 *= 14
                                if r0 >= 6:
                                    r1 *= 32
                                    if r0 >= 7:
                                        r4 += r1
                                        if r0 >= 8:
                                            r0 = 0

            break


print(main())
