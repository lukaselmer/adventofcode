def tokenize(regex: str):
    return list(_tokenize(regex))


def _tokenize(regex: str):
    current = ""
    for index, char in enumerate(regex):
        if char in "ENWS":
            current += char
        else:
            if current:
                yield current
                current = ""
            if char in "^$":
                pass
            elif char == "|":
                if regex[index - 1] == "(":
                    yield ""
                yield char
                if regex[index + 1] == ")":
                    yield ""
            else:
                yield char
