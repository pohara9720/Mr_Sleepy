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
    // console.log('SCREEN',this.props)
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            // rightComponent={{ icon: 'camera-enhance', color: '#fff',onPress:() => navigate('Snapshots') }}
            centerComponent={{ text: `${data.date}`, style: {fontSize:22,color:'white'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        {
            <SnapDetails 
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
                date={data.date}
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

export default connect(SnapView, Context)