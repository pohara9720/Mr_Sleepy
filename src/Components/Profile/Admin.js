import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,TouchableOpacity
} from 'react-native'


import {SnapDetails} from './SnapDetails'
import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'
import PropTypes from 'prop-types'




class Admin extends Component<Props> {
    constructor(props){
        super(props)
        this.state={

        }
    }



    componentDidMount(){
        this.props.checkAuth()
    }
    render() {
    
        const {navigate} = this.props.navigation
        const backAction = NavigationActions.back({})
        const Back = () => {
            return(
                <Text
                    style={{fontSize:14,color:'white',justifyContent:'center'}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }
        const labels = this.props.store.lineData && this.props.store.lineData.map(x => moment(x.date).format('M/D'))
        const numbers = this.props.store.lineData && this.props.store.lineData.map(z => z.donations)
        console.log('NUMBER',numbers)
        const lineNum = numbers.map(y => y.length)
        console.log('NUMBER2',lineNum[0])
        const data = {
            userGraph:[{ name: 'Inactive', population:(this.props.store.currentSnapshot.users - this.props.store.currentSnapshot.activeUsers)},{ name: 'A.N.D', population: (this.props.store.currentSnapshot.activeUsers - this.props.store.currentSnapshot.snoozers)},{ name: 'Donors', population:this.props.store.currentSnapshot.snoozers}],
            charityGraph:[{ name: 'Dead', population: (100 - this.props.store.currentSnapshot.activeCharityPercent)},{ name: 'Receiving', population: this.props.store.currentSnapshot.activeCharityPercent}],
            lineGraph:{
                labels: labels,
                datasets: [{
                    data: lineNum
                }]
            },
            //NEED PROPER LINE GRAPH
            totalUsers:this.props.store.currentSnapshot.users,
            activeUsers: this.props.store.currentSnapshot.activeUsers,
            inactiveUsers:(this.props.store.currentSnapshot.users - this.props.store.currentSnapshot.activeUsers),
            usersDonating:this.props.store.currentSnapshot.snoozers,
            totalCharities:this.props.store.currentSnapshot.charities,
            averageDonation:this.props.store.currentSnapshot.averageDonation,
            donationsThisYTD:this.props.store.currentSnapshot.donationsThisYTD,
            topCharities: this.props.store.currentSnapshot.topCharities,
            bottomCharities: this.props.store.currentSnapshot.bottomCharities,
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
                        topCharities={data.topCharities}
                        bottomCharities={data.bottomCharities}
                        averageDonation={data.averageDonation}
                        donationsYTD={data.donationsThisYTD}
                        overallDonations={data.overallDonations}
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

const p = PropTypes

Admin.propTypes = {
    store: p.object,
    systemError:p.bool,
    checkAuth:p.func,
    navigation:p.object,
    dispatch:p.func,
    systemErrorMessage:p.string,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a020f0',
    }
})

export default connect(Admin, Context)