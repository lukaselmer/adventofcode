def time_to_produce(goal_recipies_str: str):
    elf_position_a = 4
    elf_position_b = 6
    recipies = [3, 7, 1, 0, 1, 0, 1]
    index = 2
    goal_a, goal_b, goal_c, goal_d, goal_e, goal_f = list(map(int, list(goal_recipies_str)))
    length = len(recipies)
    prev = 0
    while True:
        recipie = recipies[elf_position_a] + recipies[elf_position_b]
        if recipie >= 10:
            recipies.append(1)
            length += 1

            if (
                prev == 0
                and recipies[index] == goal_a
                and recipies[index + 1] == goal_b
                and recipies[index + 2] == goal_c
                and recipies[index + 3] == goal_d
            ):
                return index
            prev = 1
            index += 1

        short_recipie = recipie % 10
        recipies.append(short_recipie)
        length += 1

        if (
            prev == 0
            and recipie == 1
            and recipies[index] == goal_a
            and recipies[index + 1] == goal_b
            and recipies[index + 2] == goal_c
            and recipies[index + 3] == goal_d
        ):
            return index
        index += 1
        prev = short_recipie

        elf_position_a += recipies[elf_position_a] + 1
        elf_position_a %= length
        elf_position_b += recipies[elf_position_b] + 1
        elf_position_b %= length


# def scores_after(num_recipies: int):
#     elf_positions = (0, 1)
#     recipies = [3, 7]
#     while len(recipies) <= num_recipies + 12:
#         _, elf_positions = _make_recipies(elf_positions, recipies)
#     return "".join([str(score) for score in recipies[num_recipies : num_recipies + 10]])


if __name__ == "__main__":
    # print(scores_after(825401))
    print(time_to_produce("825401"))
