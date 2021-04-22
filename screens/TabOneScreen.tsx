import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';

const backgroundImg = require("../assets/images/background2.png");
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height
const scanAgain = require("../assets/images/scan-button.png")

export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  var promotion = "";

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //Récupère la promotion depuis l'API
  const getPromo = async (dataURI) => {
    try {
      await axios.get(dataURI, config)
        .then(res => {
          const data = JSON.stringify(res.data);
          promotion = data
          savePromo()
        })
    } catch (error) {
      alert(error)
    }
  }

  //Enregistre la promotion dans le stockage local du téléphone et alerte l'utilisateur si le code a déjà été scanné
  const savePromo = async () => {
    try {
      await AsyncStorage.getItem('@promoList')
        .then(res => {
          if (res !== null) {
            if (!res.includes(promotion)) {
              alert('Code scanné ! :)');
              var newList = res + '|' + promotion
              AsyncStorage.setItem('@promoList', newList)
            } else {
              alert('Code déjà scanné !')
            }
          } else {
            alert('Code scanné ! :)');
            AsyncStorage.setItem('@promoList', promotion)
          }
        })
    } catch (e) {
      alert(e)
    }
  }

  //Demande l'autorisation pour l'utilisation de l'appareil photo
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //Fonction appelée quand un code est scanné et envoi de la data à l'API
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    getPromo(data);
  };

  //Vérifie que le scanner ait accès à la caméra
  if (hasPermission === null) {
    return <Text>Authorisation d'accès à la caméra</Text>;
  }
  if (!hasPermission) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImg} />
      <View style={styles.scan}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <TouchableOpacity style={styles.scanAgainBtn} onPress={() => setScanned(false)}><Image style={styles.scanAgain} source={scanAgain} /></TouchableOpacity>}
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
  scan: {
    flex: 1,
    margin: 50,
    position: "absolute",
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
    borderWidth: 10
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    width: screenWidth,
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
  scanAgainBtn: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  scanAgain: {
    width: 285,
    height: 75,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 3.2
  }
});
