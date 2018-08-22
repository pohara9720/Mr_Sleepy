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


import {Icon} from 'react-native-elements'
// import { NavigationActions } from 'react-navigation'
// import LinearGradient from 'react-native-linear-gradient'
// import {  Context } from '../../../App'
// import connect from '../HOC'
// import moment from 'moment'
const screenWidth = Dimensions.get('window').width
const chartConfig = {
    backgroundGradientFrom: '#a020f0',
    backgroundGradientTo: '#7016a8',
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
}

const styles = StyleSheet.create({
	   current:{
        marginLeft:10,
        marginRight:10,
        backgroundColor:'white',
        borderWidth:0,
        borderBottomWidth:1,
        borderColor:'#a020f0',
        padding:15,
        flexDirection:'row',
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowRadius: 10
    }
});

export const SnapDetails = (props) => (
	<ScrollView>
            <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Current Data</Text>
            <View  style={styles.current}>
                  <Icon 
                        name='users'
                        type='font-awesome'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Total Users</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.totalUsers}</Text>
            </View>

            <View  style={styles.current}>
                  <Icon 
                        name='account-check'
                        type='material-community'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Active Users</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.activeUsers}</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name='account-heart'
                        type='material-community'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Users Donating</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.usersDonating}</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name='account-remove'
                        type='material-community'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Inactive Users</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.inactiveUsers}</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name='business'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Total Charities</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.totalCharities}</Text>
            </View>
            {/*<View  style={styles.current}>
                  <Icon 
                        name={'favorite-border'}
                        color={'#a020f0'}
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Top Charities</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Dua Lipa Foundation</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Food for hungry</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Baes</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Help for baes</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Help the kids</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name={'favorite-border'}
                        color={'#a020f0'}
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Bottom Charities</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Apples </Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Ants</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Toads</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Animals</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>Rats</Text>
            </View>*/}

            <View  style={styles.current}>
                  <Icon 
                        name='coin'
                        type='material-community'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Average Donation</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.averageDonation}</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name='attach-money'
                        color='#a020f0'
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Donations YTD</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.donationsYTD}</Text>
            </View>
            <View  style={styles.current}>
                  <Icon 
                        name='money'
                        type='font-awesome'
                        color={'#a020f0'}
                        size={20}
                        iconStyle={{marginRight:10}}
                  />
                  <Text style={{color:'#a020f0',fontSize:15}}>Overall Donations</Text>
                  <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{props.overallDonations}</Text>
            </View>

            <Text style={{paddingLeft:5,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>User Activity</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <PieChart
                    data={props.userGraph}
                    width={screenWidth-10}
                    height={180}
                    chartConfig={chartConfig}
                    accessor="population"
                />
            </View>
            <Text style={{paddingLeft:5,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Charity Activity</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <PieChart
                    data={props.charityGraph}
                    width={screenWidth-10}
                    height={180}
                    chartConfig={chartConfig}
                    accessor="population"
                />
            </View>
            <Text style={{paddingLeft:5,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>Profit Distribution</Text>
            <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center'}}>
                <LineChart
                  data={props.lineGraph}
                  width={screenWidth-10}
                  height={180}
                  chartConfig={chartConfig}
                  bezier
              />
            </View>
        </ScrollView>
)