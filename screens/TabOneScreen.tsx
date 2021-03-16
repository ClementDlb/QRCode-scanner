import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, ImageBackground, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const backgroundImg = require("../assets/images/background.jpg");
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [uri, setURI] = useState('');
  const [promotion, setPromotion] = useState('');
  const [promoList, setPromoList] = useState([''])

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  function getPromo(dataURI){
    axios.get(dataURI, config)
    .then(res => {
      const data = JSON.stringify(res.data);
      setPromotion(data)
      savePromo()
    })
  }

  const deleteLocal = async()=>{
    try{
      await AsyncStorage.removeItem('@promoList')
    } catch(error){
      alert(error)
    }
  }
/*
  const savePromo = async () => {
    try {
      await AsyncStorage.setItem('@promoList', promotion )
    } catch (e) {
      alert(e)
    }
  }*/

  const savePromo = async () => {
    try {
       await AsyncStorage.getItem('@promoList')
      .then(res => {
        if(res !== null){
        //var response = JSON.parse(res)
        //var newPromo = JSON.parse(promotion)
        if(res !== promotion){
        var newList = res+promotion
        console.log(newList)
        AsyncStorage.setItem('@promoList',  newList )
        }
        }
        AsyncStorage.setItem('@promoList', promotion)
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
      <Button title="press" onPress={()=>alert(promotion)}></Button>
      <Button title="clean local" onPress={deleteLocal}></Button>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
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
});
