import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen({route}) {


    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude: route.params.latitude,
                    longitude: route.params.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
                mapType="standard"
                minZoomLevel={15}
                showsUserLocation={true}
                // onMapReady={() => console.log("Map is ready")}
                // onRegionChange={() => console.log("Region change")}
            >
                {route.params && (
                    <Marker
                        title="Я тут"
                        coordinate={{ latitude: latitude, longitude: longitude }}
                        description='Hello'
                    />
                )}
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        // alignItems: "center",
        justifyContent: "center",
    },
    mapStyle: {
        flex: 1,
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
    },
});