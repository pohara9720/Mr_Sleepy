import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,TouchableOpacity,Image,Linking
} from 'react-native'


import {Header ,ListItem,Icon } from 'react-native-elements'
import Modal from 'react-native-simple-modal'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { Context } from '../../App'
import connect from './HOC'
import PushNotification from 'react-native-push-notification'



class Alarms extends Component<Props> {
    constructor(props){
        super(props)
        this.state ={
            edit:false,
            card:false
        }
    }

    componentDidMount(){
        this.props.checkAuth()
        this.props.getCustomerPayment(this.props.me.snoozer_customerId)
        // const {navigate} = this.props.navigation
        // navigate('Snooze')
        PushNotification.checkPermissions((callback) => {
            // console.log('CALLBACK',callback)
            if(callback.alert !== 1|| callback.badge  !== 1|| callback.sound !== 1){
                this.props.triggerInfoModal()
            }
            else{
                null
            }
        })
    }

    navigateTo = () => {
        const {navigate} = this.props.navigation
        if(this.props.store.payMethod){
            navigate('AddAlarm')
            this.setState({edit:false})
        }
        else{
            this.setState({card:true})
        }
    }

    deletLastAlarm = (id) => {
        this.setState({edit:false})
        this.props.deleteAlarm(id)
    }

    goToPayments = () => {
        this.setState({card:false})
        const {navigate} = this.props.navigation
        navigate('Payments')
    }

    render() {
        const {navigate} = this.props.navigation
        const Edit = () => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.setState({edit:!this.state.edit})}>
                    {this.state.edit ? 'Done' : 'Edit'}
                </Text>
            )
        }

        const Center = () => {
            return(
                <Image resizeMode='contain' style={{height:80}} source={require('../images/purplehat.png')}/>
            )
        }
        const CustHead = () => (
            <View style={{display:'flex',flexDirection:'row',justifyContent:'center',paddingTop:22,paddingBottom:10,width:'100%'}}>
                <Edit />
                <Image resizeMode='contain' style={{height:30}} source={require('../images/purplehat.png')}/>
                <Icon name='add' color='#a020f0' />
            </View>
        )
       
        // console.log(this.props.store)
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={this.props.store.alarmList !== null && this.props.store.alarmList.length === 0 ? null : <Edit />}
                    centerComponent={{ text: 'Mr. Sleepy', style: { color: '#a020f0',fontSize:22}}}
                    // centerComponent={<Center />}
                    rightComponent={{ icon: 'add', color: '#a020f0', onPress:() => this.navigateTo()}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'}}
                />
       
                <TouchableOpacity onPress={() => Linking.openURL('http://sleepywebsite.s3-website-us-east-1.amazonaws.com/')}>
                    <LinearGradient  colors={[ '#8E2DE2' ,'#4A00E0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.bannerGrad}>
                        <View style={styles.banner}>
                            <Icon 
                                name={'favorite'}
                                color={'white'}
                                size={12}
                                iconStyle={styles.customIcon}
                            />
                            <Text style={{fontSize:12,color:'white',marginLeft:10}}>Do you want to add your charity to Mr .Sleepy? Click here</Text> 
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
                <ScrollView style={styles.container}>
                    <View style={{borderTopWidth:0}}>
                        {  this.props.store.alarmList === null || this.props.store.alarmList.length === 0 ?
                            <TouchableOpacity
                                style={styles.btnContainer}
                                onPress={() => navigate('AddAlarm')}
                            >
                                <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                                    <View style={styles.customBtns}>
                                        <Icon 
                                            name={'alarm-off'}
                                            color={'white'}
                                            size={40}
                                            iconStyle={styles.customIcon}
                                        />
                                        <Text style={styles.btnText}>No Alarms. Please add an alarm to begin using Mr. Sleepy</Text> 
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                            :
                            this.props.store.alarmList &&
                            this.props.store.alarmList.map((alarm, i) => (
                                <LinearGradient  key={i} colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                                    { this.state.edit ? 
                                        <ListItem
                                            title={moment(alarm.time).format('h:mm a')}
                                            titleStyle={{fontSize:30,color:'white'}}
                                            subtitle={alarm.label}
                                            subtitleStyle={{color:'white'}}
                                            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                            hideChevron={false}
                                            onPressRightIcon={() => this.props.store.alarmList.length === 1 ? this.deletLastAlarm(i) : this.props.deleteAlarm(i)}
                                            rightIcon={{name:'remove-circle',color:'red'}}
                                        />
                                        :
                                        <ListItem
                                            title={moment(alarm.time).format('h:mm a')}
                                            titleStyle={{fontSize:30,color:'white'}}
                                            subtitle={alarm.label}
                                            subtitleStyle={{color:'white'}}
                                            switchButton={true}
                                            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                            hideChevron={true}
                                            switchOnTintColor={'#e1c2e1'}
                                            switchThumbTintColor={'white'}
                                            switchTintColor={'grey'}
                                            onSwitch={() => this.props.switch(i)}
                                            switched={this.props.store.alarmList[i].switch}
                                        />
                                    }
                                </LinearGradient>
                            )) 
                        }
                    </View>
                </ScrollView>
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={true}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor: '#a020f0',
                        borderRadius:10,  
                        borderColor:'#a020f0',
                    }}
                    offset={0}
                    open={this.props.store.infoModal}
                    overlayStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        flex: 1
                    }}
                >     
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{backgroundColor:'#a020f0',padding:50}}>
                            <Icon 
                                color='white'
                                size={70}
                                name='notifications-active' 
                                iconStyle={{marginBottom:20}}
                            />
                            <Text style={{textAlign:'center',color:'white'}}>Mr. Sleepy uses Push Notifications to make sure you receive your alarms! Would you like to give us permission to send you notifications? Don't worry we only use notifications for alarms!</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:12,backgroundColor:'white',width:'107%',marginBottom:-10,borderBottomLeftRadius:10,borderBottomRightRadius:10}}onPress={() => Linking.openURL('app-settings:')}>
                            <Text style={{color:'#a020f0',fontSize:15}}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={false}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor: '#a020f0',
                        borderRadius:10,  
                        borderColor:'#a020f0',
                    }}
                    offset={0}
                    open={this.state.card}
                    overlayStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        flex: 1
                    }}
                >     
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{backgroundColor:'#a020f0',padding:50}}>
                            <Icon 
                                color='white'
                                size={70}
                                name='heart'
                                type='material-community' 
                                iconStyle={{marginBottom:20}}
                            />
                            <Text style={{textAlign:'center',color:'white'}}>Please add a payment method to continue setting alarms.</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:12,backgroundColor:'white',width:'107%',marginBottom:-10,borderBottomLeftRadius:10,borderBottomRightRadius:10}}onPress={() => this.goToPayments()}>
                            <Text style={{color:'#a020f0',fontSize:15}}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        backgroundColor: 'white',
        borderTopWidth:0,
        borderTopColor:'transparent',
        borderBottomWidth:0,
        // fontFamily:'roboto'
    },
    bannerGrad:{
        width:'100%',
        padding:10,
        alignItems:'center'
    },
    banner:{
        flexDirection:'row',
    },
    linearGradient:{
        borderRadius:10,
        margin:10,
    },
    customBtns: {
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight:20,
        paddingLeft:20,
    },
    btnText: {
        color: 'white',
        fontSize:25,
        textAlign:'center'
    },
})

export default connect(Alarms, Context)