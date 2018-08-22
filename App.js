import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View,AsyncStorage,AppState
} from 'react-native'
console.disableYellowBox = true;

// import {Auth} from './src/Components/Nav/Stack'
import Login from './src/Components/Auth/Login'
import Tabs from './src/Components/Nav/Tabs'
import moment from 'moment'
import axios from 'axios'

export const Context = React.createContext()
export const api = 'http://localhost:4000'


type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props)
        this.state ={
            me:false,
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
              name:'Dua Lipa',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'Dua Foundation',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Arizona',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'Lipa Foundation',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Miami',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'Dudation',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Delaware',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'Dua Lipa tion',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'a Foundation',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              name:'Dua on',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            }],
            charityProfile:'',
            accountName: 'Ariana Grande',
            accountEmail: 'arianagrande@gmail.com',
            accountPassword: '',
            accountPasswordConfirm:'',
            currentTime: '',
            infoModal:true
        }
    }

    componentDidMount(){
        AppState.addEventListener('change', this.getAppState)
        this.loadAlarms()
        setInterval( () => {
            this.setState({
                currentTime : this.getDate()
            })
        },1000)
        // this.loadCharities()
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.getAppState)
    }

    getAppState = (appState) => {
        if(appState === 'active'){
            console.log('App is in the fore front')
        }
        else if(appState === 'inactive'){
            console.log('Inactive')
        }
        else{
            console.log('App is in the background')
        }
    }

    // loadCharities = () => {
    //     axios.get(`${api}/charities`).then((res,err) => {
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             console.log(res.data)
    //             this.setState({charityList:res.data})
    //         }
    //     })
    // }

    // addPayment = (card) => {
    //     const token = this.state.me.token
    //     card.email = this.state.me.email
    //     axios.post(`${api}/card/${this.state.me.id}`,card,{headers: { authorization: "Bearer " + token }}).then((res,err) => {
    //         if(err){
    //             console.log(err)
    //         }
    //         else{
    //             console.log('RESPONSE FOR ADDING CARD',res.data)
    //         }
    //     })
    // }

    getDate = () => {
        var date = new Date()
        var time = moment(date).format('h:mm:ss a')
        return time
    }

    syncDays = (alarm) => {
      // console.log(alarm)
      const time = moment(alarm.time).format('h:mm:ss a')

      if(alarm.frequency[0].option === 'Everyday'){
          // console.log('EVERYDAY IF CAUGHT')
          // console.log('TIME FOR EVERYDAY',time)
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
        // console.log('SPECIFIC IF CAUGHT')
        // console.log('TIME FOR SPEC',time)
            for(let i = 0 ; i < alarm.frequency.length; i++) {
                const date = new Date
                const today = date.getDay()
                const alarmDays = ['Sundays','Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays']
                const dayOfAlarm = alarmDays[today]
                // console.log('DAY OF ALARM',dayOfAlarm)
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

            authenticate:() => this.setState({me:!this.state.me}),

            updateTimeSelect: (time,bool) => this.setState({timeSelect:time,datePicker:bool}),

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

            addCard: (object) => this.addPayment(object),

            clearInfoModal: () => this.setState({infoModal:false})

          }}> 
              {
                !this.state.me ?
               <Login />
                :
                <Tabs />
                
              }
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