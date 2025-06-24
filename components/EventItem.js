'use strict';

import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import Moment from 'moment';
import { ListItem } from '@rn-vui/base';

class EventItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    subtitleText(item) {
        if (item.start == item.end) {
            return Moment(item.start).format('h:mm A');
        } else {
            return `${Moment(item.start).format('h:mm A')} - ${Moment(item.end).format('h:mm A')}`;
        }
    }

    render() {
        const item = this.props.item;
        return (
            <ListItem
                key={item.id}
                onPress={() => 
                   this.props.navigation.navigate('Details', {item})
                }>
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>{item.title}</ListItem.Title>
                        <ListItem.Subtitle style={styles.description}>{this.subtitleText(item)}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron name='chevron-right' type='font-awesome-5'/>
            </ListItem>
        );
    }
}

export default EventItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7,
        paddingHorizontal: 15,
    },
    description: {
        paddingTop: 1,
        color: '#555',
        fontSize: 11,
    },
    title: {
        color: '#000',
        fontSize: 16,
    // fontWeight: 'bold',
},
});
