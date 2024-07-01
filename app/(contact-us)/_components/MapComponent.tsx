"use client";

import { Map, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const MapComponent = () => {
    const map = useRef<Map | null>(null);

    useEffect(() => {
        if (map.current) return;
        map.current = new Map({
            container: "map",
            style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${"uCIoJujcl02HEH0AgzwQ"}`,
            center: [106.704803, 10.7716],
            zoom: 17,
        });
        let marker = new Marker({ color: "#141718" })
            .setLngLat([106.704803, 10.7716])
            .addTo(map.current);
    }, []);
    return <MapContainer id="map"></MapContainer>;
};

const MapContainer = styled.div`
    width: 100%;
    height: 400px;
`;

export default MapComponent;
