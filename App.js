import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,AsyncStorage
} from 'react-native'
console.disableYellowBox = true;

import Tabs from './src/Components/Nav/Tabs'
import moment from 'moment'

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
            donations:[],
            accountCharities:[],
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
            accountPasswordConfirm:'',
            currentTime: ''
        }
    }

    componentWillMount(){
        this.loadAlarms()
        setInterval( () => {
            this.setState({
                currentTime : this.getDate()
            })
        },1000)
    }

    getDate = () => {
        var date = new Date()
        var time = moment(date).format('h:mm:ss a')
        return time
    }

    syncDays = (alarm) => {
      // console.log(alarm)
      const time = moment(alarm.time).format('h:mm:ss a')

      if(alarm.frequency[0].option === 'Everyday'){
          console.log('EVERYDAY IF CAUGHT')
          console.log('TIME FOR EVERYDAY',time)
        if(time === this.state.currentTime){
            console.log(`
=======================================
=======================================
=======================================
EVERYDAY ALARM GOING OFF
===========================================
=======================================
=======================================`)
            this.loadAlarms()
        }
      }
      else if(alarm.frequency[0].option === 'Just Once'){
        console.log('NEVER IF CAUGHT')
        console.log('TIME FOR NEVER',time)
        if(time === this.state.currentTime){
            console.log(`
=======================================
=======================================
=======================================
NEVER ALARM GOING OFF
===========================================
=======================================
=======================================`)
            this.loadAlarms()
        }
      }
      else {
        console.log('SPECIFIC IF CAUGHT')
        console.log('TIME FOR SPEC',time)
            for(let i = 0 ; i < alarm.frequency.length; i++) {
                const date = new Date
                const today = date.getDay()
                const alarmDays = ['Sundays','Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays']
                const dayOfAlarm = alarmDays[today]
                const repeatDay = alarm.frequency[i].option
                if(time === this.state.currentTime && repeatDay === dayOfAlarm){
                    console.log(`
=======================================
=======================================
=======================================
SPEC ALARM GOING OFF
===========================================
=======================================
=======================================`)
                    this.loadAlarms()
                }
            }
        }
    }

    setTimes = () => {
      var onAlarms = this.state.alarmList.filter(x => x.switch)
        for(let i = 0 ; i < onAlarms.length; i++) {
          setInterval(() => {
                this.syncDays(onAlarms[i])
            }, 1000)
          }
    }



    async loadAlarms(){
        var value = await AsyncStorage.getItem('Alarms')
        var parsedData = JSON.parse(value)
        this.setState({alarmList:parsedData})
        this.setTimes()
    }

    switch(id){
        var alarms = {...this.state.alarmList}
        alarms[id].switch = !alarms[id].switch
        this.setState({alarms})
        // this.setAlarms()
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
      // console.log('Current Time',this.state.currentTime)
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

            switch: (id) => this.switch(id),

            addCard: (object) => this.setState({card:object})


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