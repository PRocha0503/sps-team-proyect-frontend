import * as React from "react";
import { createRoot } from "react-dom/client";
import { Wrapper } from "@googlemaps/react-wrapper";
import { createCustomEqual } from "fast-equals";
import { isLatLngLiteral } from "@googlemaps/typescript-guards";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const render = (status) => {
  return <h1>{status}</h1>;
};

const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const getReverseGeocodingData = (lat, lng) => {
  var latlng = new google.maps.LatLng(lat, lng);
  // This is making the Geocode request
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
      if (status !== google.maps.GeocoderStatus.OK) {
          alert(status);
      }
      // This is checking to see if the Geoeode Status is OK before proceeding
      if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          var address = (results[0].formatted_address);

          console.log(address);
          return address;
      }
  });
};

const SelectLocation = () => {
  // [START maps_react_map_component_app_state]
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(15); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });
  const [businessLocation, setBusinessLocation] = React.useState({
    lat: 0,
    lng: 0,
    address: "",
  });

  React.useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log(pos);
            setCenter(pos);
            
            getReverseGeocodingData(pos.lat, pos.lng);
          },
          (error) => {
            setZoom(5);
          }
        );
      } else {
        setZoom(5);
      }
  }, []);

  const onClick = (e) => {
    // avoid directly mutating state
    setBusinessLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      address: getReverseGeocodingData(e.latLng.lat(), e.latLng.lng()),
    });
    console.log(businessLocation['address']);
    setClicks([...clicks, e.latLng]);
  };

  const onIdle = (m) => {
    console.log("onIdle");
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  // [END maps_react_map_component_app_state]
  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <h3>{clicks.length === 0 ? "Click on map to add ypur stores" : "Stores"}</h3>
      {clicks.map((latLng, i) => (
        <>
          <Card sx={{ minWidth: 250 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Business Location
              </Typography>
              <Typography variant="h5" component="div">
                {console.log(businessLocation['address'])}
                Store at {businessLocation['address']}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Delete</Button>
            </CardActions>
          </Card>
          <br/>
        </>
        //<pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
      ))}
      <button onClick={() => setClicks([])}>Clear</button>
    </div>
  );
  // [START maps_react_map_component_app_return]
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Wrapper apiKey={API_KEY} render={render}>
        <Map
          center={center}
          onClick={onClick}
          onIdle={onIdle}
          zoom={zoom}
          style={{ flexGrow: "1", height: "100%" }}
        >
          {clicks.map((latLng, i) => (
            <Marker key={i} position={latLng} />
          ))}
        </Map>
      </Wrapper>
      {/* Basic form for controlling center and zoom of map. */}
      {form}
    </div>
  );
  // [END maps_react_map_component_app_return]
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  // [START maps_react_map_component_add_map_hooks]
  const ref = React.useRef(null);
  const [map, setMap] = React.useState();

  React.useEffect(() => {
    if (ref.current && !map) {
      
      setMap(new window.google.maps.Map(ref.current, {
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }));
    }
  }, [ref, map]);
  // [END maps_react_map_component_add_map_hooks]
  // [START maps_react_map_component_options_hook]
  // because React does not do deep comparisons, a custom hook is used
  // see discussion in https://github.com/googlemaps/js-samples/issues/946
  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);
  // [END maps_react_map_component_options_hook]
  // [START maps_react_map_component_event_hooks]
  React.useEffect(() => {
    if (map) {
      ["click", "idle"].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);
  // [END maps_react_map_component_event_hooks]
  // [START maps_react_map_component_return]
  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
  // [END maps_react_map_component_return]
};

// [START maps_react_map_marker_component]
const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  React.useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};

// [END maps_react_map_marker_component]
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
  // TODO extend to other types
  // use fast-equals for other objects
  return deepEqual(a, b);
});

function useDeepCompareMemoize(value) {
  const ref = React.useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }
  return ref.current;
}

function useDeepCompareEffectForMaps(callback, dependencies) {
  React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
}

/*window.addEventListener("DOMContentLoaded", () => {
  const root = createRoot(document.getElementById("root"));

  root.render(<SelectLocation />);
});*/

export default SelectLocation;