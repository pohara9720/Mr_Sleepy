import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,TouchableOpacity,ScrollView
} from 'react-native'


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
    
    componentDidMount(){
        this.props.checkAuth()
    }

    cancelAlarm =() => {
        const backAction = NavigationActions.back({})
        this.props.navigation.dispatch(backAction)
        this.props.cancelAlarm()
    }

    errorMessage = () => {
        this.props.triggerAddErrorModal()
        setTimeout(() => this.props.closeAddErrorModal(),3000)
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
                <Text style={{fontSize:14,color:'#a020f0',justifyContent:"center"}} onPress={() => this.cancelAlarm()}>Cancel</Text>
            )
        }

        const Save = (props) => {
            return(
                <Text style={{fontSize:14,color:'#a020f0',justifyContent:"center"}} onPress={() => this.createAlarm()}>Save</Text>
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
                                                name='watch-later'
                                                color='white'
                                                size={30}
                                                iconStyle={styles.customIcon}
                                            /> :
                                            <Icon 
                                                name='check-circle'
                                                color='#00FF00'
                                                size={30}
                                                iconStyle={styles.customIcon}
                                            />
                                    }
                                    <Text style={styles.btnText}>
                                        {
                                            this.props.store.timeSelect === '' ?
                                                'Time' :
                                                moment(this.props.store.timeSelect).format('h:mm a')
                                        }
                                    </Text>
                                </View>
                                <DateTimePicker
                                    mode='time'
                                    isVisible={this.props.store.datePicker}
                                    onConfirm={(date) => this.props.updateTimeSelect(date,false)}
                                    onCancel={() => this.props.toggleDatePicker()}
                                    is24Hour={false}
                                    titleIOS='Pick Alarm Time'
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
                    open={this.props.store.addErrorModal}
                    overlayStyle={{
                        backgroundColor: "rgba(0, 0, 0, 0.75)",
                        flex: 1
                    }}
                >     
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{backgroundColor:'#a020f0',padding:50}}>
                            <Icon 
                                color='white'
                                type='material-community'
                                size={70}
                                name='heart' 
                                iconStyle={{marginBottom:20}}
                            />
                            <Text style={{textAlign:'center',color:'white'}}>Please select a charity to continue adding this alarm</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:12,backgroundColor:'white',width:'107%',marginBottom:-10,borderBottomLeftRadius:10,borderBottomRightRadius:10}}onPress={() => this.props.closeAddErrorModal()}>
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
})

export default connect(AddAlarm, Context)