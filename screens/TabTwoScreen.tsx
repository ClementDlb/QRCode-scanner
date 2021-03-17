import React from 'react';
import {
  RefreshControl, StyleSheet, Text, SafeAreaView, Image, View, FlatList, Dimensions, ToastAndroid, TouchableOpacity, ImageBackground, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const widthConst = Dimensions.get('screen').width;
const backgroundImg = require("../assets/images/background.jpg");

export default function App() {

  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);
  const [isListEmpty, setListEmpty] = React.useState(true);

  var initialData = [];

  const _retrieveData = async () => {
    try {
      deleteLocal
      const value = await AsyncStorage.getItem('@promoList');
      if (value !== null) {
        setListEmpty(false);
        var resString = value.split("|");
          resString.forEach(element => {
            var item = JSON.parse(element)
            console.log(item)
            initialData.push(item)
            setListData(initialData)
          });
      }
    } catch (error) {
      alert(error)
    }
  };

  const deleteLocal = async()=>{
    try{
      await AsyncStorage.removeItem('@promoList')
      initialData=[]
      setListEmpty(true)
      setListData(initialData)
    } catch(error){
      alert(error)
    }
  }

  function Item({ nom,  qr_code}) {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.buttonShowCode} onPress={()=>alert(qr_code)}><Text style={styles.itemText}>{nom}</Text></TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImg}></ImageBackground>
      <Button title="press" onPress={_retrieveData}></Button>
      <Button title="delete data" onPress={deleteLocal}></Button>
          <FlatList
          style={{position:"absolute", paddingTop:-20, }}
          data={listData}
          renderItem={({ item }) => <Item nom={item.nom} qr_code={item.qr_code} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_retrieveData} />
          }
          contentContainerStyle={styles.list}
        />
        <Image style={isListEmpty? styles.imgListEmpty : styles.imgDisabled} source={require('../assets/images/nocode.png')}></Image>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent:"center"
  },
  scrollView: {
    flex: 1, backgroundColor: '#eeeeee',
  },
  imgListEmpty:{
    position:"absolute",
    width:350,
    height:250,
  },
  imgDisabled:{
    position:"relative",
    width:0,
    height:0

  },
  backgroundCard:{
    backgroundColor:"#FFF", position:"absolute", zIndex:1
  },
  backgroundImg:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width:500,
  },
  buttonShowCode:{
    paddingTop:0, paddingLeft:5, borderRadius:10
  },
  list: {
    alignItems: 'flex-start', justifyContent: 'flex-start', width: widthConst, flex: 1
  },
  enappdWrapper: {
    position: 'absolute',  bottom: 0
  },
  enappdIcon: {
    width: 100, height: 40
  },
  item: {
    flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 20
  },
  thumbnail: {
    width: 60, height: 60, borderWidth: 1, borderColor: '#aaa'
  },
  itemText: {
    padding:5, fontSize: 18, backgroundColor: '#FFF', borderWidth:5
  }
});