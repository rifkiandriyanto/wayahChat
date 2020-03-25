import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dfe8e0',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '80%',
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: 'white'
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
  }
});

export default styles;
