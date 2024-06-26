class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    vertexArray.forEach(vertex => {
      this.addVertex(vertex)
    });
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node of vertex.adjacent) {
      this.removeEdge(vertex, node)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let toVisitStack = [start]
    let seen = new Set(toVisitStack)
    const values = []
    while (toVisitStack.length) {
      let currItem = toVisitStack.pop()
      values.push(currItem.value);

      for (let adjNode of currItem.adjacent) {
        if (!seen.has(adjNode)) {
          toVisitStack.push(adjNode);
          seen.add(adjNode);
        }
      }
    }
    return values;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let toVisitQueue = [start]
    let seen = new Set(toVisitQueue)
    const values = []
    while (toVisitQueue.length) {
      let currItem = toVisitQueue.shift()
      values.push(currItem.value);

      for (let adjNode of currItem.adjacent) {
        if (!seen.has(adjNode)) {
          toVisitQueue.push(adjNode);
          seen.add(adjNode);
        }
      }
    }
    return values;
  }

  shortestPath(start, end) {
    if (start === end) {
      return [start.value];
    }

    var queue = [start];
    let visited = new Set();
    let predecessors = {};
    let path = [];

    while (queue.length) {
      let currentVertex = queue.shift();

      if (currentVertex === end) {
        let stop = predecessors[end.value];
        while (stop) {
          path.push(stop);
          stop = predecessors[stop];
        }
        path.unshift(start.value);
        path.reverse();
        return path;
      }

      visited.add(currentVertex);
      for (let vertex of currentVertex.adjacent) {
        if (!visited.has(vertex)) {
          predecessors[vertex.value] = currentVertex.value;
          queue.push(vertex);
        }
      }
    }
  }
}

module.exports = { Graph, Node }