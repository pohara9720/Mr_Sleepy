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

    componentDidMount(){
        // const date = {date:moment().format()}
        // this.props.getCurrentSnapshot()
        // this.props.loadLineData(date)
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
    const labels = this.props.store.lineData.map(x => moment(x.date).format('M/D'))
    const numbers = this.props.store.lineData.map(z => z.donations)
    console.log('NUMBER',numbers)
    const lineNum = numbers.map(y => y.length)
    console.log('NUMBER2',lineNum)
    const data = {
        userGraph:[{ name: 'Inactive', population:(this.props.store.currentSnapshot.users - this.props.store.currentSnapshot.activeUsers)},{ name: 'A.N.D', population: (this.props.store.currentSnapshot.activeUsers - this.props.store.currentSnapshot.snoozers)},{ name: 'Donors', population:this.props.store.currentSnapshot.snoozers}],
        charityGraph:[{ name: 'Dead', population: (100 - this.props.store.currentSnapshot.activeCharityPercent)},{ name: 'Receiving', population: this.props.store.currentSnapshot.activeCharityPercent}],
        lineGraph:{
                labels: labels,
                datasets: [{data: lineNum}]
        },
        //NEED PROPER LINE GRAPH
        totalUsers:this.props.store.currentSnapshot.users,
        activeUsers: this.props.store.currentSnapshot.activeUsers,
        inactiveUsers:(this.props.store.currentSnapshot.users - this.props.store.currentSnapshot.activeUsers),
        usersDonating:this.props.store.currentSnapshot.snoozers,
        totalCharities:this.props.store.currentSnapshot.charities,
        averageDonation:`$1.00`,
        donationsThisYTD:this.props.store.currentSnapshot.donationsThisYTD,
        overallDonations:this.props.store.currentSnapshot.donationsEver
    }
    console.log(data.lineGraph.datasets)
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