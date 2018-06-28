import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,AsyncStorage
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
            datePicker: false,
            frequency: [],
            label: '',
            charitySelect: null,
            card:null,
            alarmList:[],
            charityList:[{
              email: 'dualipa@dlfoundation.com',
              category:'Entertainment',
              name: ' Dua Lipa Foundation',
              image: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg',
              location: 'Los Angeles, USA',
              website: 'www.dlfoundation.com',
              short: 'This is a foundation that gives money to dua lipa ',
              full: 'This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa This is a foundation that gives money to dua lipa '
            }],
            charityProfile:'',
            accountName: 'Ariana Grande',
            accountEmail: 'arianagrande@gmail.com',
            accountPassword: '',
            accountPasswordConfirm:''
        }
    }

    componentWillMount(){
        this.loadAlarms()
    }

    async loadAlarms(){
        var value = await AsyncStorage.getItem('Alarms')
        var parsedData = JSON.parse(value)
        this.setState({alarmList:parsedData})
    }

    switch(id){
        var alarms = {...this.state.alarmList}
        alarms[id].switch = !alarms[id].switch
        this.setState({alarms})
    }


    async createAlarm(object){
      var value = await AsyncStorage.getItem('Alarms')
      var convertArray= JSON.parse(value)

          if(convertArray === null){
              const array = []
              var FirstAlarm = array.concat(object)
              const convertFirst = JSON.stringify(FirstAlarm)
              try {
                  await AsyncStorage.setItem('Alarms', convertFirst)
              } 
              catch (error) {
                  console.log(error)
              }
              this.loadAlarms()
          }
          else {
              var newAlarm = convertArray.concat(object)
              const convertString = JSON.stringify(newAlarm)
              try {
                  await AsyncStorage.setItem('Alarms', convertString)
              } 
              catch (error) {
                  console.log(error)
              }
              this.loadAlarms()
          }
    }

    deleteAlarm = (id) => {
        var array = this.state.alarmList
        if(id > -1) {
            array.splice(id, 1)
            this.setState({alarmList: array})
            this.updateAlarms()
        }
    }

    async updateAlarms(){
        var list = this.state.alarmList  
        const convertString = JSON.stringify(list)
        try {
            await AsyncStorage.removeItem('Alarms')
        } catch (error) {
            console.log(error)
        }
        try {
            await AsyncStorage.setItem('Alarms', convertString)
        } catch (error) {
            console.log(error)
        }
    }
  
    render() {
      console.log('STATE FROM DATA STORE',this.state)
      const newAlarm = {
          time:this.state.timeSelect,
          frequency: this.state.frequency,
          label: this.state.label,
          charity: this.state.charitySelect,
          switch: true
      }
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

            fillCharityProfile: (object) => this.setState({charityProfile:object}),

            clearCharityProfile: () => this.setState({charityProfile: ''}),

            selectCharity: () => this.setState({charitySelect:this.state.charityProfile,charityProfile:''}),

            cancelAlarm: () => this.setState({charitySelect:null ,timeSelect:'',datePicker:false,label:'',frequency:[]}),

            createAlarm: () => this.createAlarm(newAlarm),

            loadAlarms: () => this.loadAlarms(),

            deleteAlarm: (id) => this.deleteAlarm(id),

            updateAlarms: () => this.updateAlarms(),

            switch: (id) => this.switch(id)


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