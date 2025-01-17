import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,TouchableOpacity,Linking
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import {Header,Icon} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import PropTypes from 'prop-types'



class Settings extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            
        }
    }


    componentDidMount(){
        this.props.checkAuth()
    }
    render() {
        const Back = () => {
            const backAction = NavigationActions.back({})
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }

        const {navigate} = this.props.navigation

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Back />}
                    centerComponent={{ text: 'Account', style: { color: '#a020f0',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                <ScrollView style={{flex:1}}>
                    <View style={{marginTop:15,padding:15}}>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Account</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`${this.props.store.websiteUrl}legal`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='legal'
                                    type='font-awesome'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Terms & Conditions</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL(`${this.props.store.websiteUrl}legal`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='legal'
                                    type='font-awesome'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Privacy Policy</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Receipts')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='receipt'
                                    color='#a020f0'
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Invoices & Donations</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:hellomrsleepy@gmail.com')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='help-network'
                                    type='material-community'
                                    color='#a020f0'
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Help</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.signOut()}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='logout'
                                    type='material-community'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Sign out</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.deleteAccount()}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='account-remove'
                                    type='material-community'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Delete Account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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

Settings.propTypes = {
    store: p.object,
    systemError:p.bool,
    checkAuth:p.func,
    navigation:p.object,
    dispatch:p.func,
    systemErrorMessage:p.string,
    deleteAccount:p.func,
    signOut:p.func
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    linearGradient:{
        height:230,
        justifyContent:'center'
    },
    title:{
        textAlign:'center',
        color:'white',
        fontSize:22,
        marginTop:10
    },
    image:{
        borderRadius:50,
        height:100,
        width:100
    },
    listItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:0,
        padding:15,
        flexDirection:'row'
    },
    lastItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row'
    },
    lastItem2:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    }
})

export default connect(Settings, Context)