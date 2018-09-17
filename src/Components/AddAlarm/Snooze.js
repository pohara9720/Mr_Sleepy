import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView,
    Navigator,KeyboardAvoidingView,TouchableOpacity
} from 'react-native'

import { FormLabel, FormInput,Button, Header,SearchBar,Icon } from 'react-native-elements'
import { StackNavigator } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import logo from '../../images/whitecircle.png'
import connect from '../HOC'
import { Context } from '../../../App'


class Snooze extends Component<{}> { 
    constructor(props){
        super(props)
        this.state = {
           
        }
    }

    snooze = () => {
        this.props.snoozePressed()
        const {navigate} = this.props.navigation
        navigate('Alarms')
    }

    render() {
        // const { navigate } = this.props.navigation
        return (
            <LinearGradient  colors={['#a020f0', '#c679f6', '#7016a8']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../../images/whitetext.png')} resizeMode='contain' style={{height:60,marginBottom:20}}/>
                    <Image source={require('../../images/whitecircle.png')} resizeMode='contain' style={{height:150}}/>
                </View>
                <View style={{display:'flex',flexDirection:'column',width:'100%',padding:20,height:'60%',justifyContent:'flex-end'}}>
                    <TouchableOpacity  onPress={() => this.snooze()}style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <LinearGradient  colors={[ '#8E2DE2' ,'#4A00E0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.bannerGrad}>
                            <View style={styles.banner}>
                                <Text style={{fontSize:20,color:'white',marginRight:8}}>Snooze</Text>
                                <Icon 
                                    name='sleep'
                                    color='white'
                                    type='material-community'
                                    size={20}
                                /> 
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.stop}>
                        <Text style={{color:'#a020f0',fontSize:20}}>Stop Alarm</Text>
                    </TouchableOpacity>
                </View>
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
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex:1,
        // paddingLeft:20,
        // paddingRight:20,
        alignItems:'center',
        paddingTop:'20%',
        borderWidth:1,
        borderColor:'white',
        // position:'relative'
        // justifyContent:'center'
    },
    bannerGrad:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        borderRadius:10,
        marginTop:20,
        marginBottom:20
    },
    banner:{
        display:'flex',
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    stop:{
        backgroundColor:'white',
        width: '100%',
        justifyContent:'center',
        alignItems:'center',
        padding:15,
        borderRadius:10,
    }
})


export default connect(Snooze,Context)

