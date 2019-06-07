import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';
import { Icon } from 'react-native-elements'


export default class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('item', {}).title || "Details",
    });

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
                <IconRow icon='calendar-o'>
                    {start.format("dddd, MMMM Do YYYY, h:mm a")}-{end.format("h:mm a")}
                </IconRow>
                <IconRow icon='map-marker'>
                    {item.full_location}
                </IconRow>
            </View>
        );
    }
}

const IconRow = props => {
    return (
        <View style={styles.row}>
            <Icon
                size={20}
                containerStyle={{ marginRight: 6, width: 25 }}
                name={props.icon}
                type='font-awesome'
                color='#999' />
            <Text style={styles.rowText}>
                {props.children}
            </Text>
        </View>
    )
};

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
        lineHeight: 30,
        height: 30,
    },
    rowText: {
        fontSize: 15,
        lineHeight: 30,
        height: 30,
    }
});
