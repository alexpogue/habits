import React, { Component } from 'react';
import MyDatePicker from './MyDatePicker.js';
import GoalList from './GoalList.js';
import { View } from 'react-native';
import Api from './api'

export default class Habits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habits: [],
            isLoading: true
        }
    }
    componentDidMount() {
        Api.getAllGoals()
            .then(allGoals => {
                this.setState({
                    isLoading: false,
                    habits: allGoals
                }), function() {
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleDateChange(newDate) {
        console.log('handling date change');
    }

    render() {
        return(
            <View style={{flex: 1, padding:20, paddingTop:40}}>
                <MyDatePicker
                    onDateChange={(date) => this.handleDateChange(date)}
                    isLoading={this.state.isLoading}
                />
                <GoalList habits={this.state.habits} />
            </View>
        );
    }
}

