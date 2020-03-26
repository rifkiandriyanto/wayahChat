import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3fae6',
      },
    header:{
      backgroundColor: "#e3fae6",
      height:200,
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:130
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    body:{
      marginTop:40,
    },
    bodyContent: {
      flex: 1,
      alignItems: 'center',
      padding:30,
    },
    name:{
      fontSize:28,
      color: "#696969",
      fontWeight: "600"
    },
    info:{
      fontSize:16,
      color: "#a5a6a8",
      marginTop:10
    },
    description:{
      fontSize:16,
      color: "#f1a98c",
      marginTop:10,
      textAlign: 'center'
    },
    buttonContainer: {
      marginTop: 20,
      height:45,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:200,
      width:250,
      borderRadius:30,
      backgroundColor: "#b6caff",
    },
  });

  export default styles;
