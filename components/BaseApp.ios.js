'use strict';

import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

export default class BaseApp extends React.Component {
	render() {
		return (
			<SafeAreaView style={{flex: 1}}>
				{this.props.children}
			</SafeAreaView>
		);
	}
}