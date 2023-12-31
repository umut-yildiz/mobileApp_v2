import { View, Text, StyleSheet, Animated, TouchableHighlight, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { SwipeListView } from 'react-native-swipe-list-view';
import Warning_Database from './Database/Warning_Database';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FlatList, TextInput } from 'react-native-gesture-handler';


const Warning = ({ navigation }) => {

    const [listData, setListData] = useState(
        Warning_Database.map((NotificationItem, index) => ({
            key: `${index}`,
            title: NotificationItem.title,
            date: NotificationItem.date,
            time: NotificationItem.time,
        })),
    );

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
    }

    const handlePress = (item) => {
        // Navigate to the 'MessageDetail' screen and pass the item data as a parameter
        navigation.navigate('Details', { item });
    };

    const VisibleItem = props => {
        const { data } = props;

        return (
            <TouchableHighlight style={{ ...styles.rowFront }} onPress={() => handlePress(data)}>
                <>
                    <View style={styles.titleContainer}>
                        <Text style={{ ...styles.title, fontSize: 16 }}>
                            {data.item.title}
                        </Text>
                    </View>
                    <View style={styles.dateTimeContainer}>
                        <Text style={{ ...styles.date, fontSize: 12 }}>{data.item.date}</Text>
                        <Text style={{ ...styles.date, fontSize: 12, alignSelf: 'flex-end' }}>{data.item.time}</Text>
                    </View>
                </>
            </TouchableHighlight >
        );
    }

    const renderItem = (data, rowMap) => {
        return <VisibleItem data={data} />
    };

    const HiddenItemWithActions = props => {
        const { swipeAnimatedValue, onDelete } = props;

        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backLeftBtn, styles.backLeftBtnLeft]} onPress={onDelete}>
                    <MaterialCommunityIcons name="trash-can-outline" size={25} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
                onClose={() => closeRow(rowMap, data.item.key)}
                onDelete={() => deleteRow(rowMap, data.item.key)}
            />
        );
    };

    const [input, setInput] = useState('');

    const filteredData = listData.filter((item) =>
        item.title.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
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
}

export default Warning

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
    icon: {
        height: 25,
        width: 25,
        marginRight: 7,
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