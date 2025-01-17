import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,TouchableOpacity,ActivityIndicator
} from 'react-native'


import {Header,Icon} from 'react-native-elements'
import { CreditCardInput } from 'rn-credit-card-view'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import Modal from 'react-native-simple-modal'
import PropTypes from 'prop-types'



class Payments extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            edit:false,
            values:'',
            error:false
        }
    }

    componentDidMount(){
        this.props.checkAuth()
        
        // this.props.getCustomerPayment(this.props.store.me.snoozer_customerId)
    }
    
    _onChange = (form) => {
        this.setState({values:form})
    }
    validate = () => {
        const values = this.state.values.values
        if(this.state.values.valid === true){
            this.props.loading(true)
            this.props.addCard(values)
        }
        else{
            this.setState({error:true})
            setTimeout(() => this.setState({error:false}),2000)
        }
    }

    componentWillUnmount(){
        this.setState({values:''})
    }

    render() {
        console.log(this.state)
        const {navigate} = this.props.navigation
        const c = this.props.store.payMethod
        const Edit = () => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.setState({edit:!this.state.edit})}>
                    {this.state.edit ? 'Done' : 'Edit'}
                </Text>
            )
        }

        const Save = () => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.validate()}>
                    {this.state.values === '' ? '' : 'Save'}
                </Text>
            )
        }
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={this.props.store.payMethod === null || this.props.store.payMethod === '' ? null : <Edit />}
                    rightComponent={<Save />}
                    centerComponent={{ text: 'Manage Payments', style: {fontSize:22,color:'#a020f0'}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                {
                    this.state.error ? 
                        <View style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'red',padding:15}}>
                            <Text style={{color:'white',fontWeight:'bold'}}>One or more fields is invalid</Text>
                        </View> : null
                }
                <ScrollView style={{flex:1,padding:15}}>
                    <CreditCardInput 
                        requiresName={true}
                        onChange={this._onChange}
                        allowScroll={true}
                        placeholderColor={'grey'}
                        inputContainerStyle={{padding:2,borderBottomColor:'#a020f0',borderBottomWidth: 1}}
                        inputStyle={{color:'#a020f0'}}
                        labelStyle={{color:'#a020f0'}}
                    />
                    <Text style={{color:'#a020f0', fontSize:18,fontWeight:'bold',marginTop:20}}>Account Payment Method</Text>
                    {
                        this.props.store.payMethod === null || this.props.store.payMethod === '' ?

                            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                                <View style={styles.customBtns}>
                                    <Icon 
                                        name={'credit-card-off'}
                                        type={'material-community'}
                                        size={40}
                                        color={'white'}
                                        iconStyle={styles.customIcon}
                                    />
                                    <Text style={styles.btnText}>No payment methods have been added</Text> 
                                </View>
                            </LinearGradient> :
                            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                                <View style={{padding:15}}>
                                    <View style={{marginBottom:15,flexDirection:'row'}}>
                                        <View>
                                            <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingBottom:5,textDecorationLine:'underline'}}>Account Name</Text>
                                            <Text style={{color:'white',fontSize:20}}>{c.name}</Text>
                                        </View>
                                        { this.state.edit ? 
                                            <TouchableOpacity style={{marginLeft:'auto'}}>
                                                <Icon 
                                                    name={'remove-circle'}
                                                    color={'red'}
                                                    size={30}
                                                    onPress={() => this.props.deleteCard(this.props.store.me.snoozer_customerId,c.id)}
                                                />
                                            </TouchableOpacity> : null
                                        }
                                    </View>
                                    <View style={{marginBottom:15}}>
                                        <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingBottom:5,textDecorationLine:'underline'}}>Card Number</Text>
                                        <Text style={{color:'white',fontSize:23}}>{`**** **** **** ${c.last4}`}</Text>
                                    </View>
                                    <View style={{marginBottom:15,flexDirection:'row'}}>
                                        <View style={{flexGrow:1}}>
                                            <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingBottom:5,textDecorationLine:'underline'}}>Expiration Date</Text>
                                            <Text style={{color:'white',fontSize:20}}>{`${c.exp_month}/${c.exp_year}`}</Text>
                                        </View>
                                        <View style={{flexGrow:1}}>
                                            <Text style={{color:'white',fontSize:12,fontWeight:'bold',paddingBottom:5,textDecorationLine:'underline'}}>Card Type</Text>
                                            <Text style={{color:'white',fontSize:20}}>{c.brand}</Text>
                                        </View>
                                    </View>
                                </View>
                            </LinearGradient>
                    }
                  
                </ScrollView>
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={true}
                    modalDidClose={() => navigate('Alarms')}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor: this.props.store.cardAdded ? 'white' : this.props.store.cardError ? 'white' : '#a020f0',
                        borderRadius:10,  
                        borderColor:'#a020f0',
                    }}
                    offset={0}
                    open={this.props.store.loading}
                    overlayStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        flex: 1
                    }}
                >     
                    {   this.props.store.cardDeletion ? 
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <View style={{backgroundColor:'#a020f0',padding:50}}>
                                <ActivityIndicator size="large" color="white" />
                                <Text style={{textAlign:'center',color:'white'}}>{this.props.store.loadingMessage}</Text>
                            </View>
                        </View>
                        :
                        this.props.store.cardAdded ? 
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <View style={{backgroundColor:'#00ff41',padding:50}}>
                                    <Icon 
                                        color='white'
                                        size={70}
                                        type='material-community'
                                        name='checkbox-marked-circle-outline' 
                                        iconStyle={{marginBottom:20}}
                                    />
                                    <Text style={{textAlign:'center',color:'white'}}>Your card has been successfully added!</Text>
                                </View>
                            </View> : 
                            this.props.store.cardError ?
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <View style={{backgroundColor:'red',padding:50}}>
                                        <Icon 
                                            color='white'
                                            size={70}
                                            name='error' 
                                            iconStyle={{marginBottom:20}}
                                        />
                                        <Text style={{textAlign:'center',color:'white'}}>Your card has been successfully added!</Text>
                                    </View>
                                </View>
                                :
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <View style={{backgroundColor:'#a020f0',padding:50}}>
                                        <ActivityIndicator size="large" color="white" />
                                        <Text style={{textAlign:'center',color:'white'}}>Adding your card...</Text>
                                    </View>
                                </View>
                    }
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


const p = PropTypes

Payments.propTypes = {
    store: p.object,
    systemError:p.bool,
    checkAuth:p.func,
    navigation:p.object,
    dispatch:p.func,
    systemErrorMessage:p.string,
    deleteCard:p.func,
    loading:p.func,
    addCard:p.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    linearGradient:{
        borderRadius:10,
        marginTop:10
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

export default connect(Payments, Context)