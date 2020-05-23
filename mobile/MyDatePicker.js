import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
        var dateToShow = props.selection;
        if (dateToShow == null) {
            var today = new Date(),
            dateToShow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        }

        this.state = {date:dateToShow}
    }

    handleDateChange(date) {
        this.setState({date: date});
        this.props.onDateChange(date);
    }

  render(){
    return (
      <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
          onDateChange={(date) => this.handleDateChange(date)}
      />
    )
  }
}

