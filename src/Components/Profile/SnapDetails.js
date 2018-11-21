import React from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,Dimensions
} from 'react-native'

import {
    LineChart,
    PieChart,
} from 'react-native-chart-kit'

import {Icon} from 'react-native-elements'
import PropTypes from 'prop-types'

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
})

const splitWords = (string) => {
    var spl = string.split(',')
    console.log(spl)
    return spl
}

export const SnapDetails = (props) => (
    <ScrollView>
        <Text style={{paddingLeft:10,color:'white',fontWeight:'bold',fontSize:25,marginBottom:10,marginTop:30}}>{props.date} Data</Text>
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
        {   splitWords(props.topCharities).map((t,i) => 
            <View key={i} style={styles.current}>
                <Icon 
                    name='thumb-up'
                    color='#a020f0'
                    size={20}
                    iconStyle={{marginRight:10}}
                />
                <Text style={{color:'#a020f0',fontSize:15}}>Top Charity</Text>
                <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{t}</Text>
            </View>
        )}
        {   splitWords(props.bottomCharities).map((b,i) =>
            <View  key={i} style={styles.current}>
                <Icon 
                    name='thumb-down'
                    color='#a020f0'
                    size={20}
                    iconStyle={{marginRight:10}}
                />
                <Text style={{color:'#a020f0',fontSize:15}}>Bottom Charity</Text>
                <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{b}</Text>
            </View>
        )}
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
            <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{`$${props.averageDonation.toFixed(2)}`}</Text>
        </View>
        <View  style={styles.current}>
            <Icon 
                name='attach-money'
                color='#a020f0'
                size={20}
                iconStyle={{marginRight:10}}
            />
            <Text style={{color:'#a020f0',fontSize:15}}>Donations YTD</Text>
            <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{`$${props.donationsYTD.toFixed(2)}`}</Text>
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
            <Text style={{marginLeft:'auto',color:'#a020f0',fontSize:15,fontWeight:'bold'}}>{`$${props.overallDonations.toFixed(2)}`}</Text>
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
        <View style={{shadowColor: 'white',shadowOpacity: 1,shadowRadius: 10,alignItems:'center',marginBottom:50}}>
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

const p = PropTypes

SnapDetails.propTypes = {
    lineGraph:p.array,
    overallDonations:p.number,
    charityGraph:p.array,
    userGraph:p.array,
    donationsYTD:p.number,
    totalCharities:p.number,
    bottomCharities:p.string,
    topCharities:p.string,
    inactiveUsers:p.number,
    usersDonating:p.number,
    activeUsers:p.number,
    date:p.string,
    totalUsers:p.number,
    averageDonation:p.number
}