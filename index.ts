import nodes from "./nodes";

function initMap(): void {

  window.mapInstance = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
      center: { lat: 60.31689593036639, lng: 24.96863419739257 },
      zoom: 17,
      mapTypeId: "satellite",
      }
  );

  const markerSymbol = {
    path: google.maps.SymbolPath.CIRCLE,
    scale: 8,
    strokeColor: "#ff0",
  };

  const endSymbol = {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      strokeColor: "#0f0",
  };

  window.path = new google.maps.Polyline({
    path: getNodes(21, 15),
    strokeColor: "#0f0",
    icons: [
    {
        icon: markerSymbol,
        offset: "100%",
    }, 
    {
        icon: endSymbol,
        offset: "100%",
    },
    ],
    map: window.mapInstance,
  });

  animateCircle(window.path);
}
  
function animateCircle(line: google.maps.Polyline) {
  let count = 0;

  window.setInterval(() => {
    count = (count + 1) % 400;

    const icons = line.get("icons");

    icons[0].offset = count / 4 + "%";
    line.set("icons", icons);
  }, 20);
}

declare global {
  interface Window {
    initMap: () => void;
    mapInstance: google.maps.Map;
    find: () => void;
    path: google.maps.Polyline;
  }
}

type Node = {
  id: number;
  lat: number;
  lng: number;
  connections: number[];
  path?: Node[];
};

function find() {
  var start = parseInt((document.getElementById("start") as HTMLInputElement).value);
  var end = parseInt((document.getElementById("end") as HTMLInputElement).value);
  drawPath(start, end);
}

function drawPath(start: number, end: number) {
  window.path.setPath(getNodes(start, end) ?? []);
}

function getNodes(start: number, end: number) {
  const startNode = nodes.find(e => e.id === start);
  if (startNode)
    return breadthFirstSearch(nodes, startNode, end);
}

//For more complex graph we could use A* search
function breadthFirstSearch(graph: Node[], start: Node, idToSearch: number) {
  let queue : Node[] = [];
  let path : Node[] = [];
  start.path = new Array(start);
  queue.push(start);
  path.push(start);
  let visited : number[] = [];
  visited.push(start.id);

  while (queue.length > 0) {
      let node = queue.shift();

      if (node === undefined)
        return null;

      for (var i = 0; i < node.connections.length; i++) {
          let connectedNode = graph.find(e => e.id === node!.connections[i]);
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
  return null;
};

window.initMap = initMap;
window.find = find;
export {};
  