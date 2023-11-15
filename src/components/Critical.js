import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';
import Critical_Database from './Database/Critical_Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import pushNotification from './pushNotification';
import messaging from '@react-native-firebase/messaging';

//  {
//     "id": 15,
//     "title": " #1 Dewpoint sensor is broken",
//     "info": "Please check this component...",
//     "date": "16/10/23",
//     "time": "13: 21",
//     "country": "Turkiye",
//     "customer": "Customer A",
//     "site": "Site 1",
//     "device": "Device A",
//     "image": "https://marel.com/media/vt2hui0g/industrial-oven-modularoven.jpg",
//     "icon": "alarm-light",
//     "color": "#E74C3C"
// }

const Critical = ({navigation, route}) => {
  const [listData, setListData] = useState(
    Critical_Database.map((DatabaseItem, index) => ({
      key: `${index}`,
      title: DatabaseItem.title,
      info: DatabaseItem.info,
      date: DatabaseItem.date,
      time: DatabaseItem.time,
      country: DatabaseItem.country,
      customer: DatabaseItem.customer,
      site: DatabaseItem.site,
      device: DatabaseItem.device,
      image: DatabaseItem.image,
    })),
  );
  console.log('cemil - listData:', listData);
  const {
    requestUserPermission,
    getFCMToken,
    // listenToBackgroundNotifications,
    // listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = pushNotification();

  useEffect(() => {
    const listenToNotifications = () => {
      try {
        getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listenToForegroundNotifications = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const foregroundData = JSON.parse(remoteMessage?.notification?.body);
      console.log('cemil - foregroundData:', foregroundData);
      setListData([...listData, foregroundData]);
    });
    return unsubscribe;
  };

  const listenToBackgroundNotifications = async () => {
    const unsubscribe = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        const backgroundData = JSON.parse(remoteMessage?.notification?.body);
        setListData([...listData, backgroundData]);
        console.log('cemil - backgroundData:', backgroundData);
      },
    );
    return unsubscribe;
  };

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key == rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const handlePress = item => {
    // Navigate to the 'MessageDetail' screen and pass the item data as a parameter
    navigation.navigate('Details', {item});
  };

  const VisibleItem = props => {
    const {data} = props;

    return (
      <TouchableHighlight
        style={{...styles.rowFront}}
        onPress={() => handlePress(data)}>
        <>
          <View style={styles.titleContainer}>
            <Text style={{...styles.title, fontSize: 16}}>
              {data.item.title}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={{...styles.date, fontSize: 12}}>{data.item.date}</Text>
            <Text style={{...styles.date, fontSize: 12, alignSelf: 'flex-end'}}>
              {data.item.time}
            </Text>
          </View>
        </>
      </TouchableHighlight>
    );
  };

  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };

  const HiddenItemWithActions = props => {
    const {onDelete} = props;

    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backLeftBtn, styles.backLeftBtnLeft]}
          onPress={onDelete}>
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={25}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );
  };

  const [input, setInput] = useState('');

  const filteredData = listData.filter(item =>
    item.title.toLowerCase().includes(input.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={input}
        onChangeText={text => setInput(text)}
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#999"
      />
      <SwipeListView
        data={filteredData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={75}
        disableLeftSwipe
      />
    </View>
  );
};

export default Critical;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure the container takes up the entire screen
    backgroundColor: '#E5E7E9', // Set your desired background color
  },
  searchBar: {
    padding: 5,
    margin: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
    fontSize: 14,
    marginBottom: 15,
    elevation: 5,
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 10,
    height: 70,
    marginBottom: 15,
    elevation: 5,
    padding: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowBack: {
    flex: 1,
    margin: 5,
    marginBottom: 15,
  },
  backLeftBtn: {
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingLeft: 25,
    marginHorizontal: 10,
  },
  backLeftBtnLeft: {
    backgroundColor: '#E74C3C',
    left: 0,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#454545',
  },
  date: {
    fontSize: 12,
    color: '#565051',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTimeContainer: {
    justifyContent: 'center',
  },
});
