import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from 'react-navigation'
import Alarms from '../Alarms'
import Profile from '../Profile/Profile'
import Payments from '../Payments/Payments'
import DonateSelect from '../Donate/DonateSelect'
import { AlarmRoutes, ProfileRoutes,DonateRoutes} from './Stack'


const Tabs = createBottomTabNavigator({
    Payments: { screen : Payments },
    Alarms: { screen: AlarmRoutes },
    DonateSelect: { screen: DonateRoutes },
    Profile: { screen: ProfileRoutes },
},{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state
            let iconName
            if (routeName === 'Alarms') {
                iconName = `${focused ? 'ios-alarm' : 'ios-alarm-outline'}`
            }
            else if (routeName === 'Profile') {
                iconName = `${focused ? 'ios-contact' : 'ios-contact-outline'}`
            }
            else if (routeName === 'DonateSelect') {
                iconName = `${focused ? 'ios-heart' : 'ios-heart-outline'}`
            }
            else {
                iconName = `${focused ? 'ios-card' : 'ios-card-outline'}`
            }
            return <Ionicons name={iconName} size={25} color={tintColor} />
        },
    }),
    tabBarPosition:'bottom',
    initialRouteName: 'Alarms',
    swipeEnabled:true,
    tabBarOptions:{
        activeTintColor:'#a020f0',
        activeBackgroundColor:'white',
        inactiveTintColor:'grey',
        inactiveBackgroundColor:'white',
        labelStyle:{
            display:'none'
        }

    }
})

Tabs.navigationOptions ={
    title:'Example'
}

export default Tabs