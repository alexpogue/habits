import React, { Component } from 'react'
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import GoalListItem from './GoalListItem.js'

export default class GoalList extends Component {
    constructor(props){
        super(props);
        this.state = {
            switchValue: false,
        }
    }

    render() {
        if(this.props.isLoading) {
            return(
                <View style={{flex:1, padding:20}}>
                    <ActivityIndicator />
                </View>
            )
        }

        return(
            <View style={{flex: 1, padding:20, paddingTop:40}}>
                <FlatList
                    data={this.props.habits}
                    renderItem={({item}) => <GoalListItem title={item.name} />}
                    keyExtractor={({id}, index) => id.toString()}
                    ItemSeparatorComponent={() => (<View style={{borderWidth:0.5, borderColor: '#CCC'}} />)}
                />

            </View>
        );
    }
}

