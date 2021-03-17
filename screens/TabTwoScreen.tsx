import React, { useEffect } from 'react';
import {
  RefreshControl, StyleSheet, Text, SafeAreaView, Image, View, FlatList, Dimensions, ToastAndroid, TouchableOpacity, ImageBackground, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';

const widthConst = Dimensions.get('screen').width;
const backgroundImg = require("../assets/images/background2.png");
const seeImg = require("../assets/images/see.png")

export default function App() {

  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);
  const [isListEmpty, setListEmpty] = React.useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      _retrieveData();
    } else {
      console.log(isFocused);
    }
  }, [isFocused]);

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

  function Item({ code, nom, montant, expireAt}) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{nom}</Text>
        <Text style={styles.amount}>{montant}%</Text>
        <Text style={styles.expDate}>{expireAt}</Text>
        <TouchableOpacity style={styles.seeButton} onPress={()=>alert(code)}><Image style={styles.seeImg} source={seeImg}></Image></TouchableOpacity>
        <Image style={styles.couponImg} source={require('../assets/images/coupon.png')}></Image>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImg}></ImageBackground>
      <Button title="delete data" onPress={deleteLocal}></Button>
          <FlatList
          style={{position:"absolute", paddingTop:-20, paddingLeft:40 }}
          data={listData}
          renderItem={({ item }) => <Item code={item.code} nom={item.nom} montant={item.montant} expireAt={item.expireAt} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={_retrieveData} />
          }
          contentContainerStyle={styles.list}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
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
    flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 0, paddingTop: 100, alignContent:'center'
  },
  thumbnail: {
    width: 60, height: 60, borderWidth: 1, borderColor: '#aaa'
  },
  itemText: {
    fontSize: 28, position:'absolute', zIndex:1, fontFamily:'Cartoon', color:"#FFF", paddingLeft:60, paddingTop:10
  },
  expDate:{
    padding:5, fontSize: 14, position:'absolute', zIndex:2, fontFamily:'space-mono', alignSelf:'center', paddingLeft:70, paddingTop:55
  },
  amount:{
    padding:5, fontSize: 24, position:'absolute', zIndex:2, fontFamily:'Chill', alignSelf:'center', paddingLeft:75,paddingTop:15, color:"#FFF"
  },
  couponImg:{
    position:'absolute',
    width:380,
    height:90,
  },
  seeButton:{
    position:'absolute', zIndex:3, width:50, left:250, marginTop:52
  },
  seeImg:{
    position:'absolute', width:40,height:23, alignItems:'center'
  }
});