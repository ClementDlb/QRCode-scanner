import React from 'react';
import {
  RefreshControl, StyleSheet, Text, SafeAreaView, Image, View, FlatList, Dimensions, ToastAndroid, TouchableOpacity, ImageBackground, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const widthConst = Dimensions.get('screen').width;
const backgroundImg = require("../assets/images/background.jpg");

export default function App() {

  var initialData = [];

  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);

  const _retrieveData = async () => {
    try {
      deleteLocal
      const value = await AsyncStorage.getItem('@promoList');
      if (value !== null) {
        var resString = value.split("|");
          resString.forEach(element => {
            var item = JSON.parse(element)
            console.log(item)
            initialData.push(item)
            setListData(initialData)
          });{

          }
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const deleteLocal = async()=>{
    try{
      await AsyncStorage.removeItem('@promoList')
      initialData=[]
      setListData(initialData)
    } catch(error){
      alert(error)
    }
  }
/*
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

      try {
        let response = await fetch(
          'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms',
        );
        let responseJson = await response.json();
        //console.log(responseJson);
        setListData(responseJson.result.concat(initialData));
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
  }, [refreshing]);*/

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
      <View style={styles.backgroundCard}></View>
      <Button title="press" onPress={_retrieveData}></Button>
      <Button title="delete data" onPress={deleteLocal}></Button>
          <FlatList
          style={{position:"absolute", paddingTop:0, }}
          data={listData}
          renderItem={({ item }) => <Item nom={item.nom} qr_code={item.qr_code} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_retrieveData} />
          }
          contentContainerStyle={styles.list}
        />
        <View style={styles.enappdWrapper}>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'
  },
  scrollView: {
    flex: 1, backgroundColor: '#eeeeee',
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