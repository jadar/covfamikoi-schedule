'use strict';

import React from 'react';
import { Button, Text, View } from 'react-native';
import Moment from 'moment';
import { withNavigation } from 'react-navigation';
//import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Event extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        return (
            <View
                style={{
                    padding: 16,
                }}>
                <Text>{item.title}</Text>
                <Text>{item.full_location}</Text>
                <Text>{Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
            </View>

        );
    }
}
