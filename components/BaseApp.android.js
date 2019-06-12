'use strict';

import React from 'react';
import { Text, View } from 'react-native';

export default class BaseApp extends React.Component {
    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.children}
            </View>
        );
    }
}
