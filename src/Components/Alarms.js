import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image,Linking
} from 'react-native';


import {Header ,List,ListItem,Icon } from 'react-native-elements'
import Modal from "react-native-simple-modal"
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import { Context } from '../../App'
import connect from './HOC'
import PushNotification from 'react-native-push-notification'



class Alarms extends Component<Props> {
    constructor(props){
      super(props)
      this.state ={
        edit:false
      }
    }

    componentDidMount(){
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
      navigate('AddAlarm')
      this.setState({edit:false})
    }

    deletLastAlarm = (id) => {
        this.setState({edit:false})
        this.props.deleteAlarm(id)
    }

    render() {
      const {navigate} = this.props.navigation
      const Edit = (props) => {
              return(
                <Text
                   style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                   onPress={() => this.setState({edit:!this.state.edit})}>
                   {this.state.edit ? 'Done' : 'Edit'}
                </Text>
              )
       }
       // console.log(this.props.store)
      return (
        <View style={styles.container}>
          <Header
              leftComponent={this.props.store.alarmList !== null && this.props.store.alarmList.length === 0 ? null : <Edit />}
              centerComponent={{ text: 'Mr. Sleepy', style: {fontSize:22,color:'#a020f0'}}}
              rightComponent={{ icon: 'add', color: '#a020f0', onPress:() => this.navigateTo()}}
              outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'}}
          />
              <TouchableOpacity onPress={() => Linking.openURL('http://sleepywebsite.s3-website-us-east-1.amazonaws.com/')}>
                  <Image
                      resizeMode='cover'
                      source={require('../images/bannerAd.png')}
                      style={{height:140,width:'100%'}}/>
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
                    justifyContent: "center",
                  }}
                  disableOnBackPress={false}
                  // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                  modalStyle={{
                    backgroundColor: "#a020f0",
                    borderRadius:10,  
                    borderColor:'#a020f0',
                  }}
                  offset={0}
                  open={this.props.store.infoModal}
                  overlayStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.75)",
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
                              <Text style={{textAlign:'center',color:'white'}}>Mr. Sleepy uses Push Notifications to make sure you receive your alarms!</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:12,backgroundColor:'white',width:'107%',marginBottom:-10,borderBottomLeftRadius:10,borderBottomRightRadius:10}}onPress={() => Linking.openURL('app-settings:')}>
                              <Text style={{color:'#a020f0',fontSize:15}}>Okay</Text>
                        </TouchableOpacity>
                  </View>
              </Modal>
        </View>
      );
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
});

export default connect(Alarms, Context)