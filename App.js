import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
console.disableYellowBox = true;

import Tabs from './src/Components/Nav/Tabs'
export const Context = React.createContext()



type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    this.state ={
        timeSelect:'',
        charitySelect: '',
        repeatSelect: '',
        labelSelect: '',
        datePicker: false,
        frequency: [],
        label: '',
        charity: '',
        accountName: 'Ariana Grande',
        accountEmail: 'arianagrande@gmail.com',
        accountPassword: '',
        accountPasswordConfirm:''
    }
}
  
  render() {
    console.log('STATE FROM DATA STORE',this.state)
    return (
        <Context.Provider 
        value={{
          store:this.state,

          updateTimeSelect: (time,bool) => this.setState({
            timeSelect:time,
            datePicker:bool
          }),

          toggleDatePicker: () => this.setState({datePicker:!this.state.datePicker}),

          updateFrequency: (array) => this.setState({frequency:array}),

          updateLabel: (string) => this.setState({label:string}),

          updateCharity: (object) => this.setState({charity:object}),

          updateAccountName: (e) => this.setState({accountName:e}),

          updateAccountEmail:(e) => this.setState({accountEmail:e}),

          updatePassword: (e) => this.setState({accountPassword:e}),

          updatePasswordConfirm: (e) => this.setState({accountPasswordConfirm:e}),   

        }}> 
            <Tabs />
        </Context.Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});