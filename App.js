import React from 'react';
import Moment from 'moment';
import { FlatList, SectionList, ActivityIndicator, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    let url = 'https://covfamikoiregistration.com/registration/schedule/';
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {

        this.setState({
          isLoading: false,
          schedule: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if (this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    Moment.locale('en');

    let days = this.state.schedule.map(item => Moment(item.start).format('YYYY-MM-DD'));
    days = [...new Set(days)];  // unique


    let sections = [];
    for (let i = 0; i < days.length; i++) {
        let day = days[i];
        let data = this.state.schedule.filter(item => Moment(item.start).format('YYYY-MM-DD') == day);
        sections.push({
            title: Moment(day).format("dddd, MMM Do"),
            data,
        });
    }

    //return (<Text style={{padding: 50}}>{days.length}</Text>)

    return (
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
    );

    return(
      <View style={{flex: 1, padding:50}}>
        <FlatList
          data={this.state.schedule}
          renderItem={({item}) => { 
              let start = Moment(item.start).format('h A')
              return <Text>{item.title}, {item.full_location}, {start}</Text> 
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}
