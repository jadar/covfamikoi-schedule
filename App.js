import React from 'react';
import Moment from 'moment';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

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
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, padding:50}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => { 
              Moment.locale('en');
              let start = Moment(item.start).format('h A')
              return <Text>{item.title}, {item.full_location}, {start}</Text> 
          }}
          keyExtractor={(item, index) => item.id.toString()}
        />
      </View>
    );
  }
}
