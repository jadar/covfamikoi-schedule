import React from 'react';
import Moment from 'moment';
import { AppRegistry, AsyncStorage, SectionList, ScrollView, ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actionCreators } from '../store';

const mapStateToProps = state => ({
  schedule: state.schedule,
  isLoading: state.isLoading,
});

class Schedule extends React.Component {
    onFetch = responseJson => {
        const {dispatch} = this.props;
        dispatch(actionCreators.fetch(responseJson));
    }

    fetchFromServer() {
        let url = 'https://covfamikoiregistration.com/registration/schedule/';
        return fetch(url)
            .then(response => response.json())
            .then(this.onFetch)
            .catch(error => {
                console.error(error);
            });
    }

    componentDidMount() {
        this.fetchFromServer();
    }

    render() {

        const {isLoading, schedule} = this.props;

        if (isLoading){
            return(
                <View style={{flex: 1, padding: 50}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        Moment.locale('en');

        console.log("PROPS.KEYS", Object.keys(this.props));

        let days = schedule.map(item => Moment(item.start).format('YYYY-MM-DD'));
        days = [...new Set(days)];  // unique

        let sections = [];
        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let data = schedule.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
            sections.push({
                title: Moment(day).format("dddd, MMM Do"),
                data,
            });
        }

        return (
            <ScrollView>
                <SectionList
                    style={{padding: 30}}
                    renderItem={({item, index, section}) => (
                        <Text key={index}>{item.title}, {item.full_location}, {Moment(item.start).format('h:mm A')} - {Moment(item.end).format('h:mm A')}</Text>
                    )}
                    renderSectionHeader={
                        ({section: {title}}) => (
                            <Text style={{fontWeight: 'bold'}}>{title}</Text>
                        )
                    }
                    sections={sections}
                    keyExtractor={(item, index) => item + index}
                />
            </ScrollView>
        );
    }
};

export default connect(mapStateToProps)(Schedule);
