import {nodes} from "./nodes";
import {breadthFirstSearch} from "./search";

declare global {
  interface Window {
    initMap: () => void;
    mapInstance: google.maps.Map;
    find: () => void;
    path: google.maps.Polyline;
  }
}

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

  const pathColor = "#0f0";
  const endSymbol = {
    path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
    strokeColor: pathColor,
  };

  window.path = new google.maps.Polyline({
    strokeWeight: 4,
    path: getNodes(18, 29),
    strokeColor: pathColor,
    icons: [
      {
        icon: endSymbol,
        offset: "100%",
      },
      {
        icon: markerSymbol,
        offset: "100%",
      }, 
    ],
    map: window.mapInstance,
  });

  animateCircle(window.path);
}

function getNodes(start: number, end: number) {
  const startNode = nodes.find(e => e.id === start);
  if (startNode)
    return breadthFirstSearch(nodes, startNode, end);
}
  
function animateCircle(line: google.maps.Polyline) {
  let count = 0;
  window.setInterval(() => {
    count = (count + 1) % 400;
    const icons = line.get("icons");
    icons[1].offset = count / 4 + "%";
    line.set("icons", icons);
  }, 20);
}

function find() {
  var start = parseInt((document.getElementById("start") as HTMLInputElement).value);
  var end = parseInt((document.getElementById("end") as HTMLInputElement).value);
  window.path.setPath(getNodes(start, end) ?? []);
}

window.initMap = initMap;
window.find = find;
export {};
  