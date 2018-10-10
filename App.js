import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,Linking,
    View,AsyncStorage,AppState
} from 'react-native'
console.disableYellowBox = true

// import {Auth} from './src/Components/Nav/Stack'
import Login from './src/Components/Auth/Login'
import Tabs from './src/Components/Nav/Tabs'
import moment from 'moment'
import axios from 'axios'
import PushNotification from 'react-native-push-notification'
import SystemSetting from 'react-native-system-setting'
import { PushNotificationIOS } from 'react-native'
const uuidv4 = require('uuid/v4')
import Sound from 'react-native-sound'
import decode from 'jwt-decode'

export const Context = React.createContext()
export const api = 'https://staging-sleepy.herokuapp.com'

// const whoosh = new Sound('alarm.wav', Sound.MAIN_BUNDLE, (error) => {
//     if (error) {
//       console.log('failed to load the sound', error);
//       return;
//     }
//     // loaded successfully
//     console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
// });


type Props = {};
export default class App extends Component<Props> {
    constructor(props){
        super(props)
        this.state ={
            me:'',
            token:'',
            authenticated:false,
            timeSelect:'',
            datePicker: false,
            frequency: [],
            label: '',
            charitySelect: null,
            card:null,
            alarmList:[],
            adminSearchResults:'',
            donations:[],
            accountCharities:[],
            charityList:[],
            charityProfile:'',
            currentSnapshot:'',
            snapshots:[],
            invoices:[],
            lineData:'',
            accountName: 'Ariana Grande',
            accountEmail: 'arianagrande@gmail.com',
            accountPassword: '',
            accountPasswordConfirm:'',
            currentTime: '',
            infoModal:false,
            addErrorModal:false,
            cardAdded:false,
            loading:false,
            cardError:false,
            approvals:[],
            snoozes:null,
            charityApproved:false,
            systemError:false,
            emailExists:false,
            credError:false,
            verifiedError:false,
            signupSent:false
        }
    }

