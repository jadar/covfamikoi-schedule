import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';
import { Icon } from 'react-native-elements'


export default class DetailsScreen extends React.Component {
    render() {
        const { navigation } = this.props;
        const item = navigation.getParam('item', {});
        const start = Moment(item.start);
        const end = Moment(item.end);
        return (
            <View style={{ flex: 1, alignItems: 'leading', margin: 20, justifyContent: 'top', width: "100%" }}>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <Text style={styles.subtitle}>{item.subtitle}</Text>

                <View style={styles.row}>
                    <Icon
                        containerStyle={{ marginRight: 4 }}
                        name='calendar-o'
                        type='font-awesome'
                        color='#333' />
                    <Text>
                        {start.format("dddd, MMMM Do YYYY, h:mm a")}-{end.format("h:mm a")}
                    </Text>
                </View>
                
                
                
                <Text>
                    {item.full_location}
                </Text>
            </View>
            );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "500",
    },
    subtitle: {
        fontSize: 10,
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});
