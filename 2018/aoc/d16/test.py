import unittest

from aoc.d16.operations import Recording, matching_operations
from aoc.d16.operators import (
    ALL,
    OperationParams,
    Registers,
    addi,
    addr,
    bani,
    banr,
    bori,
    borr,
    eqir,
    eqri,
    eqrr,
    gtir,
    gtri,
    gtrr,
    muli,
    mulr,
    seti,
    setr,
)


class OperatorTestCase(unittest.TestCase):
    def setUp(self):
        self.registers = Registers((1, 5), (2, 10), (3, 7), (4, 30), (5, 5), (6, 10))

    def test_addr(self):
        addr(self.registers, OperationParams(1, 2, 3))
        self.assertEqual(self.registers[3], 5 + 10)

    def test_addi(self):
        addi(self.registers, OperationParams(1, 2, 3))
        self.assertEqual(self.registers[3], 5 + 2)

    def test_mulr(self):
        mulr(self.registers, OperationParams(1, 2, 3))
        self.assertEqual(self.registers[3], 5 * 10)

    def test_muli(self):
        muli(self.registers, OperationParams(1, 2, 3))
        self.assertEqual(self.registers[3], 5 * 2)

    def test_banr(self):
        banr(self.registers, OperationParams(3, 4, 3))
        self.assertEqual(self.registers[3], 6)  # 7&30 = 6

    def test_bani(self):
        bani(self.registers, OperationParams(3, 30, 1))
        self.assertEqual(self.registers[1], 6)  # 7&30 = 6

    def test_borr(self):
        borr(self.registers, OperationParams(3, 4, 3))
        self.assertEqual(self.registers[3], 31)  # 7|30 = 31

    def test_bori(self):
        bori(self.registers, OperationParams(3, 30, 1))
        self.assertEqual(self.registers[1], 31)  # 7|30 = 31

    def test_setr(self):
        setr(self.registers, OperationParams(2, -1, 1))
        self.assertEqual(self.registers[1], 10)

    def test_seti(self):
        seti(self.registers, OperationParams(42, -1, 1))
        self.assertEqual(self.registers[1], 42)

    def test_gtir_if_a_gt_b(self):
        gtir(self.registers, OperationParams(6, 1, 3))
        self.assertEqual(self.registers[3], 1)

    def test_gtir_if_a_eq_b(self):
        gtir(self.registers, OperationParams(5, 1, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtir_if_a_sm_b(self):
        gtir(self.registers, OperationParams(4, 1, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtri_if_a_gt_b(self):
        gtri(self.registers, OperationParams(1, 6, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtri_if_a_eq_b(self):
        gtri(self.registers, OperationParams(1, 5, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtri_if_a_sm_b(self):
        gtri(self.registers, OperationParams(1, 4, 3))
        self.assertEqual(self.registers[3], 1)

    def test_gtrr_if_a_gt_b(self):
        gtrr(self.registers, OperationParams(1, 2, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtrr_if_a_eq_b(self):
        gtrr(self.registers, OperationParams(1, 5, 3))
        self.assertEqual(self.registers[3], 0)

    def test_gtrr_if_a_sm_b(self):
        gtrr(self.registers, OperationParams(2, 1, 3))
        self.assertEqual(self.registers[3], 1)

    def test_eqir_if_equal(self):
        eqir(self.registers, OperationParams(5, 1, 3))
        self.assertEqual(self.registers[3], 1)

    def test_eqir_if_different(self):
        eqir(self.registers, OperationParams(4, 1, 3))
        self.assertEqual(self.registers[3], 0)

    def test_eqri_if_equal(self):
        eqri(self.registers, OperationParams(1, 5, 3))
        self.assertEqual(self.registers[3], 1)

    def test_eqri_if_different(self):
        eqri(self.registers, OperationParams(1, 4, 3))
        self.assertEqual(self.registers[3], 0)

    def test_eqrr_if_equal(self):
        eqrr(self.registers, OperationParams(2, 6, 3))
        self.assertEqual(self.registers[3], 1)

    def test_eqrr_if_different(self):
        eqrr(self.registers, OperationParams(1, 6, 3))
        self.assertEqual(self.registers[3], 0)

    def test_number_of_all_operators(self):
        self.assertEqual(len(ALL), 16)


class OperatironsTestCase(unittest.TestCase):
    def test_number_of_matching_operators(self):
        recording = Recording(
            before=(3, 2, 1, 1), after=(3, 2, 2, 1), operation_id=-1, params=OperationParams(2, 1, 2)
        )
        operations = matching_operations(recording)
        self.assertSetEqual(operations, set(["mulr", "addi", "seti"]))


if __name__ == "__main__":
    unittest.main()
