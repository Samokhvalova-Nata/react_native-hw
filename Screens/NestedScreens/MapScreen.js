import React from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
    const latitude = route.params.geoLocation?.latitude ?? 50.45033004843756;
    const longitude = route.params.geoLocation?.longitude ?? 30.523874329583546;
    console.log('route.params', route.params)

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitude,
                    longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
                mapType="standard"
                minZoomLevel={15}
                showsUserLocation={true}
            >
                {route.params && (
                    <Marker
                        title={route.params?.photoLocation ?? "Я тут"}
                        coordinate={{ latitude: latitude, longitude: longitude }}
                        description=""
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
        justifyContent: "center",
    },
    mapStyle: {
        flex: 1,
    },
});