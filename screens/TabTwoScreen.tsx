import React from 'react';
import {
  RefreshControl, StyleSheet, Text, SafeAreaView, Image, View, FlatList, Dimensions, ToastAndroid, TouchableOpacity, ImageBackground, Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const widthConst = Dimensions.get('screen').width;
const backgroundImg = require("../assets/images/background.jpg");

export default function App() {

  const initialData = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Susan Bert",
      image: "1"
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Neil Arms",
      image: "2"
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Carla Neice",
      image: "3"
    },
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53cbb28ba",
      title: "Janice Hanner",
      image: "4"
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fcd91aa97f63",
      title: "James Sullivan",
      image: "5"
    }
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);

  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@promoList');
      if (value !== null) {
        // We have data!!
        console.log(value);
        alert(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

      try {
        let response = await fetch(
          'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms',
        );
        let responseJson = await response.json();
        console.log(responseJson);
        setListData(responseJson.result.concat(initialData));
        setRefreshing(false)
      } catch (error) {
        console.error(error);
      }
  }, [refreshing]);

  function Item({ title }) {
    return (
      <View style={styles.item}>
        <TouchableOpacity style={styles.buttonShowCode} onPress={()=>alert(title)}><Text style={styles.itemText}>{title}</Text></TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={backgroundImg} style={styles.backgroundImg}></ImageBackground>
      <View style={styles.backgroundCard}></View>
      <Button title="press" onPress={_retrieveData}></Button>
          <FlatList
          style={{position:"absolute", paddingTop:0, }}
          data={listData}
          renderItem={({ item }) => <Item title={item.title} />}
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