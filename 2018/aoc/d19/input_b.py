# pylint: disable=C0103


def main():
    r0 = r1 = r2 = r3 = r4 = r5 = 0

    # ip 3
    # r3 = 17  # 0
    if False:
        # while True:
        # r0 += r4
        return r0 + r4
        # while True:
        # r5 = 1  # 1
        # r0 += 1
        # while True:
        # r2 = 1  # 2
        # if r2 == 1:
        #     r0 += r5  # 7
        # r2 += 1  # 8
        # if r2 > r4:
        #    break
        # r1 = r5 * r2  # 3
        # r1 = 1 if r1 == r5 else 0  # 4
        # r3 = r1 + r3  # 5
        # r3 = r3 + 1  # 6
        # r0 = r5 + r0  # 7
        # if r1 == r5:
        # r1 = 1 if r2 > r4 else 0  # 9
        # r3 = r3 + r1  # 10
        # r3 = 2  # 11

        # r5 += 1  # 12
        # r1 = 1 if r5 > r4 else 0  # 13
        # r3 += r1  # 14
        # r3 = 1  # 15
        # if r5 > r4:
        # break

        # r3 = 16 * 16  # 16
        return r0
        while True:
            # r4 = 836 * r4 * r4
            # r4 += 2  # 17
            # r4 = 11 * 19 * 4 * r4 * r4  # 18
            # r4 *= 19  # 19
            # r4 *= 11  # 20
            # r1 += 6  # 21
            # r1 *= 22  # 22
            # r1 += 21  # 23
            r4 = 836 * r4 * r4 + 22 * r1 + 153  # 24
            r1 = r1 * 22 + 153
            # r3 = r3 + r0  # 25
            # goto(26 + r0)  # 25
            # r3 = 0  # 26
            if r0 == 0:
                break
            if r0 >= 10:
                return r0
            if r0 >= 1:
                r1 = 27  # 27
                if r0 >= 2:
                    r1 *= 28  # 28
                    if r0 >= 3:
                        r1 += 29  # 29
                        if r0 >= 4:
                            r1 *= 30  # 30
                            if r0 >= 5:
                                r1 *= 14  # 31
                                if r0 >= 6:
                                    r1 *= 32  # 32
                                    if r0 >= 7:
                                        r4 += r1  # 33
                                        if r0 >= 8:
                                            r0 = 0  # 34
            # r3 = 0  # 35
            break


main()
