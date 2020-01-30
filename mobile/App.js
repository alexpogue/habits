import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import Switch from 'react-native-switch-pro'

class HabitItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            switchValue: false
        }
    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value}, function(){})
    }

    render() {
        return (
            <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center', paddingTop:10, paddingBottom:10}} onPress={() => { this.toggleSwitch(!this.state.switchValue) }}>
                <Text>{this.props.title}</Text>
                <Switch
                    onSyncPress={value => {!this.state.switchValue}}
                    value={this.state.switchValue}
                    pointerEvents="none"
                />
            </TouchableOpacity>
        )
    }
}

export default class FetchExample extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            switchValue: false,
        }
    }

    componentDidMount() {
        return fetch('https://facebook.github.io/react-native/movies.json')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson.movies,
                }, function() {
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value}, function(){})
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style={{flex:1, padding:20}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return(
            <View style={{flex: 1, padding:20, paddingTop:40}}>
                <FlatList
                    data={this.state.dataSource}
                    renderItem={({item}) => <HabitItem title={item.title + ", " + item.releaseYear} />}
                    keyExtractor={({id}, index) => id}
                    ItemSeparatorComponent={() => (<View style={{borderWidth:0.5, borderColor: '#CCC'}} />)}
                />
            </View>
        );
    }
}

