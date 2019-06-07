'use strict';

import React from 'react';
import { Text, View, SectionList } from 'react-native';
import Event from './Event';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NativeViewGestureHandler>
                <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                sections={this.props.sections}
                keyExtractor={(item, index) => item + index}
                style={{ backgroundColor: '#fff' }}
                />
            </NativeViewGestureHandler>
        );
    }

    renderItem({item, index, section}) {
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

// export default withNavigation(EventList);