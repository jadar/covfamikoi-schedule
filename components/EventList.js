'use strict';

import React from 'react';
import { Text, View, SectionList } from 'react-native';
import Event from './Event';
import { Button } from 'react-native';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Button
                  title="Go to Details FROM EVENT LIST"
                  onPress={() => this.props.navigation.navigate('Details')}
                />
                <SectionList
                    renderItem={this.renderItem}
                    renderSectionHeader={this.renderSectionHeader}
                    sections={this.props.sections}
                    keyExtractor={(item, index) => item + index}
                    //navigation={this.props.navigation}
                />
            </View>
        );
    }

    renderItem({item, index, section}) {
        return (
            <Event 
                item={item}
                //navigation={this.props.navigation}
            >
            </Event>
        )
    }

    renderSectionHeader({ section: { title } }) {
        return (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
            );
    }
}
