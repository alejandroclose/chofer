console.log("main.js");
$(document).ready(function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWxlamFuZHJvY2xvc2UiLCJhIjoiY2prYTFkODU1MDhidzN2cWp1bmFseGxoZSJ9.HeAugAVJ8wr3NHFCOnkn-Q";

  navigator.geolocation.getCurrentPosition(
    position => {
      const point = [position.coords.longitude, position.coords.latitude];
      console.log(point);
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
        center: point, // starting position [lng, lat]
        zoom: 14 // starting zoom
      });
      var originMarker = new mapboxgl.Marker().setLngLat(point).addTo(map);

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken
      });
      document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

      const startLatLong = [
        position.coords.longitude,
        position.coords.latitude
      ];
      geocoder.on("result", data => {
        const endLatLong = data.result.center;

        var destinationMarker = new mapboxgl.Marker()
          .setLngLat(endLatLong)
          .addTo(map);
        getRoute();

        //Route
        function getRoute() {
          console.log("routes started");
          // $('#full-route').removeClass('d-none');
          console.log("jquery remove");
          var start = startLatLong;
          var end = endLatLong;
          var directionsRequest =
            "https://api.mapbox.com/directions/v5/mapbox/driving-traffic/" +
            start[0] +
            "," +
            start[1] +
            ";" +
            end[0] +
            "," +
            end[1] +
            "?steps=true&geometries=geojson&access_token=" +
            mapboxgl.accessToken;
          $.ajax({
            method: "GET",
            url: directionsRequest
          }).done(function(data) {
            console.log(data);
            const routeDistance = (data.routes[0].distance / 1000).toFixed(2);
            const routeTime = (data.routes[0].duration / 60).toFixed(0);
            document.getElementById("distance").innerHTML = routeDistance;
            document.getElementById("time").innerHTML = routeTime;

            var route = data.routes[0].geometry;
            var instructions = document.getElementById("instructions");
            var steps = data.routes[0].legs[0].steps;
            steps.forEach(function(step) {
              instructions.insertAdjacentHTML(
                "beforeend",
                "<p>" + step.maneuver.instruction + "</p>"
              );
            });
            map.addLayer({
              id: "route",
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: route
                }
              },
              paint: {
                "line-width": 3
              }
            });
            map.addLayer({
              id: "start",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: start
                  }
                }
              }
            });
            map.addLayer({
              id: "end",
              type: "circle",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: end
                  }
                }
              }
            });
            var taxiRoute = {
              cost: (2.25 + 1.13 * routeDistance).toFixed(2)
            };
            document.getElementById("taxi-route").innerHTML =
              taxiRoute.cost + "€";

            var cabifyRoute = {
              cost: (2 * routeDistance).toFixed(2)
            };
            document.getElementById("cabify-route").innerHTML =
              cabifyRoute.cost + "€";

            var uberRoute = {
              cost: (1.42 * routeDistance + 0.16 * routeTime).toFixed(2)
            };
            document.getElementById("uber-route").innerHTML =
              uberRoute.cost + "€";

            //Modal

            $("#select-service").on("click", ".services", function() {
              serviceSelect = $(this).attr("id");
              console.log($(this));
              switch (serviceSelect) {
                case "taxi-service":
                  $(".modal-title").html("Taxi");
                  $(".modal-price").html("Total: " + taxiRoute.cost + "€");
                  $(".modal-time").html(
                    "Tiempo total del viaje: " + routeTime + "min"
                  );
                  $(".modal-distance").html(
                    "Distancia total del viaje: " + routeDistance + "km"
                  );
                  $(".bajada-bandera").html("Bajada de bandera: 2,25€");
                  $(".modal-minute-cost").html("Coste por minuto: 0€");
                  $(".modal-km-cost").html("Coste por km: 1,13€");

                case "uber-service":
                  $(".modal-title").html("Uber");
                  $(".modal-price").html("Total: " + uberRoute.cost + "€");
                  $(".modal-time").html(
                    "Tiempo total del viaje: " + routeTime + "min"
                  );
                  $(".modal-distance").html(
                    "Distancia total del viaje: " + routeDistance + "km"
                  );
                  $(".bajada-bandera").html("Bajada de bandera: 0€");
                  $(".modal-minute-cost").html("Coste por minuto: 0,16€");
                  $(".modal-km-cost").html("Coste por km: 1,42€");

                case "cabify-service":
                  $(".modal-title").html("Cabify");
                  $(".modal-price").html("Total: " + cabifyRoute.cost + "€");
                  $(".modal-time").html(
                    "Tiempo total del viaje: " + routeTime + "min"
                  );
                  $(".modal-distance").html(
                    "Distancia total del viaje: " + routeDistance + "km"
                  );
                  $(".bajada-bandera").html("Bajada de bandera: 0€");
                  $(".modal-minute-cost").html("Coste por minuto: 0€");
                  $(".modal-km-cost").html("Coste por km: 2€");
              }
            });
          });
        }
      });
    },
    error => {
      console.error("No puedo obtener la locaclización", error);
    }
  );
});
