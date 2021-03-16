import * as React from 'react';
import { StyleSheet, ImageBackground, Dimensions, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const backgroundImage = require("../assets/images/background.png")
const screenWidth = Dimensions.get("screen").width
const screenHeight = Dimensions.get("screen").height

function retrieveData(){
  async () => {
    try {
      const value = await AsyncStorage.getItem('promo');
      if (value !== null) {
        // We have data!!
        alert(`Value = ${value}`);
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
} 


export default function TabTwoScreen() {
  return (

    <View style={styles.container}>
      <Button title="press" onPress={retrieveData} ></Button>
      <ImageBackground source={backgroundImage} style={styles.backgroundImg}>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImg:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    width:screenWidth,
    height:screenHeight
  },
  listContainer:{
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
});
