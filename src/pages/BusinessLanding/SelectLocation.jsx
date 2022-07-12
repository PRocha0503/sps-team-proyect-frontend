/* eslint-disable no-undef */
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
import { TextField } from "@mui/material";

const render = (status) => {
  return <h1>{status}</h1>;
};

const API_KEY = process.env.REACT_APP_MAPS_API_KEY;

const getReverseGeocodingData = (lat, lng) => {
  var latlng = new google.maps.LatLng(lat, lng);

  return new Promise((resolve, reject) => {

    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng },  (results, status) =>{
        if (status !== google.maps.GeocoderStatus.OK) {
            reject(status);
        }
        if (status === google.maps.GeocoderStatus.OK) {
            let address = (results[0].formatted_address);

            resolve(address);
        }
    });
  });
};

const SelectLocation = ({businessLocation, setBusinessLocation, serviceArea, setServiceArea}) => {
  const [clicks, setClicks] = React.useState([]);
  const [zoom, setZoom] = React.useState(15); // initial zoom
  const [center, setCenter] = React.useState({
    lat: 0,
    lng: 0,
  });

  React.useEffect(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCenter(pos);
            
            await getReverseGeocodingData(pos.lat, pos.lng);
          },
          (error) => {
            setZoom(5);
          }
        );
      } else {
        setZoom(5);
      }
  }, []);

  const onClick = async (e) => {
    // avoid directly mutating state
    setClicks([e.latLng]);

    setBusinessLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
      address: await getReverseGeocodingData(e.latLng.lat(), e.latLng.lng()),
    });

    // setClicks([...clicks, e.latLng]); // Support for multiple stores
  };

  const onIdle = (m) => {
    setZoom(m.getZoom());
    setCenter(m.getCenter().toJSON());
  };

  const form = (
    <div
      style={{
        padding: "1rem",
        flexBasis: "250px",
        height: "100%",
        overflow: "auto",
      }}
    >
      <TextField
        id="outlined-basic"
        label="Service Area (mts)"
        variant="outlined"
        InputProps={{ inputProps: { min: 0, max: 10000 } }}
        fullWidth={true}
        onChange={(e) => {
          setServiceArea(Number(e.target.value));
        }}
        type="number"
      >
      </TextField>
      <h3>{clicks.length === 0 ? "Click on map to add ypur stores" : "Stores"}</h3>
      {clicks.map((latLng, i) => (
        <>
          <Card sx={{ minWidth: 250 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Business Location
              </Typography>
              <Typography variant="h5" component="div">
                Store at {businessLocation.address}
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                size="small"
                onClick={() => {
                  setClicks(clicks.filter((_, index) => index !== i));
                  setBusinessLocation({
                    lat: 0,
                    lng: 0,
                    address: "",
                  });
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
          <br/>
        </>

      ))}
      <Button 
        onClick={() => {
          setClicks([]);
          setBusinessLocation({
            lat: 0,
            lng: 0,
            address: "",
          });
        }}
        variant="contained"
      >
        Clear
      </Button>
    </div>
  );

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
          {clicks.map((latLng, i) => (
            <Circle key={i} center={latLng} radius={serviceArea} />
          ))}
        </Map>
      </Wrapper>

      {form}
    </div>
  );
};

const Map = ({ onClick, onIdle, children, style, ...options }) => {
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

  useDeepCompareEffectForMaps(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

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

  return (
    <>
      <div ref={ref} style={style} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { map });
        }
      })}
    </>
  );
};


const Circle = (options) => {
  const [circle, setCircle] = React.useState();

  React.useEffect(() => {
    if (!circle) {
      setCircle(new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
      }));
    }

    return () => {
      if (circle) {
        circle.setMap(null);
      }
    };
  }, [circle]);
  React.useEffect(() => {
    if (circle) {
      circle.setOptions(options);
    }
  }, [circle, options]);
  return null;
};

const Marker = (options) => {
  const [marker, setMarker] = React.useState();

  React.useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

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

const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  if (
    isLatLngLiteral(a) ||
    a instanceof google.maps.LatLng ||
    isLatLngLiteral(b) ||
    b instanceof google.maps.LatLng
  ) {
    return new google.maps.LatLng(a).equals(new google.maps.LatLng(b));
  }
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

export default SelectLocation;