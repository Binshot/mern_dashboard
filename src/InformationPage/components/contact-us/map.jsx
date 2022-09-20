import React, { useState, useCallback, useMemo } from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import resetLocation from "../../icons/reset-location.svg"

function ResetView({ map }) {
    const onClick = useCallback(() => {
      map.setView([14.729633, 120.942985], 18)
    }, [map])
  
    return (
        <div  className="reset-location" onClick={onClick}>
            <img src={resetLocation} alt="" />
        </div>
    )
  }

const DRMap = ({ center, zoom }) => {
    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} minZoom={12} ref={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[14.729633, 120.942985]}></Marker>
            </MapContainer>
        ),
        [],
    )

    return (
        <div className="drmap-container">
            {map ? <ResetView map={map} /> : null}
            {displayMap}
        </div>
    );
}

export default DRMap;