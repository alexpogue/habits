import React, { Component } from 'react'
import {Text, TouchableOpacity } from 'react-native';
import Switch from 'react-native-switch-pro';

export default class GoalListItem extends Component {

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
