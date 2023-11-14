import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

const Details = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.item.title}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Description: {item.item.info}</Text>
        <Text style={styles.infoText}>- Date: {item.item.date}</Text>
        <Text style={styles.infoText}>- Time: {item.item.time}</Text>
        <Text style={styles.infoText}>- Country: {item.item.country}</Text>
        <Text style={styles.infoText}>- Customer: {item.item.customer}</Text>
        <Text style={styles.infoText}>- Site: {item.item.site}</Text>
        <Text style={styles.infoText}>- Device: {item.item.device}</Text>
        <Image source={{ uri: item.item.image }} style={styles.image} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    fontStyle: 'italic',
  },
  infoText: {
    fontSize: 16,
  },
  image: {
    width: 300, // Adjust the width and height as needed
    height: 300,
    margin: 35,
  },
});

export default Details;
