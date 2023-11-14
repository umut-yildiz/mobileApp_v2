import { View, Text, Image, Button, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Machine = () => {
  const navigation = useNavigation();

  const handleSubmit1 = () => {
    navigation.navigate('MOS')
  }
  const handleSubmit2 = () => {
    navigation.navigate('SensorX')
  }
  const handleSubmit3 = () => {
    navigation.navigate('Nuova_I')
  }
  const handleSubmit4 = () => {
    navigation.navigate('Flexicut')
  }

  return (
    <View>
      <ScrollView>
        <View style={styles.rowFront}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit1}>
            <Image
              source={{ uri: "https://marel.com/media/vt2hui0g/industrial-oven-modularoven.jpg" }}
              style={styles.mos}
            />
            <Text style={styles.mos_text}>
              MOS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFront}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit2}>
            <Image
              source={{ uri: "https://marel.com/media/5pof5a5b/sensorx.jpg" }}
              style={styles.sensorx}
            />
            <Text style={styles.sensorx_text}>
              SensorX
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFront}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit3}>
            <Image
              source={{ uri: "https://marel.com/media/zyql0r3m/nuova-i.jpg" }}
              style={styles.nuova_i}
            />
            <Text style={styles.nuova_i_text}>
              Nuova-I
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.rowFront}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit4}>
            <Image
              source={{ uri: "https://marel.com/media/0slnfucu/flexicut.jpg" }}
              style={styles.flexicut}
            />
            <Text style={styles.flexicut_text}>
              Flexicut
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView >
    </View >
  )
}

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 20,
    elevation: 10,
    height: 220,
  },
  mos: {
    width: 370,
    height: 150,
    margin: 20,
  },
  mos_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#013A71',
  },
  sensorx: {
    width: 370,
    height: 150,
    margin: 20,
  },
  sensorx_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#013A71',
  },
  nuova_i: {
    width: 370,
    height: 150,
    margin: 20,
  },
  nuova_i_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#013A71',
  },
  flexicut: {
    width: 370,
    height: 150,
    margin: 20,
  },
  flexicut_text: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#013A71',
  },
});

export default Machine