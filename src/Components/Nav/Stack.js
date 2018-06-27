import React from 'react'
import { StackNavigator } from 'react-navigation'
import AddAlarm from '../AddAlarm/AddAlarm'
import CharitySelect from '../AddAlarm/CharitySelect'
import LabelSelect from '../AddAlarm/LabelSelect'
import RepeatSelect from '../AddAlarm/RepeatSelect'
import Profile from '../Profile/Profile'
import Alarms from '../Alarms'



const ProfileRoutes = StackNavigator({
    Profile: { screen: props => <Profile {...props} />},
},
{
    headerMode: 'none',
})

const AlarmRoutes = StackNavigator({
	Alarms: { screen: props => <Alarms {...props} />},
	AddAlarm: { screen: props => <AddAlarm {...props} />},
    CharitySelect: { screen: props => <CharitySelect {...props} />},
    LabelSelect: { screen: props => <LabelSelect {...props} />  },
    RepeatSelect: { screen : props => <RepeatSelect {...props} /> },
},
{
    headerMode: 'none',
})





  
module.exports = { ProfileRoutes, AlarmRoutes }