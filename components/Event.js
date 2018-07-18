'use strict';

import React from 'react';
import { Text, View } from 'react-native';
import Moment from 'moment';

export default class Event extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const item = this.props.item;
		return (
			<View
				style={{
					// flexDirection: 'row',
					padding: 16,
					// height: 44,
				}}>
				<Text>{item.title}</Text>
				<Text>{item.full_location}</Text>
				<Text>{Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
			</View>
		);
	}
}