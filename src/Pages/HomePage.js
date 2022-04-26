import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList,Alert,ActivityIndicator} from 'react-native'
import { Appbar,useTheme } from 'react-native-paper';
import Card from '../Components/Card';
import Realm from "realm";
const { UUID } = Realm.BSON;
import {FavoritesSchema} from '../RealmSchemas/FavoritesSchema'

export default function HomePage(props) {
  const [DATA, setDATA] = useState([])
  const [loading, setloading] = useState(false)
  const {colors} = useTheme()

  const GET = async () => {
    setloading(true)
    try {
      const realm = await Realm.open({schema: [FavoritesSchema]});
      const Favorites = realm.objects("Favorites")
      const Result = await fetch('https://625fa7a992df0bc0f337dae4.mockapi.io/trips')
      const DATA = await Result.json()
      setloading(false)
      if(DATA){
        const HelperArray = DATA.map(el => {
          const isFavorite = Favorites.find(ele => ele.id == el.id)
          return {...el,isFavorite:isFavorite?true:false}
        })
        setDATA(HelperArray)
      }
    } catch (error) {
      console.log(error);
      setloading(false)
      Alert.alert("Sorun","Beklenmeyen bir sorun oluştu lütfen internet bağlantınızı kontrol edin.",[{text:"Tamam",onPress:() => null}])
    }
  }

  const CardPress = (i,distanceKm) => {
    const Element = DATA[i]
    props.navigation.navigate("MapPage",{Element:{...Element,distanceKm}})
  }

  const FavoritePress = async(i) => {
    const Element = DATA[i]
    const {isFavorite,id} = Element
    try {
      const realm = await Realm.open({schema: [FavoritesSchema]});
      setDATA(DATA.map(el => (el.id==id?{...el,isFavorite:!isFavorite}:el)))
      if(!isFavorite){
        realm.write(() => {
          realm.create("Favorites",{id:id.toString(),_id:new UUID()})
        })
      }else{
        const Favorites = realm.objects("Favorites")
        const Element = Favorites.find(el => el.id == id.toString())
        realm.write(() => {
          realm.delete(Element)
        })
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Sorun","Beklenmeyen bir sorun oluştu lütfen internet bağlantınızı kontrol edin.",[{text:"Tamam",onPress:() => null}])
    }
  }

  useEffect(() => {
    GET()
  }, [])

  return (
    <View style={[styles.container]}>
      {loading && <ActivityIndicator size="large" color={colors.primary} style={[styles.loadingModal]}/>}
      <Appbar.Header>
        <Appbar.Content title="Hareketler" subtitle="Geçmiş hareketler" />
      </Appbar.Header>
      <View style={[styles.body]}>
        <FlatList
          contentContainerStyle={{flexGrow:1}}
          data={DATA}
          keyExtractor={(i, key) => i.id}
          renderItem={({ item,index }) => <Card item={item} index={index}  FavoritePress={FavoritePress} CardPress={CardPress}/>}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  loadingModal:{
    width:"100%",
    height:"100%",
    position:"absolute",
    zIndex:1,
    elevation:1
  }
})