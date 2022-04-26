import { View,StyleSheet,Text,TouchableOpacity } from 'react-native'
import { useTheme } from 'react-native-paper';
import React from 'react'

import ChevronRight from '../Assets/SvgIconsComponents/ChevronRight'
import Star from '../Assets/SvgIconsComponents/Star'

export default function Card({ item,index,CardPress,FavoritePress}) {
    const { colors } = useTheme()
    const { description, title, coordinates,isFavorite } = item

    const Haversine = (coords1, coords2) => {
        const R = 6371e3; // metres
        const φ1 = coords1[0] * Math.PI / 180; // φ, λ in radians
        const φ2 = coords2[0] * Math.PI / 180;
        const Δφ = (coords2[0] - coords1[0]) * Math.PI / 180;
        const Δλ = (coords2[1] - coords1[1]) * Math.PI / 180;

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // in metres
    }

    let totalDistance = 0
    for (let i = 1; i < coordinates.length; i++) {
        totalDistance += Haversine(coordinates[i - 1], coordinates[i])
    }
    const distanceKm = (totalDistance/1000).toFixed(1)

    return (
        <TouchableOpacity onPress={() => CardPress(index,distanceKm)} style={[styles.cardContainer,{backgroundColor:colors.surface}]}>
            <TouchableOpacity onPress={() => FavoritePress(index)} style={[styles.starContainer]}>
                <Star width={30} height={30} color={isFavorite?colors.orange:colors.gray} />
            </TouchableOpacity>
            <View style={[styles.card]}>
                <Text style={[styles.title,{color:colors.primary}]}>{title}</Text>
                <Text numberOfLines={1} style={[styles.description,{color:colors.black}]}>{description}</Text>
                <Text style={[styles.title,{color:colors.LightGrey}]}>{`${distanceKm} Km`}</Text>
            </View>
            <ChevronRight color={colors.primary}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        flexDirection:"row",
        alignItems:"center",
        borderRadius:4,
        margin:16,
        padding:8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    card:{
        flex:1,
        padding:4,
    },
    title:{
        fontSize:17,
        fontWeight:"bold",
        marginVertical:8
    },
    description:{
        fontSize:14
    },
    starContainer:{
        position:"absolute",
        elevation:1,
        zIndex:1,
        top:8,
        right:8,
        width:28,
        height:28,
        justifyContent:"center",
        alignItems:"center"
    }
})