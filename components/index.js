import React from 'react';
import Moment from 'moment';
import EventList from './EventList';
import { ScrollView, ActivityIndicator, View } from 'react-native';
import { connect } from 'react-redux';
import { reducers } from '../reducers';
import { actionCreators } from '../reducers/eventList';
import { SearchBar } from 'react-native-elements';

Moment.locale('en');

const mapStateToProps = state => {
    return {
        schedule: state.eventList.schedule,
        isLoading: state.eventList.isLoading,
        sections: state.sections,
        search: state.search,
    };
};

class Schedule extends React.Component {
    onFetch = responseJson => {
        const { dispatch } = this.props;
        dispatch(actionCreators.reload(responseJson));
        this.updateSearch('');
    }

    state = {
        search: '',
        sections: [],
    };

    fetchFromServer() {
        let url = 'https://covfamikoiregistration.com/registration/schedule/';
        return fetch(url)
            .then(response => response.json())
            .then(this.onFetch)
            .catch(error => {
                 console.log(error);
                 this.updateSearch('');
            });
    }

    componentDidMount() {
        this.fetchFromServer();
    }

    updateSearch = search => {
        const { schedule } = this.props;
        this.setState({ search });

        let filteredItems = schedule.filter(item => {
            if (!search) return true;
            let val = item.title.toLowerCase().includes(search.toLowerCase());
            return val;
        });

        let days = filteredItems.map(item => Moment(item.start).format('YYYY-MM-DD'));
        days = [...new Set(days)];  // unique

        let sections = [];

        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let data = filteredItems.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
            if (data.length) {
                sections.push({
                    title: Moment(day).format("dddd, MMM Do"),
                    data,
                });
            }
        }

        this.setState({sections});
    };


    render() {
        const { isLoading, schedule } = this.props;

        const { search } = this.state;

        if (isLoading) {
            return (
                <View style={{flex: 1}}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={{flex: 1}}>
                <SearchBar
                    lightTheme={true}
                    placeholder="Search"
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <EventList
                      sections={this.state.sections}
                      isLoading={false}
                      style={{flex: 1}}
                      reload={() => this.fetchFromServer()}
                  />
            </View>
        );
    }
};

export default connect(mapStateToProps)(Schedule);
