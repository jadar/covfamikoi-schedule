'use strict';

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const BaseApp = ({ children, ...props }) => {
    console.log(props)
    return (
        <SafeAreaView style={{flex: 1}} {...props}>
            <StatusBar barStyle='dark-content' />
            {children}
        </SafeAreaView>
    );
}

export default BaseApp;