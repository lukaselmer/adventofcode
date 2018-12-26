from __future__ import annotations

from typing import Iterable, List, Set, Tuple

Point = Tuple[int, int, int, int]
Points = List[Point]


def count_clusters(filename: str):
    points: Points = sorted(list(_read_points(filename)))
    clusters = _build_neighbors(points)
    for cluster_index, _ in enumerate(list(clusters)):
        for neighbor_index in set(clusters[cluster_index]):
            clusters[cluster_index].update(clusters[neighbor_index])
            clusters[neighbor_index] = clusters[cluster_index]
    frozen_clusters = {frozenset(cluster) for cluster in clusters}
    return len(set(frozen_clusters))


def _build_neighbors(points: Points):
    # this could be implemented much more efficiently when using the fact that the points are sorted, but currently it's not needed
    return [set(_find_neighbors(point, points)) for point in points]


def _find_neighbors(needle: Point, points: Points):
    for index, point in enumerate(points):
        distance = sum([abs(comp_a - comp_b) for comp_a, comp_b in zip(needle, point)])
        if distance <= 3:
            yield index


def _read_points(filename: str) -> Iterable[Point]:
    with open(f"aoc/d25/{filename}.txt") as file:
        for line in file.readlines():
            if line.strip():
                comp1, comp2, comp3, comp4 = map(int, line.strip().split(","))
                yield (comp1, comp2, comp3, comp4)


# class Cluster:
#     def __init__(self, point):
#         self.points: Set[Point] = {point}

#     def merge(self, other_cluster: Cluster):
#         self.points.update(other_cluster.points)


if __name__ == "__main__":
    print(count_clusters("input"))
