import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Status_Database from './Database/Status_Database';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { SwipeListView } from 'react-native-swipe-list-view';

const Status = ({ navigation }) => {
    const [input, setInput] = useState('');
    const [listData, setListData] = useState(Status_Database);

    const renderItem = ({ item }) => {
        return (
            <TouchableHighlight style={{ ...styles.rowFront }} onPress={goCriticalorWarning}>
                <>
                    <View style={styles.titleContainer}>
                        <Text style={{ ...styles.title, fontSize: 16 }}>{item.title}</Text>
                    </View>
                    <View style={{ alignSelf: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons
                            size={35}
                            name={item.icon}
                            color={item.color}>
                        </MaterialCommunityIcons>
                    </View>
                </>
            </TouchableHighlight >
        );

    };

    const goCriticalorWarning = (item) => {

        const iconNames = listData.map(item => item.icon);

        if (iconNames === 'alarm-light') {
            // Navigate to the 'Critical' screen and pass the item data as a parameter
            navigation.navigate('Critical', { item });
        } else if (iconNames === 'alert') {
            // Navigate to the 'Warning' screen for the 'warning' case
            navigation.navigate('Warning', { item });
        }
    };

    const HiddenItemWithActions = props => {
        const { onDelete } = props;

        return (
            <View style={styles.rowBack}>
                <TouchableOpacity
                    style={[styles.backLeftBtn, styles.backLeftBtnLeft]}>
                    <MaterialCommunityIcons name="alert" size={25} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnRight]}>
                    <MaterialCommunityIcons name="alarm-light" size={25} color="white" />
                </TouchableOpacity>
            </View>
        )
    };

    const renderHiddenItem = (data, rowMap) => {
        return (
            <HiddenItemWithActions
                data={data}
                rowMap={rowMap}
            />
        );
    };


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
                leftOpenValue={0}
                rightOpenValue={0}
            />
        </View>
    );
};

export default Status;

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
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dateTimeContainer: {
        justifyContent: 'center',
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
        backgroundColor: '#F39C12',
        left: 0,
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    backRightBtn: {
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingLeft: 25,
        marginHorizontal: 10,
    },
    backRightBtnRight: {
        backgroundColor: '#E74C3C',
        right: 0,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
    },
});