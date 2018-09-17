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




class SnapView extends Component<Props> {
    constructor(props){
          super(props)
          this.state={

        }
    }

    componentDidMount(){
      this.props.loadLineData(this.props.navigation.state.params.r.createdAt)
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
    const data = this.props.navigation.state.params.r
    const labels = this.props.store.lineData.map(x => moment(x.date).format('M/D'))
    const numbers = this.props.store.lineData.map(z => z.donations)
    console.log('NUMBER',numbers)
    const lineNum = numbers.map(y => y.length)
    console.log('NUMBER2',lineNum)
    const snapData = {
        userGraph:[{ name: 'Inactive', population:(data.users - data.activeUsers)},{ name: 'A.N.D', population: (data.activeUsers - data.snoozers)},{ name: 'Donors', population:data.snoozers}],
        charityGraph:[{ name: 'Dead', population: (100 - data.activeCharityPercent)},{ name: 'Receiving', population: data.activeCharityPercent}],
        lineGraph:{
                labels: labels,
                datasets: [{data: lineNum}]
        },
        //NEED PROPER LINE GRAPH
        totalUsers:data.users,
        activeUsers: data.activeUsers,
        inactiveUsers:(data.users - data.activeUsers),
        usersDonating:data.snoozers,
        totalCharities:data.charities,
        bottomCharities:data.bottomCharities,
        topCharities:data.topCharities,
        averageDonation:`$1.00`,
        donationsThisYTD:data.donationsThisYTD,
        overallDonations:data.donationsEver
    }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            // rightComponent={{ icon: 'camera-enhance', color: '#fff',onPress:() => navigate('Snapshots') }}
            centerComponent={{ text: `${moment(data.createdAt).format('MMM YY')}`, style: {fontSize:22,color:'white'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        {
            <SnapDetails 
                userGraph={snapData.userGraph}
                charityGraph={snapData.charityGraph}
                lineGraph={snapData.lineGraph}
                totalUsers={snapData.totalUsers}
                activeUsers={snapData.activeUsers}
                inactiveUsers={snapData.inactiveUsers}
                usersDonating={snapData.usersDonating}
                totalCharities={snapData.totalCharities}
                averageDonation={snapData.averageDonation}
                donationsYTD={snapData.donationsThisYTD}
                topCharities={snapData.topCharities}
                bottomCharities={snapData.bottomCharities}
                overallDonations={snapData.overallDonations}
                date={moment(data.createdAt).format('MMM YY')}
            />
        }
        { this.props.store.systemError ?
                    <TouchableOpacity style={{position:'absolute',top:0,left:0,right:0}}>
                          <LinearGradient  colors={[ '#cb2d3e' ,'#ef473a']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={{width:'100%',padding:10,alignItems:'center',paddingTop:20}}>
                                <View style={{flexDirection:'row',width:'100%',justifyContent:'center'}}>
                                    <Icon 
                                        name='error'
                                        color='white'
                                        size={12}
                                        iconStyle={styles.customIcon}
                                    />
                                    <Text style={{fontSize:12,color:'white',marginLeft:10}}>{this.props.store.systemErrorMessage}</Text> 
                                </View>
                          </LinearGradient>
                    </TouchableOpacity> : null
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

export default connect(SnapView, Context)