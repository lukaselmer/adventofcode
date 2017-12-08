import * as fs from "fs";
import { sum } from "../utils";

interface Yell {
  name: string;
  weight: number;
  balancing: string[];
}

interface YellNode {
  name: string;
  weight: number;
  totalWeight: number;
  children: YellNode[];
}
export function day7() {
  console.log(`Part 1: ${findRoot(readYells()).name}`);
  console.log(`Part 2: ${calcCorrectWeight(readYells())}`);
}

function readYells(): Yell[] {
  return fs
    .readFileSync("./7/input.txt")
    .toString()
    .trim()
    .split("\n")
    .map(line => line.trim())
    .map(line => {
      const [name, weightInBrackets, ...balancing] = line.split(" ");
      balancing.shift();
      const weight = Number(
        weightInBrackets.slice(1, weightInBrackets.length - 1)
      );
      return { name, weight, balancing };
    });
}

function findRoot(yells: Yell[]): Yell {
  const children: { [name: string]: boolean } = {};
  yells.forEach(yell =>
    yell.balancing.forEach(name => (children[name] = true))
  );
  return yells.find(yell => !children[yell.name]) as Yell;
}

function calcCorrectWeight(yells: Yell[]): number {
  const rootYell = findRoot(yells);
  const yellsByName: { [name: string]: Yell } = {};
  yells.forEach(yell => (yellsByName[yell.name] = yell));

  const root: YellNode = {
    name: rootYell.name,
    weight: rootYell.weight,
    totalWeight: 0,
    children: childNodes(rootYell.balancing, yellsByName)
  };
  setTotalWeight(root);
  const [node, parent] = findBadWeightNode(root, root);
  const weights = parent.children.map(child => child.totalWeight).sort();
  const correction =
    weights[0] === weights[1]
      ? weights[0] - weights[weights.length - 1]
      : weights[weights.length - 1] - weights[0];
  return node.weight + correction;
}

function childNodes(
  childNames: string[],
  yellsByName: { [name: string]: Yell }
): YellNode[] {
  return childNames.map(name => {
    return {
      name: name,
      weight: yellsByName[name].weight,
      totalWeight: 0,
      children: childNodes(yellsByName[name].balancing, yellsByName)
    };
  });
}

function setTotalWeight(node: YellNode) {
  node.children.forEach(setTotalWeight);
  node.totalWeight =
    sum(node.children.map(child => child.totalWeight)) + node.weight;
}

function findBadWeightNode(node: YellNode, parent: YellNode): YellNode[] {
  const outlier = findOutlier(node.children);
  if (outlier) return findBadWeightNode(outlier, node);
  return [node, parent];
}

function findOutlier(nodes: YellNode[]): YellNode | undefined {
  const correctWeight = nodes.map(node => node.totalWeight).sort()[1];
  return nodes.find(node => node.totalWeight !== correctWeight);
}

day7();
