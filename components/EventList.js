'use strict';

import React from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import Event from './Event';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';
// import { withNavigation } from 'react-navigation';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                SectionSeparatorComponent={Separator}
                sections={this.props.sections}
                keyExtractor={(item, index) => item + index}
                style={{ backgroundColor: '#fff' }}
            />
        );
    }

    renderItem({item, index, section}) {
        return (
            <Event item={item}></Event>
            )
    }

    renderSectionHeader({ section: { title } }) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderTitle}>{title.toUpperCase()}</Text>
            </View>
        );
    }
}

const Separator = () => (
    <View style={styles.sectionSeparator} />
);

// export default withNavigation(EventList);

const styles = StyleSheet.create({
    sectionHeader: {
        backgroundColor: "#f6f6f6"
    },
    sectionHeaderTitle: {
        fontSize: 12,
        fontWeight: "600",
        color: "#404040",
        paddingTop: 14,
        paddingLeft: 16, 
        paddingRight: 16,
        paddingBottom: 6
    },
    sectionSeparator: {
        height: 1,
        backgroundColor: '#d7d7d7',
    }
});
