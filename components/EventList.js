'use strict';

import React from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import EventItem from './EventItem';
import { RectButton, NativeViewGestureHandler } from 'react-native-gesture-handler';
//import Schedule from '.';
// import { withNavigation } from 'react-navigation';

export default class EventList extends React.Component {
    constructor(props) {
        super(props);
    }

    async _onRefresh() { 
        this.setState({isLoading: true}); 
        this.render();
        await this.props.reload();
        // TODO -- THIS DOESN'T KEEP THE SPINNER UP LONG ENOUGH
        this.setState({isLoading: false}); 
    }

    render() {
        return (
            <SectionList
                renderItem={this.renderItem}
                renderSectionHeader={this.renderSectionHeader}
                SectionSeparatorComponent={Separator}
                sections={this.props.sections}
                keyExtractor={(item, index) => item + index}
                initialNumToRender={200}
                onRefresh={() => this._onRefresh()}
                refreshing={this.props.isLoading}
                style={{ backgroundColor: '#fff' }}
            />
        );
    }

    renderItem({item, index, section}) {
        return (
            <EventItem item={item}></EventItem>
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
