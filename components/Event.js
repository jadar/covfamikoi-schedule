'use strict';

import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Moment from 'moment';
import { withNavigation } from 'react-navigation';
//import { createStackNavigator, createAppContainer } from 'react-navigation';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'

class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <NativeViewGestureHandler>
                <RectButton
                        key={item.id}
                        underlayColor="#ccc"
                        activeOpacity={0.3}
                        onPress={() => 
                           this.props.navigation.navigate('Details', {item})
                        }
                      >
                    <View
                        style={{
                            padding: 16,
                        }}>
                        <Icon
                            raised
                            name='heartbeat'
                            type='font-awesome'
                            color='#f50' />
                        <Text style={ styles.title }>{item.title}</Text>
                        <Text style={ styles.description }>{Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
                    </View>
                </RectButton>
            </NativeViewGestureHandler>
        );
    }
}

export default withNavigation(Event);

const styles = StyleSheet.create({
  backgroundUnderlay: {
    backgroundColor: '#673ab7',
    height: 300,
    left: 0,
    position: 'absolute',
    right: 0,
    top: -100,
  },
  banner: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 16,
  },
  bannerContainer: {
    // backgroundColor: '#673ab7',
    alignItems: 'center',
  },
  bannerImage: {
    height: 36,
    margin: 8,
    resizeMode: 'contain',
    tintColor: '#fff',
    width: 36,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '200',
    marginRight: 5,
    marginVertical: 8,
  },
  description: {
    color: '#555',
    fontSize: 11,
  },
  image: {
    alignSelf: 'center',
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
    width: 120,
  },
  item: {
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statusBarUnderlay: {
    backgroundColor: '#673ab7',
    height: 20,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  title: {
    color: '#000',
    fontSize: 16,
    // fontWeight: 'bold',
  },
});
