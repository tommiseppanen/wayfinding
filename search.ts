import {Node} from "./nodes";

//For more complex graph we could use A* search
export function breadthFirstSearch(graph: Node[], start: Node, idToSearch: number): Node[] {
  const queue: Node[] = [];
  const path: Node[] = [];
  start.path = new Array(start);
  queue.push(start);
  path.push(start);
  const visited: number[] = [];
  visited.push(start.id);

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === undefined)
      return [];

    for (let i = 0; i < node.connections.length; i++) {
      const connectedNode = graph.find(e => e.id === node.connections[i]);
      if (connectedNode === undefined)
        continue;

      connectedNode.path = node.path === undefined ? [] : [...node.path];
      connectedNode.path.push(connectedNode)
      if (!visited.includes(connectedNode.id)) {            
        if (connectedNode.id === idToSearch)
          return connectedNode.path;
        
        visited.push(connectedNode.id);
        queue.push(connectedNode);
      }
    }
  }
  return [];
}