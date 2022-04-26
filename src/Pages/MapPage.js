import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Appbar, useTheme } from 'react-native-paper';
import React from 'react'

export default function MapPage(props) {
  const goBack = () => props.navigation.goBack()
  const { coordinates, description, title, id, distanceKm } = props.route.params.Element
  const { colors } = useTheme()

  const ConvertCoordinates = (cor) => {
    const HelperArray = cor.map(el => ({ longitude: el[0], latitude: el[1] }))
    return HelperArray
  }

  const ResultConvertCordinates = ConvertCoordinates(coordinates)

  return (
    <View style={[styles.container]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title="Yol Tarifi" subtitle="Hareketin detayı" />
      </Appbar.Header>
      <MapView
        initialRegion={{ ...ResultConvertCordinates[0], latitudeDelta: 0.05, longitudeDelta: 0.05 }}
        style={{ flex: 1 }}
      >
        <Polyline
          coordinates={ResultConvertCordinates}
          strokeColor={colors.primary}
          strokeWidth={5}
        />
        <Marker draggable
          coordinate={ResultConvertCordinates[0]}
        />
        <Marker draggable
          pinColor="blue"
          coordinate={ResultConvertCordinates[ResultConvertCordinates.length - 1]}
        />
      </MapView>
      <SafeAreaView style={[styles.bottomContainer, { backgroundColor: colors.primary }]}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={[styles.title, { color: colors.surface }]}>{title}</Text>
          <Text style={[styles.description, { color: colors.white }]}>{description}</Text>
        </View>
        <Text style={[styles.kmTitle, { color: colors.surface }]}>{`${distanceKm} Km`}</Text>
      </SafeAreaView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "500",
    marginVertical: 8
  },
  description: {
    fontSize: 15
  },
  kmTitle: {
    fontSize: 33,
    fontWeight: "bold",
    margin: 16
  }
})