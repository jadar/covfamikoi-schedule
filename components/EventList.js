'use strict';

import React from 'react';
import { Text, View, SectionList } from 'react-native';
import Event from './Event';

export default class EventList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<SectionList
                    style={{padding: 30}}
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={this.props.sections}
                    keyExtractor={(item, index) => item + index}
                />
		);
	}

	renderItem({item, index, section}) {
		console.log(item);
		return (
			<Event item={item}></Event>
			)
	}

	renderSectionHeader({ section: { title } }) {
		return (
			<Text style={{fontWeight: 'bold'}}>{title}</Text>
			);
	}
}
