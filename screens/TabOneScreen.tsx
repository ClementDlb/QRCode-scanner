import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';


export default function TabOneScreen() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [uri, setURI] = useState('');
  const [promotion, setPromotion] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }

  function getData(dataURI){
    axios.get(dataURI, config)
    .then(res => {
      const data = JSON.stringify(res.data);
      setPromotion(data)
      storeData(promotion)
    })
  }

  function storeData(promo){
    async()=>{
    try{
      await AsyncStorage.setItem(
        'promo', promo
      );
    } catch (error) {
      console.log(error);
    }
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
    getData(data);
    alert(`Bar code with type ${type} and data ${promotion} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text>{promotion}</Text>
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
