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
    backgroundColor: '#d1e3d6'
  },
  btnText: {
    color: '#707d72',
    fontSize: 20,
  },
  home: {
    height: 100,
    marginTop: 20,
    marginHorizontal: 10,
    flexDirection: 'row',
    backgroundColor: '#dfe8e0',
    borderRadius: 10,
    shadowColor: '#6e7570',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    shadowRadius: 2,
  },
});

export default styles;
