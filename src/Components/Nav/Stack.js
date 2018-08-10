import React from 'react'
import { StackNavigator } from 'react-navigation'
import AddAlarm from '../AddAlarm/AddAlarm'
import CharitySelect from '../AddAlarm/CharitySelect'
import LabelSelect from '../AddAlarm/LabelSelect'
import RepeatSelect from '../AddAlarm/RepeatSelect'
import Profile from '../Profile/Profile'
import Alarms from '../Alarms'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import CharityProfile from '../AddAlarm/CharityProfile'
// import {Tabs} from './Tabs'


const Auth = StackNavigator({
    Login: { screen: props => <Login {...props} />},
    Signup: { screen: props => <Signup {...props} />},
    // Success: { screen: <Tab />},
},
{
    headerMode: 'none',
})

const ProfileRoutes = StackNavigator({
    Profile: { screen: props => <Profile {...props} />},
},
{
    headerMode: 'none',
})

const AlarmRoutes = StackNavigator({
	Alarms: { screen: props => <Alarms {...props} />},
	AddAlarm: { screen: props => <AddAlarm {...props} />},
	CharityProfile: { screen: props => <CharityProfile {...props} />},
    CharitySelect: { screen: props => <CharitySelect {...props} />},
    LabelSelect: { screen: props => <LabelSelect {...props} />  },
    RepeatSelect: { screen : props => <RepeatSelect {...props} /> },
},
{
    headerMode: 'none',
})





  
module.exports = { ProfileRoutes, AlarmRoutes,Auth }