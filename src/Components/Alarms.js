import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header ,List,ListItem,Icon } from 'react-native-elements'
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../App'
import connect from './HOC'




class Alarms extends Component<Props> {
    constructor(props){
      super(props)
      this.state ={
        edit:false
      }
    }

    navigateTo = () => {
      const {navigate} = this.props.navigation
      navigate('AddAlarm')
      this.setState({edit:false})
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
      return (
        <View style={styles.container}>
          <Header
              leftComponent={this.props.store.alarmList.length === 0 ? null : <Edit />}
              centerComponent={{ text: 'Mr. Sleepy', style: {fontSize:22,color:'#a020f0'}}}
              rightComponent={{ icon: 'add', color: '#a020f0', onPress:() => this.navigateTo()}}
              outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'}}
          />
              <TouchableOpacity>
                  <Image
                      resizeMode='cover'
                      source={require('../images/bannerAd.png')}
                      style={{height:140,width:'100%'}}/>
              </TouchableOpacity>
               <ScrollView style={styles.container}>
                  <View style={{borderTopWidth:0}}>
                      {   this.props.store.alarmList.length === 0 ?
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
                                      onPressRightIcon={() => this.props.deleteAlarm(i)}
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
    borderBottomWidth:0
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