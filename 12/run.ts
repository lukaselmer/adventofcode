import * as fs from "fs";

const simpleInput = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`;

interface Connection {
  a: string;
  b: string;
}

type Connections = { [id: string]: { [id: string]: boolean } };

export function day10() {
  console.log(`Example part 1: ${countGroupZero(convertInput(simpleInput))}`);
  console.log(`Part 1: ${countGroupZero(convertInput(readInput()))}`);
  console.log(`Example part 2: ${countGroups(convertInput(simpleInput))}`);
  console.log(`Part 2: ${countGroups(convertInput(readInput()))}`);
}

function readInput() {
  return fs
    .readFileSync("./10/input.txt")
    .toString()
    .trim();
}

function convertInput(input: string): Connection[] {
  return input
    .split("\n")
    .map(convertLine)
    .reduce((all, current) => all.concat(current), []);
}

function convertLine(line: string): Connection[] {
  const [a, bs] = line.split(" <-> ");
  return bs.split(", ").map(b => {
    return { a: Number(a) + "", b: Number(b) + "" };
  });
}

function countGroupZero(connectionsList: Connection[]) {
  const connections = connectionsMap(connectionsList);
  fullyConnect(connections, "0");
  return Object.keys(connections["0"]).length;
}

function countGroups(connectionsList: Connection[]) {
  const connections = connectionsMap(connectionsList);
  const points = Object.keys(
    connectionsList
      .map(c => c.a)
      .concat(connectionsList.map(c => c.b))
      .reduce((map: { [id: string]: boolean }, current) => {
        map[current] = true;
        return map;
      }, {})
  );

  // Not a good implementation: this step takes very long (about 20 minutes)
  // And if the puzzle was larger, it would not scale :)
  // Better implementation would have been: mark the edges with different colors / tags
  points.forEach(point => fullyConnect(connections, point));

  const groups: string[] = [];

  points.forEach(point => {
    const connectedToAGroup = groups.some(id =>
      connectedTo(connections, point, id)
    );
    if (!connectedToAGroup) groups.push(point);
  });

  return groups.length;
}

function fullyConnect(connections: Connections, id: string) {
  Object.keys(connections[id]).forEach(connectionId => {
    addGroup(connections, id, connectionId);
  });
}

function connectionsMap(connectionsList: Connection[]) {
  const connections: Connections = {};
  connectionsList.forEach(connection => {
    connect(connections, connection.a, connection.b);
  });
  return connections;
}

function addGroup(connections: Connections, a: string, b: string) {
  if (!connectedTo(connections, a, b)) {
    connect(connections, a, b);

    Object.keys(connections[b]).forEach(transitiveConnectedId => {
      addGroup(connections, a, transitiveConnectedId);
    });
  }

  Object.keys(connections[b]).forEach(transitiveConnectedId => {
    if (!connectedTo(connections, a, transitiveConnectedId)) {
      addGroup(connections, a, transitiveConnectedId);
    }
  });
}

function connect(connections: Connections, a: string, b: string) {
  const aConnections = connections[a] || {};
  aConnections[a] = true;
  aConnections[b] = true;
  connections[a] = aConnections;

  const bConnections = connections[b] || {};
  bConnections[a] = true;
  bConnections[b] = true;
  connections[b] = bConnections;
}

function connectedTo(connections: Connections, a: string, b: string) {
  return connections[a] && connections[a][b];
}

day10();
