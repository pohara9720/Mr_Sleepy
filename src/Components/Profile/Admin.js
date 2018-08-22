import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Dimensions
} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'

import {SnapDetails} from './SnapDetails'
import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'




class Admin extends Component<Props> {
    constructor(props){
          super(props)
          this.state={

        }
    }

  render() {
    
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const Back = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'white',justifyContent:"center"}}
                 onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
              </Text>
            )
     }
     const userPie = [
        { name: 'Inactive', population: 110},
        { name: 'A.N.D', population: 130 },
        { name: 'Donors', population: 400 },
    ]
    const charityPie = [
        { name: 'None', population: 13 },
        { name: '> 10/m', population: 12 },
        { name: '< 10/m', population: 30 },
    ]
  

    const lineData = {
        labels: ['January', 'April','August','December'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43,100,300,123,303,500,1000,1200,400,1300,1500,2000 ]
        }]
    }

    // const charities =  getAllCharities() // All charities

    // const averageDonation= null // Average amount people snooze 
    // const snoozers = null // Number of users pushing snooze
    // const snoozePercentage = null // number of ppl snoozing divided by active users
    // const topCharities = charitySpectrum(top) // Top 5 charities
    // const bottomCharities = charitySpectrum(bottom) // Bottom 5 charities,
    // const donationsEver = loadAllDonations() // Donations made total ever
    // const donationThisMonth = null // Donations made in current month
    // const donationsThisYTD = null // Donations made for current YTD

    const data = {
        userGraph:[{ name: 'Inactive', population: 110},{ name: 'A.N.D', population: 130 },{ name: 'Donors', population: 400 }],
        charityGraph:[{ name: 'None', population: 13 },{ name: '> 10/m', population: 12 },{ name: '< 10/m', population: 30 }],
        lineGraph:{
                labels: ['January', 'April','August','December'],
                datasets: [{data: [ 20, 45, 28, 80, 99, 43,100,300,123,303,500,1000,1200,400,1300,1500,2000 ]}]
        },
        totalUsers:230,
        activeUsers:180,
        inactiveUsers:50,
        usersDonating:130,
        totalCharities:50,
        averageDonation:16,
        donationsThisYTD:1202,
        overallDonations:5002
    }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            // rightComponent={{ icon: 'camera-enhance', color: '#fff',onPress:() => navigate('Snapshots') }}
            centerComponent={{ text: 'Analytics', style: {fontSize:22,color:'white'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        {
            <SnapDetails 
                date='Current'
                userGraph={data.userGraph}
                charityGraph={data.charityGraph}
                lineGraph={data.lineGraph}
                totalUsers={data.totalUsers}
                activeUsers={data.activeUsers}
                inactiveUsers={data.inactiveUsers}
                usersDonating={data.usersDonating}
                totalCharities={data.totalCharities}
                averageDonation={data.averageDonation}
                donationsYTD={data.donationsThisYTD}
                overallDonations={data.overallDonations}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a020f0',
    }
});

export default connect(Admin, Context)