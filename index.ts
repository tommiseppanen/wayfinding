function initMap(): void {
  const map = new google.maps.Map(
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

  // Create the polyline and add the symbol to it via the 'icons' property.
  const line = new google.maps.Polyline({
      path: [
      { lat: 60.315331190208546, lng: 24.972571565188332},
      { lat: 60.315714664255545, lng: 24.972182644881173},
      { lat: 60.31610188791155, lng: 24.971790430997714},
      { lat: 60.316494737521516, lng: 24.971553683280945},
      { lat: 60.31685279758621, lng: 24.970946817488766},
      { lat: 60.317219256810795, lng: 24.9705817558243},
      { lat: 60.31762575716601, lng: 24.970165919930253},
      { lat: 60.3180011176533, lng: 24.969774123293575},
      { lat: 60.31840340209919, lng: 24.969358490636353},
      { lat: 60.31880251327395, lng: 24.969025745640693},
      { lat: 60.3192163715269, lng: 24.968563656747335},
      { lat: 60.31942754545799, lng: 24.968359808862203},
      { lat: 60.31954043662202, lng: 24.968255202710623},
      { lat: 60.31947668636559, lng: 24.96808354133367},
      { lat: 60.319205746387354, lng: 24.967549781739706},
      { lat: 60.318872550265866, lng: 24.966784371016786},
      ],
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
      map: map,
  });

  animateCircle(line);
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
  }
}

type Node = {
  id: number;
  lat: number;
  lng: number;
  connections: number[];
  path: Node[];
};

//For more complex graph we could use A* search
function breadthFirstSearch(graph: Node[], start: Node, idToSearch: number) {
  let queue : Node[] = [];
  let path : Node[] = [];
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

          connectedNode.path = [...node.path];
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
export {};
  