def main():
    reg0 = 0
    reg1 = 0
    reg2 = 0
    reg3 = 0
    reg4 = 0
    reg5 = 0

    # ip 3
    while True:
        while True:
            if False:
                while True:
                    reg5 = 1  # 1
                    while True:
                        reg2 = 1  # 2
                        reg1 = reg5 * 1  # 3
                        # reg1 = 1 if reg1 == reg4 else 0  # 4
                        # reg3 += reg1  # 5
                        if reg1 == reg4:  # 5
                            reg1 = 1
                        elif reg1 != reg4:  # 5
                            # reg3 += 1  # 6
                            reg1 = 0
                        reg0 += reg5  # 7
                        reg2 += 1  # 8
                        # reg1 = 1 if reg2 > reg4 else 0  # 9
                        # reg3 += reg1  # 10
                        if reg2 > reg4:  # 10
                            reg1 = 1
                            break
                        else:  # 10
                            reg1 = 0
                            # goto 2  # 11
                    reg5 += 1  # 12
                    reg1 = 1 if reg5 > reg4 else 0  # 13
                    # reg3 += reg1  # 14
                    # reg3 = 1  # 15
                    if reg5 > reg4:
                        reg1 = 1
                        break
                # reg3 = reg3 * reg3  # 16
                # reg3 = 16 * 16  # 16
                return reg0
            else:
                reg3 = 17
                reg4 += 2  # 17
                reg4 *= reg4 * 209  # 18
                # reg4 *= 209  # 19
                # reg4 *= 11  # 20
                reg1 += 6  # 21
                reg1 *= 22  # 22
                reg1 += 21  # 22
                reg4 += reg1  # 24
                if reg0 >= 10:
                    return reg0
                if reg0 > 0:
                    break
                reg3 += reg0  # 25
                # reg3 = 0  # 26
            if reg0 <= 1:
                reg1 = 3  # 27
            if reg0 <= 2:
                reg1 *= 28  # 28
            if reg0 <= 3:
                reg1 += 29  # 29
            if reg0 <= 4:
                reg1 *= 30  # 30
            if reg0 <= 5:
                reg1 *= 14  # 31
            if reg0 <= 6:
                reg1 *= 32  # 32
            if reg0 <= 7:
                reg4 += reg1  # 33
            if reg0 <= 8:
                reg0 = 0  # 34
            # reg3 = 0  # 35


main()
