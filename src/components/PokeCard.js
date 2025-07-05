import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';

export default function PokeCard({name, url}) {
  // sprite URL = https://raw.githubusercontent.com/.../pokemon/<id>.png
  const id = url.split('/').filter(Boolean).pop(); // last part of URL
  const sprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <View style={styles.card}>
      <FastImage source={{uri: sprite}} style={styles.img} />
      <Text style={styles.label}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  img: {width: 56, height: 56, marginRight: 12},
  label: {fontSize: 16, textTransform: 'capitalize'},
});
