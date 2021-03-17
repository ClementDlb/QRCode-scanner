import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Dimensions, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const backgroundImg = require("../assets/images/background2.png");
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height
const scanAgain = require("../assets/images/scan-button.png")

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [uri, setURI] = useState('');
  //const [promotion, setPromotion] = useState('');
  const [promoList, setPromoList] = useState([''])

  var promotion = "";

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const getPromo = async(dataURI) => {
    try{
       await axios.get(dataURI, config)
      .then(res => {
        const data = JSON.stringify(res.data);
        promotion = data
        savePromo()
      })
    } catch (error){
      alert(error)
    }
  } 

  const deleteLocal = async()=>{
    try{
      await AsyncStorage.removeItem('@promoList')
      promotion = "";
    } catch(error){
      alert(error)
    }
  }

  const savePromo = async () => {
    try {
       await AsyncStorage.getItem('@promoList')
      .then(res => {
        if(res !== null){
        //var response = JSON.parse(res)
        //var newPromo = JSON.parse(promotion)
          if(!res.includes(promotion)){
            var newList = res+'|'+promotion
            AsyncStorage.setItem('@promoList',  newList )
          }
        } else {
          AsyncStorage.setItem('@promoList', promotion)
        }
      }) 
    } catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getPromo(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImg}></ImageBackground>
      <View style={styles.scan}>
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        />
      <Button title="clean local" onPress={deleteLocal}></Button>
      {scanned && <TouchableOpacity style={styles.scanAgainBtn} onPress={() => setScanned(false)}><Image style={styles.scanAgain} source={scanAgain}></Image></TouchableOpacity> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scan:{
    flex:1,
    margin:50,
    position:"absolute",
    width:screenWidth*0.8,
    height: screenHeight*0.8,
    borderWidth:10
  },
  backgroundImg:{
    flex: 1,
    resizeMode: "cover",
    width:screenWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  scanAgainBtn:{
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center'
  },
  scanAgain:{
    width:285,
    height:75,
    alignSelf:'center',
    alignItems:'center',
    marginTop:screenHeight/4
  }
});
