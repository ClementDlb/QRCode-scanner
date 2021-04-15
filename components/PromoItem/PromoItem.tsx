import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

const seeImg = require("../../assets/images/see.png")

function PromoItem(props) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{props.nom}</Text>
        <Text style={styles.amount}>{props.montant}%</Text>
        <Text style={styles.expDate}>{props.expireAt}</Text>
        <TouchableOpacity style={styles.seeButton} onPress={()=>alert(props.code)}><Image style={styles.seeImg} source={seeImg}></Image></TouchableOpacity>
        <Image style={styles.couponImg} source={require('../../assets/images/coupon.png')}></Image>
      </View>
    );
  }

  export default PromoItem;

  const styles = StyleSheet.create({
    item: {
      flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 0, paddingTop: 100, alignContent:'center'
    },
    itemText: {
      fontSize: 28, position:'absolute', zIndex:1, fontFamily:'Cartoon', color:"#FFF", paddingLeft:60, paddingTop:10
    },
    amount:{
      padding:5, fontSize: 24, position:'absolute', zIndex:2, fontFamily:'Chill', alignSelf:'center', paddingLeft:75,paddingTop:15, color:"#FFF"
    },
    expDate:{
      padding:5, fontSize: 14, position:'absolute', zIndex:2, fontFamily:'space-mono', alignSelf:'center', paddingLeft:70, paddingTop:55
    },
    seeButton:{
      position:'absolute', zIndex:3, width:50, left:250, marginTop:52
    },
    couponImg:{
      position:'absolute',
      width:380,
      height:90,
    },
    seeImg:{
      position:'absolute', width:40,height:23, alignItems:'center'
    }
  })