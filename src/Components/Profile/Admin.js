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
    const screenWidth = Dimensions.get('window').width
    const chartConfig = {
        backgroundGradientFrom: '#a020f0',
        backgroundGradientTo: '#7016a8',
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
    }
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
     const pieData = [
        { name: 'Active', population: 340  },
        { name: 'Total', population: 510 },
        { name: 'Donating', population: 255 },
    ]
    const heatData = [
        { date: '2017-01-02', count: 1 },
        { date: '2017-01-03', count: 2 },
        { date: '2017-01-04', count: 3 },
        { date: '2017-01-05', count: 4 },
        { date: '2017-01-06', count:40 },
        { date: '2017-01-07', count:40 },
        { date: '2017-01-08', count:40 },
        { date: '2017-01-09', count: 4 },
        { date: '2017-01-10', count: 3},
        { date: '2017-01-11', count: 12},
        { date: '2017-01-12', count: 12 },
        { date: '2017-01-13', count:40 },
        { date: '2017-01-14', count: 1 },
        { date: '2017-01-15', count: 2 },
        { date: '2017-01-16', count:40 },
        { date: '2017-01-17', count:40 },
        { date: '2017-01-18', count: 2 },
        { date: '2017-01-19', count: 3 },
        { date: '2017-01-20', count: 2 },
        { date: '2017-01-21', count: 4 },
        { date: '2017-01-22', count: 2 },
        { date: '2017-01-23', count: 4 },
        { date: '2017-01-24', count: 4 },
        { date: '2017-01-25', count: 4 },
        { date: '2017-01-26', count: 4 },
        { date: '2017-01-27', count: 4 },
        { date: '2017-01-28', count: 4 },
        { date: '2017-01-29', count: 4 },

        { date: '2017-02-02', count: 1 },
        { date: '2017-02-03', count: 2 },
        { date: '2017-02-04', count: 3 },
        { date: '2017-02-05', count: 4 },
        { date: '2017-02-06', count:40 },
        { date: '2017-02-07', count:40 },
        { date: '2017-02-08', count:40 },
        { date: '2017-02-09', count: 4 },
        { date: '2017-02-10', count: 3},
        { date: '2017-02-11', count: 12},
        { date: '2017-02-12', count: 12 },
        { date: '2017-02-13', count:40 },
        { date: '2017-02-14', count: 1 },
        { date: '2017-02-15', count: 2 },
        { date: '2017-02-16', count:40 },
        { date: '2017-02-17', count:40 },
        { date: '2017-02-18', count: 2 },
        { date: '2017-02-19', count: 3 },
        { date: '2017-02-20', count: 2 },
        { date: '2017-02-21', count: 4 },
        { date: '2017-02-22', count: 2 },
        { date: '2017-02-23', count: 4 },
        { date: '2017-02-24', count: 4 },
        { date: '2017-02-25', count: 4 },
        { date: '2017-02-26', count: 4 },
        { date: '2017-02-27', count: 4 },
        { date: '2017-02-28', count: 4 },
        { date: '2017-02-29', count: 4 },
         { date: '2017-12-02', count: 1 },
        { date: '2017-12-03', count: 2 },
        { date: '2017-12-04', count: 3 },
        { date: '2017-12-05', count: 4 },
        { date: '2017-12-06', count:40 },
        { date: '2017-12-07', count:40 },
        { date: '2017-12-08', count:40 },
        { date: '2017-12-09', count: 4 },
        { date: '2017-12-10', count: 3},
        { date: '2017-12-11', count: 12},
        { date: '2017-12-12', count: 12 },
        { date: '2017-12-13', count:40 },
        { date: '2017-12-14', count: 1 },
        { date: '2017-12-15', count: 2 },
        { date: '2017-12-16', count:40 },
        { date: '2017-12-17', count:40 },
        { date: '2017-12-18', count: 2 },
        { date: '2017-12-19', count: 3 },
        { date: '2017-12-20', count: 2 },
        { date: '2017-12-21', count: 4 },
        { date: '2017-12-22', count: 2 },
        { date: '2017-12-23', count: 4 },
        { date: '2017-12-24', count: 4 },
        { date: '2017-12-25', count: 4 },
        { date: '2017-12-26', count: 4 },
        { date: '2017-12-27', count: 4 },
        { date: '2017-12-28', count: 4 },
        { date: '2017-12-29', count: 4 },
    ]

    const lineData = {
        labels: ['January', 'April','August','December'],
        datasets: [{
          data: [ 20, 45, 28, 80, 99, 43,100,300,123,303,500,1000,1200,400,1300,1500,2000 ]
        }]
    }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            rightComponent={{ icon: 'camera-enhance', color: '#fff' }}
            centerComponent={{ text: 'Admin', style: {fontSize:22,color:'white'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView>
            <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>User Distribution</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <PieChart
                    data={pieData}
                    width={screenWidth-20}
                    height={180}
                    chartConfig={chartConfig}
                    accessor="population"
                />
            </View>
            <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Profit Distribution</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <LineChart
                  data={lineData}
                  width={screenWidth-20}
                  height={180}
                  chartConfig={chartConfig}
                  bezier
              />
            </View>
            <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Usage</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <ContributionGraph
                    values={heatData}
                    endDate={new Date('2017-02-30')}
                    numDays={100}
                    width={screenWidth-20}
                    height={180}
                    chartConfig={chartConfig}
                />
            </View>
            <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Mr. Sleepy Snapshot</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <Text>STATS</Text>
            </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a020f0',
    },
});

export default connect(Admin, Context)