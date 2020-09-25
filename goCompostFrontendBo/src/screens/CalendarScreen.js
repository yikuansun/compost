import React from "react";
import { Switch } from "react-native";
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet, View, Button,TextInput,Divider } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

const CalendarScreen = props => {
  
  return (
  <View>
    <Calendar
  // Initially visible month. Default = Date()
  current={'2020-09-20'}
  // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
  minDate={'2020-09-01'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
  maxDate={'2021-09-01'}
  // Handler which gets executed on day press. Default = undefined
  onDayPress={(day) => {console.log('selected day', day)}}
  // Handler which gets executed on day long press. Default = undefined
  onDayLongPress={(day) => {console.log('selected day', day)}}
  // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
  monthFormat={'yyyy MM'}
  // Handler which gets executed when visible month changes in calendar. Default = undefined
  onMonthChange={(month) => {console.log('month changed', month)}}
  // Hide month navigation arrows. Default = false
  hideArrows={true}
  // Replace default arrows with custom ones (direction can be 'left' or 'right')
  renderArrow={(direction) => (<Arrow/>)}
  // Do not show days of other months in month page. Default = false
  hideExtraDays={true}
  // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
  // day from another month that is visible in calendar page. Default = false
  disableMonthChange={true}
  // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
  firstDay={1}
  // Hide day names. Default = false
  hideDayNames={true}
  // Show week numbers to the left. Default = false
  showWeekNumbers={true}
  // Handler which gets executed when press arrow icon left. It receive a callback can go back month
  onPressArrowLeft={subtractMonth => subtractMonth()}
  // Handler which gets executed when press arrow icon right. It receive a callback can go next month
  onPressArrowRight={addMonth => addMonth()}
  // Disable left arrow. Default = false
  disableArrowLeft={true}
  // Disable right arrow. Default = false
  disableArrowRight={true}
  // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
  disableAllTouchEventsForDisabledDays={true}
  // Replace default month and year title with custom one. the function receive a date as parameter.
  renderHeader={(date) => {/*Return JSX*/}}
  // Enable the option to swipe between months. Default = false
  enableSwipeMonths={true}
/>

    
  </View>
  
  
  );
  
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    margin: 10,
    
  },
  text: {
    fontSize: 30,
    margin: 20
  },
  textTwo: {
    fontSize: 20,
    margin: 10
    
  },
  textThree: {
    fontSize: 15,
    margin: 10
  },
  subHeaderStyle: {
    fontSize: 25
  },
  opacityStyle: {
    fontSize: 75
  },
  textInputStyling: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    fontSize: 20
  },
  dividerStyle: {
    backgroundColor: 'blue'
  }
});

export default CalendarScreen;
