import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3fae6',
  },
  inputChat: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  btnText: {
    color: '#b6caff',
    fontSize: 20,
  },
  home: {
    height: 100,
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#6e7570',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
  bottom:{
    position: 'absolute',
    bottom:0,
    left:50,
  },
  greeting: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    color: '#000000',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
  inputTitle: {
    color: '#8A8F9E',
    fontSize: 10,
    textTransform: 'uppercase',
  },
  input: {
    borderBottomColor: '#8A8F9E',
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: '#161F3D',
  },
  button: {
    marginHorizontal: 30,
    marginBottom: 10,
    backgroundColor: '#2295d4',
    borderRadius: 10,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  error: {
    color: 'red',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textProfile:{
    fontSize: 15
  },
  nameProfile: {
    fontSize: 25, fontWeight: 'bold'
  },
  imageProfile: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  detailFriend: {
    flexDirection: 'row',
    backgroundColor:'white',
    marginBottom: 5,
    height:50,
    alignItems: 'center'
  }
  
});

export default styles;
