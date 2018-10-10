import React from 'react'
import { createStackNavigator } from 'react-navigation'
import AddAlarm from '../AddAlarm/AddAlarm'
import Snooze from '../AddAlarm/Snooze'
import CharitySelect from '../AddAlarm/CharitySelect'
import LabelSelect from '../AddAlarm/LabelSelect'
import RepeatSelect from '../AddAlarm/RepeatSelect'
import Profile from '../Profile/Profile'
import Settings from '../Profile/Settings'
import Alarms from '../Alarms'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'
import Terms_Conditions from '../Profile/Terms&Conditions'
import Privacy from '../Profile/Privacy'
import Receipts from '../Profile/Receipts'
import Snapshots from '../Profile/Snapshots'
import SnapView from '../Profile/SnapView'
import Admin from '../Profile/Admin'
import SuperSearch from '../Profile/SuperSearch'
import AdminView from '../Profile/AdminView'
import ApprovalList from '../Profile/ApprovalList'
import ApprovalProfile from '../Profile/ApprovalProfile'
import CharityProfile from '../AddAlarm/CharityProfile'
import DonateProfile from '../Donate/DonateProfile'
import DonateSelect from '../Donate/DonateSelect'

// import {Tabs} from './Tabs'


const Auth = createStackNavigator({
    Login: { screen: props => <Login {...props} />},
    Signup: { screen: props => <Signup {...props} />},
    // Success: { screen: <Tab />},
},
{
    headerMode: 'none',
})

const ProfileRoutes = createStackNavigator({
    Profile: { screen: props => <Profile {...props} />},
    Settings: { screen: props => <Settings {...props} />},
    Terms: { screen: props => <Terms_Conditions {...props} />},
    Privacy: { screen: props => <Privacy {...props} />},
    Receipts: { screen: props => <Receipts {...props} />},
    Admin: { screen: props => <Admin {...props} />},
    Snapshots: { screen: props => <Snapshots {...props} />},
    SnapView: { screen: props => <SnapView {...props} />},
    SuperSearch: { screen: props => <SuperSearch {...props} />},
    AdminView: { screen: props => <AdminView {...props} />},
    ApprovalList: { screen: props => <ApprovalList {...props} />},
    ApprovalProfile: { screen: props => <ApprovalProfile {...props} />},
},
{
    headerMode: 'none',
})

const AlarmRoutes = createStackNavigator({
    Alarms: { screen: props => <Alarms {...props} />},
    Snooze: { screen: props => <Snooze {...props} />},
    AddAlarm: { screen: props => <AddAlarm {...props} />},
    CharityProfile: { screen: props => <CharityProfile {...props} />},
    CharitySelect: { screen: props => <CharitySelect {...props} />},
    LabelSelect: { screen: props => <LabelSelect {...props} />  },
    RepeatSelect: { screen : props => <RepeatSelect {...props} /> },
},
{
    headerMode: 'none',
})

const DonateRoutes = createStackNavigator({
    DonateSelect: { screen: props => <DonateSelect {...props} />},
    DonateProfile: { screen: props => <DonateProfile {...props} />},
},
{
    headerMode: 'none',
})





  
module.exports = { ProfileRoutes, AlarmRoutes,Auth,DonateRoutes }