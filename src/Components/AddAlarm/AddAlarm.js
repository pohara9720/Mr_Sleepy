import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,TouchableOpacity,ScrollView
} from 'react-native';


import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import DateTimePicker from 'react-native-modal-datetime-picker'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-simple-modal'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'




class AddAlarm extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
        datePicker:false,
        time:'',
        modal: false
      }
    }

    cancelAlarm =() => {
      const backAction = NavigationActions.back({})
      this.props.navigation.dispatch(backAction)
      this.props.cancelAlarm()
    }
    errorMessage = () => {
        this.setState({modal:true})
        setTimeout(() => this.setState({modal:false}),2500)
    }
    createAlarm = () => {
        if(this.props.store.charitySelect === null){
            this.errorMessage()
        }
        else if(this.props.store.timeSelect === ''){
            this.errorMessage()
        }
        else{
            const {navigate} = this.props.navigation
            this.props.createAlarm()
            this.props.cancelAlarm()
            navigate('Alarms')
        }
    }

  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})

    const Cancel = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.cancelAlarm()}
                >Cancel
              </Text>
            )
     }

     const Save = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.createAlarm()}
                >Save
              </Text>
            )
     }

    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Cancel />}
            centerComponent={{ text: 'Create Alarm', style: {fontSize:22,color:'#a020f0'}}}
            rightComponent={<Save />}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <View style={{flex:1}}>
           {/*} <View style={{flexWrap:'wrap',flexDirection:'row',justifyContent:'center'}}> */}
           <ScrollView style={{padding:15,flexDirection:'column'}}>
                <TouchableOpacity 
                    style={styles.btnContainer}
                    onPress={() => this.props.toggleDatePicker()}
                >
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={styles.customBtns}>
                          {
                            this.props.store.timeSelect === '' ?
                              <Icon 
                                name={'watch-later'}
                                color={'white'}
                                size={30}
                                iconStyle={styles.customIcon}
                              /> :
                              <Icon 
                                name={'check-circle'}
                                color={'#00FF00'}
                                size={30}
                                iconStyle={styles.customIcon}
                              />
                          }
                            <Text style={styles.btnText}>
                                {
                                  this.props.store.timeSelect === '' ?
                                  'Time' :
                                  this.props.store.timeSelect
                                }
                            </Text>
                        </View>
                        <DateTimePicker
                            mode='time'
                            isVisible={this.props.store.datePicker}
                            onConfirm={(date) => this.props.updateTimeSelect(moment(date).format('hh:mm a'),false)}
                            onCancel={() => this.props.toggleDatePicker()}
                            is24Hour={false}
                            titleIOS={'Pick Alarm Time'}
                            titleStyle={{color:'#a020f0'}}
                            confirmTextStyle={{color:'#a020f0'}}
                            cancelTextStyle={{color:'red'}}
                            datePickerContainerStyleIOS={{borderColor:'#a020f0',borderWidth:3}}
                        />
                        </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => navigate('CharitySelect')}
                    >
                  <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                    <View style={styles.customBtns}>
                      { this.props.store.charitySelect === null  ? 
                        <Icon 
                            name={'favorite'}
                            color={'white'}
                            size={30}
                            iconStyle={styles.customIcon}
                          />
                          :
                        <Icon 
                          name={'check-circle'}
                          color={'#00FF00'}
                          size={30}
                          iconStyle={styles.customIcon}
                        />
                      }
                      {
                        this.props.store.charitySelect === null ?
                        <Text style={styles.btnText}>Charity</Text> :
                        <Text style={styles.smallerText}>{this.props.store.charitySelect.name}</Text>
                      }
                    </View>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => navigate('RepeatSelect')}
                    >
                  <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                    <View style={styles.customBtns}>
                    { this.props.store.frequency.length === 0 ?
                      <Icon 
                        name={'all-inclusive'}
                        color={'white'}
                        size={30}
                        iconStyle={styles.customIcon}
                        />
                        :
                        <Icon 
                          name={'check-circle'}
                          color={'#00FF00'}
                          size={30}
                          iconStyle={styles.customIcon}
                        />
                        
                    }
                      {
                          this.props.store.frequency.length === 0 ?
                            <Text style={styles.btnText}>Repeat</Text>
                        :
                            <Text style={this.props.store.frequency.length === 1 ? styles.btnText : styles.dayText}>{this.props.store.frequency.sort((a,b) => a.id > b.id).map((day,i) => `${day.option} `)}</Text>
                      }
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnContainer}
                    onPress={() => navigate('LabelSelect')}
                    >
                  <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                    <View style={styles.customBtns}>
                    { this.props.store.label === '' ?
                      <Icon 
                        name={'label'}
                        color={'white'}
                        size={30}
                        iconStyle={styles.customIcon}
                        /> : 
                        <Icon 
                          name={'check-circle'}
                          color={'#00FF00'}
                          size={30}
                          iconStyle={styles.customIcon}
                        />
                    }
                    <Text style={styles.btnText}>
                            {
                              this.props.store.label === '' ?
                              'Label' :
                              this.props.store.label
                            }
                        </Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
        </View>
        <Modal
            offset={this.state.offset}
            open={this.state.modal}
            modalDidOpen={() => console.log('modal did open')}
            // modalDidClose={() => this.setState({open: false})}
            style={{alignItems: 'center'}}>
                <View style={{alignItems:'center',padding:30,backgroundColor:'#a020f0'}}>
                    <Text style={{color:'white',textAlign:'center',fontWeight:'bold'}}>Time and Charity are required to create an alarm.</Text>
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
  },
  customBtns: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight:20,
    paddingLeft:20,
    flexDirection:'row'
  },
  btnContainer:{
    flexGrow:1,
  },
  btnText: {
    color: 'white',
    fontSize:30,
  },
  smallerText: {
    color:'white',
    fontSize:20,
    width: '80%',
    textAlign:'center'
  },
  dayText: {
    fontSize:20,
    color:'white',
    width:'80%',
    textAlign:'center'
  },
  customIcon: {
    marginRight:20
  },
  linearGradient:{
    borderRadius:10,
    margin:10,
  }
});

export default connect(AddAlarm, Context)