    componentDidMount(){
        AppState.addEventListener('change', this.getAppState)
        this.configurePushNotifications()
        this.loadAlarms()
        // setInterval( () => {
        //     this.setState({
        //         currentTime : this.getDate()
        //     })
        // },1000)        
        this.loadCharities()
        this.setUser()
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.getAppState)
    }

    async loadApprovals(){
        await axios.get(`${api}/approvals`,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(res.data)
                this.setState({approvals:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
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
            // this.testNotification()
            // SystemSetting.setVolume(1)
        }
    }

    stopAlarm = (id) => {
        if(this.state.alarmList[id].frequency.length > 1){
            PushNotification.cancelLocalNotifications({id: `r${id}`})
        }
        else{
            PushNotification.cancelLocalNotifications({id})
        }
    }

    // fireSnooze = () => {
    //   ///NEED TO GET ALARM DATA
    //     this.sendNotification(alarm,true)
    // }
    sortFrequencies = (alarm) => {
        console.log('FREQUENCY ALARM',alarm)
        const today = moment().day()
        for(let i = 0; i < alarm.frequency.length;i++){
            if(alarm.frequency[i].option === 'Sundays'){
                const dayNeeded = 7
                // if we haven't yet passed the day of the week that I need:
                if (today < dayNeeded) { 
                    // then just give me this week's instance of that day
                    const nextInstance = moment().isoWeekday(dayNeeded)
                    this.sendRepeatingNotification(nextInstance,alarm,i)
                } else {
                    // otherwise, give me *next week's* instance of that same day
                    const nextInstance = moment().add(1, 'weeks').isoWeekday(dayNeeded)
                    this.sendRepeatingNotification(nextInstance,alarm,i)
                }

                // console.log('SUNDAY SHOULD BE 7:',dayNeeded,alarm.frequency[i].option)
            }
            else{
                const dayNeeded = alarm.frequency[i].id - 1
                // if we haven't yet passed the day of the week that I need:
                if (today < dayNeeded) { 
                    // then just give me this week's instance of that day
                    const nextInstance = moment().isoWeekday(dayNeeded,)
                    this.sendRepeatingNotification(nextInstance,alarm,i)
                } else {
                    // otherwise, give me *next week's* instance of that same day
                    const nextInstance = moment().add(1, 'weeks').isoWeekday(dayNeeded,i)
                    this.sendRepeatingNotification(nextInstance,alarm,i)
                }
                // console.log('Other days:',dayNeeded,alarm.frequency[i].option)
            }
        }
    }

    parseTime = (s) =>  {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);
    }

    sendRepeatingNotification = (instance,alarm,id) => {

        var time = moment(alarm.time).format('h:mm a')

        var eventTime= moment(alarm.time).valueOf()

        var lets = moment(eventTime).format('HH:mm')

        const then = new Date(instance).getTime()
     
        var sub = moment(then).format('HH:mm')
        console.log('SUB',sub)
        console.log('Lets',lets)
        let triggerIn

        if(lets < sub){
            var midnight = (this.parseTime('24:00') - this.parseTime(sub)) + this.parseTime(lets)
            console.log('Midnight',midnight)
            triggerIn = new Date(instance + (Math.abs(midnight) * 60000))
            // const test = moment(triggerIn).format('dd hh:mm a')
            // console.log('TEST',test)

        }
        else{
            var remaining = this.parseTime(lets) - this.parseTime(sub)
            triggerIn = new Date(instance + (Math.abs(remaining) * 60000))
            // const test = moment(triggerIn).format('dd hh:mm a')
            // console.log('TEST',test)
        }

    
        
        
        // if(Platform.OS === 'ios'){
        //     PushNotification.localNotificationSchedule({
        //         userInfo: {id:`r${id}`},
        //         message: `${alarm.label === '' ? `Wake up its ${time}` : alarm.label}`, // (required)
        //         playSound: true, // (optional) default: true
        //         soundName: 'sleepyprod.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //         repeatType:'week', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        //         // repeatTime: , //should the number of milliseconds between each interval.
        //         actions: '["Snooze", "Stop"]',
        //         date: triggerIn// in 60 secs
        //     });
        // }else{
        //     PushNotification.localNotificationSchedule({
        //         id: `r${id}`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        //         vibrate: true, // (optional) default: true
        //         vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        //         message: `${alarm.label === '' ? `Wake up its ${time}` : alarm.label}`, // (required)
        //         playSound: true, // (optional) default: true
        //         soundName: 'sleepyprod.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //         repeatType:'week', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        //         // repeatTime: day,//should the number of milliseconds between each interval.
        //         actions: '["Snooze", "Stop"]',
        //         date: triggerIn // in 60 secs
        //     });
        // }

    }

    testNotification = () => {
        PushNotification.localNotificationSchedule({
            userInfo: {id:3},
            message: 'This is a Mr. Sleepy Test Alarm', // (required)
            playSound: true, // (optional) default: true
            soundName: 'alarm.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            // repeatType:`${alarm.frequency[0].option === 'Everyday' ? 'day' : ''}`, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            // repeatTime: , //should the number of milliseconds between each interval.
            // actions: '["Snooze", "Stop"]',
            date: new Date(Date.now() + (5 * 1000)) // in 60 secs
        })
    }

    sendNotification = (alarm,snooze) => {

        // SystemSetting.setVolume(1)

        const time = moment(alarm.time).format('h:mm a')
        const currentTime = moment().format('LT')
        const date = new Date()

        var getTime = date.getTime()

        const now = moment(date)

        var eventTime= moment(alarm.time)

        var diffInMinutes = eventTime.diff(now, 'minutes')

        let minutesToFire

        if(diffInMinutes < 0){
            minutesToFire = Math.abs((Math.abs(diffInMinutes + 720) * 2) + diffInMinutes)
        }
        else{
            minutesToFire = diffInMinutes
        }

        const triggerIn = new Date(Date.now() + (minutesToFire * 60000))
        const snoozeTrigger = new Date(Date.now() + (7 * 60000))
        const test = moment(triggerIn).format('h:mm a')
        let trigger 
        if(snooze === true){
            trigger = snoozeTrigger
        }
        else{
            trigger = triggerIn
        }

        if(Platform.OS === 'ios'){
            PushNotification.localNotificationSchedule({
                userInfo: {id:alarm.id},
                title:'Good Morning Patrick!',
                message: `${alarm.label === '' ? `Wake up its ${time}` : alarm.label}`, // (required)
                playSound: true, // (optional) default: true
                soundName: 'alarm.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                repeatType:`${alarm.frequency[0].option === 'Everyday' ? 'day' : ''}`, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                // repeatTime: , //should the number of milliseconds between each interval.
                actions: '["Snooze", "Stop"]',
                date: trigger // in 60 secs
            })
        }else{
            PushNotification.localNotificationSchedule({
                id: `${alarm.id}`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                vibrate: true, // (optional) default: true
                vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                title:'Good Morning Patrick!',
                message: `${alarm.label === '' ? `Wake up its ${time}` : alarm.label}`, // (required)
                playSound: true, // (optional) default: true
                soundName: 'alarm.wav', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                repeatType:`${alarm.frequency[0].option === 'Everyday' ? 'day' : ''}`, // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
                // repeatTime: day,//should the number of milliseconds between each interval.
                actions: '["Snooze", "Stop"]',
                date: trigger // in 60 secs
            })
        }
    }
    async loadCharities(){
        await axios.get(`${api}/charities`).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log(res.data)
                const filter = res.data.filter(x => x.approved === true)
                this.setState({charityList:filter})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async snoozePressed(){
        const token = this.state.token
        // console.log(this.state.me.id)
        // console.log(this.state.me.tempChar)
        await axios.post(`${api}/snooze/${this.state.me.id}/${this.state.me.tempChar}`,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('RESPONSE FOR ADDING TO PENDING DONATIONS',res.data)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async getSnapshots(){
        await axios.get(`${api}/snapshots`,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                this.setState({snapshots:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async addPayment(card){
        console.log('CARD',card)
        // const token = this.state.me.token
        card.customer = this.state.me.snoozer_customerId
        // card.email = this.state.me.email
        // axios.post(`${api}/card/${this.state.me.id}`,card).then((res,err) => {
        await axios.post(`${api}/card/${this.state.me.id}`,card,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
                this.setState({cardError:true})
                setTimeout(() => this.setState({loading:false,cardError:false}),2000)
            }
            else{
                console.log('RESPONSE FOR ADDING CARD',res.data)
                this.setState({cardAdded:true})
                setTimeout(() => this.setState({cardAdded:false,loading:false}),2000)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async getCurrentSnapshot(){
        await axios.get(`${api}/currentsnapshot`,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }else{
                console.log('SNAP DATA',res.data)
                this.setState({currentSnapshot:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async loadLineData(date){
        await axios.post(`${api}/linegraph`,date,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }else{
                console.log('LINE DATA',res.data)
                this.setState({lineData:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async approveCharity(id,email){
        this.setState({loading:true})
        console.log(id)
        await axios.put(`${api}/approvecharity/${id}/${email}`,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('RESPONSE FOR ADDING CARD',res.data)
                this.setState({charityApproved:true})
                setTimeout(() => this.setState({charityApproved:false,loading:false}),2000)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async rejectCharity(id,reason,email){
        this.setState({loading:true})
        const payload = {reason,email}
        console.log(id,payload)
        await axios.post(`${api}/rejectcharity/${id}`,payload,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('RESPONSE FOR ADDING CARD',res.data)
                this.setState({charityApproved:true})
                setTimeout(() => this.setState({charityApproved:false,loading:false}),2000)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async searchCharityEmail(email){
        const payload = {email}
        await axios.post(`${api}/admincharity`,payload,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                this.setState({adminSearchResults:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async getInvoices(customer){
        console.log('running')
        const payload = {customer}
        await axios.post(`${api}/invoices`,payload,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                this.setState({invoices:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async searchUserEmail(email){
        const payload = {email}
        await axios.post(`${api}/admin/users`,payload,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('DATA',res.data)
                this.setState({adminSearchResults:res.data})
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    configurePushNotifications = () => {
        PushNotification.configure({
            onNotification: (notification) =>  {
                console.log( 'NOTIFICATION:', notification );
                // Sound.setCategory('Playback')
                // whoosh.setVolume(1)
                // whoosh.play((success) => {
                //     if (success) {
                //         console.log('successfully finished playing');
                //         whoosh.setNumberOfLoops(-1)
                //     } else {
                //       console.log('playback failed due to audio decoding errors');
                //       // reset the player to its uninitialized state (android only)
                //       // this is the only option to recover after an error occured and use the player again
                //       whoosh.reset();
                //     }
                // })
                
                // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
                // notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // IOS ONLY (optional): default: all - Permissions to register.
            permissions: {
                alert: true,
                badge: true,
                sound: true
            },
            requestPermissions: true
        })
    }

    clearInfoModal = () => {
        this.setState({infoModal:false})
        // PushNotificationsHandler.requestPermissions()
    }

    getDate = () => {
        var date = new Date()
        var time = moment(date).format('h:mm:ss a')
        return time
    }


//     syncDays = (alarm) => {
//       const time = moment(alarm.time).format('h:mm:ss a')

//       if(alarm.frequency[0].option === 'Everyday'){
//           // console.log('EVERYDAY IF CAUGHT')
//           // console.log('TIME FOR EVERYDAY',time)
//         if(time === this.state.currentTime){
//             console.log(`
// =======================================
// =======================================
// =======================================
// EVERYDAY ALARM GOING OFF
// ===========================================
// =======================================
// =======================================`)
//             this.loadAlarms()
//         }
//       }
//       else if(alarm.frequency[0].option === 'Just Once'){
//         console.log('NEVER IF CAUGHT')
//         console.log('TIME FOR NEVER',time)
//         if(time === this.state.currentTime){
//             console.log(`
// =======================================
// =======================================
// =======================================
// NEVER ALARM GOING OFF
// ===========================================
// =======================================
// =======================================`)
//             this.loadAlarms()
//         }
//       }
//       else {
//         // console.log('SPECIFIC IF CAUGHT')
//         // console.log('TIME FOR SPEC',time)
//             for(let i = 0 ; i < alarm.frequency.length; i++) {
//                 const date = new Date
//                 const today = date.getDay()
//                 const alarmDays = ['Sundays','Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays']
//                 const dayOfAlarm = alarmDays[today]
//                 // console.log('DAY OF ALARM',dayOfAlarm)
//                 const repeatDay = alarm.frequency[i].option
//                 if(time === this.state.currentTime && repeatDay === dayOfAlarm){
//                     console.log(`
// =======================================
// =======================================
// =======================================
// SPEC ALARM GOING OFF
// ===========================================
// =======================================
// =======================================`)
//               this.loadAlarms()
//                 }
//             }
//         }
//     }

    setTimes = () => {
      var onAlarms = this.state.alarmList.filter(x => x.switch)
        for(let i = 0 ; i < onAlarms.length; i++) {
            if(onAlarms[i].frequency.length > 1){
                  this.sortFrequencies(onAlarms[i])
            }else{
                var p = onAlarms[i]
                var getDate = new Date()
                var getTime = getDate.getTime()
                const now = moment(getDate)
                // var eventTime= moment(p.time); // Timestamp - Sun, 21 Apr 2013 13:00:00 GMT
                // // var currentTime = moment(now); // Timestamp - Sun, 21 Apr 2013 12:30:00 GMT
                // // var diffTime = eventTime - currentTime;
                //  // var d = moment().duration(then.diff(now))
                // var diffInMinutes = eventTime.diff(now, 'minutes')
                // // console.log('BEFORE LOGIC',diffInMinutes)
                // let minutesToFire

                //     if(diffInMinutes < 0){
                //         minutesToFire = Math.abs((Math.abs(diffInMinutes + 720) * 2) + diffInMinutes)
                //     }
                //     else{
                //         minutesToFire = diffInMinutes
                //     }

                this.sendNotification(p,false)
            }
          // setInterval(() => {
          //       this.syncDays(onAlarms[i])
          //   }, 1000)

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
        this.stopAlarm(id)
        this.setTimes()
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
        this.stopAlarm(id)

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


    async loadMe(token){
        await axios.post(`${api}/me`,token,{headers: { authorization: 'Bearer ' + token }}).then((res,err) => {
            if (err){
                console.log(err)
            }else{
                if(res.data === 401){
                    this.setState({me:null})
                }
                else{
                    this.setState({me:res.data,authenticated:true,accountName:res.data.name,accountEmail:res.data.email})
                }
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }


    async setUser(){
        const existingToken = await AsyncStorage.getItem('SleepyToken')
        console.log('EXISTING',existingToken)
        if (existingToken) {
            const token = JSON.parse(existingToken)
            this.setState({token:token})
            await this.loadMe(token)
        }
        else{
            console.log('No token')
            this.setState({me:'',authenticated:false})
        }
    }

    async login(email,password){
        const credentials = {email,password}
        console.log('CRED',credentials)
        await axios.post(`${api}/login`,credentials).then((res,err) => {
            if(err){
                console.log('err',err)
            }
            else if(res.data === 'user not found' || res.data === 'Passwords dont match'){
                this.setState({credError:true})
            }
            else if(res.data === 'email not verified'){
                this.setState({verifiedError:true})
            }
            else{
                console.log('LOGIN RES',res)
                const token = JSON.stringify(res.data.token)
                const refresh = JSON.stringify(res.data.refreshToken)
                AsyncStorage.setItem('SleepyToken',token)
                AsyncStorage.setItem('SleepyRefresh',refresh)
                this.setUser()
            } 
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async signup(name,email,password){
        this.setState({loading:true})
        // setTimeout(() => this.setState({signupSent:true,loading:false}),3000)
        const user = {name,email,password}
        await  axios.post(`${api}/signup`,user).then((res,err) => {
            console.log('RESPONSE',res.data)
            if(err){
                console.log('error',err)
                this.setState({error:true,loading:false})
            }else if(res.data === 'email exists'){
                console.log('WORKING')
                this.setState({emailExists:true})
                setTimeout(() => this.setState({loading:false}),3000)
            }else{
                console.log('RESPONSE',res)
                this.setState({signupSent:true})
                // setTimeout(() => this.setState({loading:false}),3000)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
            setTimeout(() => this.setState({systemError:false,systemErrorMessage:''}),3000)
        })
    }

    async refreshAuthToken(refresh){
        const token = this.state.token
        const payload = {
            user:this.state.me,
            refreshToken:refresh
        }
        await axios.put(`${api}/refresh`,payload,{headers: { authorization: 'Bearer ' + token }}).then((result,err) => {
            if(err){
                console.log(err)
            }
            else{
                AsyncStorage.setItem('SleepyRefresh',result)
            }
        }).catch((err) => {
            console.log(err)
            this.setState({systemError:true,systemErrorMessage:'Cannot connect to server'})
        })
    }

    async checkAuth(){
        const getToken = await AsyncStorage.getItem('SleepyToken')
        const getRefreshAuthToken = await AsyncStorage.getItem('SleepyRefresh')
        const token = JSON.parse(getToken)
        const refreshAuthToken = JSON.parse(getRefreshAuthToken)
        console.log(token)
        console.log(refreshAuthToken)
        const now = new Date().getTime()

        if (!token || !refreshAuthToken) {
            console.log('no token found')
            this.setState({authenticated:false})
        }
        if(this.state.me === null){
            this.setState({authenticated:false})
        }
        try {
        // { exp: 12903819203 }
            const { exp } = decode(token, { header: true })
            console.log('EXP',exp)
            if (exp < now / 1000) {
                console.log('token is expired')
                this.setState({authenticated:false})
            }
            if( exp < (( now / 1000) + 3600)){
                console.log('refreshing token')
                this.refreshAuthToken(refreshAuthToken)
            }
        } 

        catch (e) {
            console.log('ERROR VALIDATING TOKEN',e)
            this.setState({authenticated:false})
        }
        console.log('sending true')
        return true
    }
  
    render() {
        console.log(this.state)
        const newAlarm = {
            id: uuidv4(),
            time:this.state.timeSelect,
            frequency: this.state.frequency.length === 0 ? [{option:'Just Once'}] : this.state.frequency,
            label: this.state.label,
            charity: this.state.charitySelect,
            switch: true
        }
        return (
            <Context.Provider 
                value={{
                    store:this.state,

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

                    clearInfoModal: () => this.clearInfoModal(),

                    triggerInfoModal: () => this.setState({infoModal:true}),

                    closeAddErrorModal: () => this.setState({addErrorModal:false}),

                    triggerAddErrorModal: () => this.setState({addErrorModal:true}),

                    loading: (bool) => this.setState({loading:bool}),

                    approveCharity : (id) => this.approveCharity(id),

                    rejectCharity: (id,reason) => this.rejectCharity(id,reason),

                    loadApprovals: () => this.loadApprovals(),

                    snoozePressed: () => this.snoozePressed(),

                    getCurrentSnapshot: () => this.getCurrentSnapshot(),

                    loadLineData: (date) => this.loadLineData(date),

                    getSnapshots:() => this.getSnapshots(),

                    searchCharityEmail: (email) => this.searchCharityEmail(email),

                    searchUserEmail: (email) => this.searchUserEmail(email),

                    getInvoices: (id) => this.getInvoices(id),

                    signup: (name,email,pass) => this.signup(name,email,pass),

                    toggleLoading: () => this.setState({loading:false}),

                    resetLoginModal: () => this.setState({loading:false,signupSent:false,emailExists:false}),

                    login: (e,p) => this.login(e,p),

                    checkAuth: () => this.checkAuth()

                }}> 
                {
                    !this.state.authenticated  ?
                        <Login />
                        :
                        <Tabs />
                    
                }
            </Context.Provider>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})