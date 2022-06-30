'use strict';

import React from 'react';
import { Text, View, SafeAreaView, StatusBar } from 'react-native';

export default class BaseApp extends React.Component {
    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <StatusBar barStyle='dark-content'></StatusBar>
                {this.props.children}
            </SafeAreaView>
        );
    }
}