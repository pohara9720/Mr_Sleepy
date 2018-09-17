import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,ScrollView,
 Navigator,KeyboardAvoidingView,TouchableOpacity,ActivityIndicator,Linking
} from 'react-native';

import { FormLabel, FormInput,Button, Header,SearchBar,Icon } from 'react-native-elements'
import Modal from "react-native-simple-modal"
import { StackNavigator } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios'
import logo from '../../images/whitecircle.png'
import connect from '../HOC'
import { Context } from '../../../App'


class Login extends Component<{}> { 
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password:'',
            name:'',
            error:false,
            login:true
        }
    }

    authenticate = () => {
        if(this.state.email === '' || this.state.password === ''){
            this.setState({error:true})
            setTimeout(() => this.setState({error:true}),2500)
        }
        else{
            this.props.login(this.state.email,this.state.password)
        }
        
    }

    closeToLogin = () => {
        this.props.toggleLoading()
        this.setState({login:true})
    }

    signup = () => {
        if(this.state.name === '' || this.state.password === '' || this.state.email === ''){
            this.setState({error:true})
            setTimeout(() => this.setState({error:true}),2500)
        }
        else{
            this.props.signup(this.state.name,this.state.email,this.state.password)
        }
    }

    render() {
        // const { navigate } = this.props.navigation
        return (
            <LinearGradient  colors={[ '#a020f0', '#c679f6', '#7016a8']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                {
                    this.state.login ?
                        <KeyboardAvoidingView behavior='position' enabled>
                            <ScrollView containerStyle={{display:'flex',flexDirection:'column',flex:1}}>
                                <View style={{justifyContent:'center',alignItems:'center',paddingTop:'15%'}}>
                                    <Image source={require('../../images/whitetext.png')} resizeMode='contain' style={{height:60,marginBottom:20}}/>
                                    <Image source={require('../../images/whitecircle.png')} resizeMode='contain' style={{height:150}}/>
                                </View>
                                <View style={styles.authBox}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold',paddingLeft:10,fontSize:25,marginBottom:5}}>Login</Text>
                                    <SearchBar 
                                        raised
                                        noIcon
                                        value={this.state.email}
                                        onChangeText={(e) => this.setState({email:e})}
                                        // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                        inputStyle={this.state.error ? styles.errorInput : styles.input}
                                        placeholder='Email'
                                        placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                        containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                    />
                                    <View>
                                        <SearchBar 
                                            raised
                                            noIcon
                                            onChangeText={(e) => this.setState({password:e})}
                                            // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                            inputStyle={this.state.error ? styles.errorInput : styles.input}
                                            placeholder='Password'
                                            secureTextEntry
                                            placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10}}
                                        />
                                        <Text onPress={() => console.log('forgot')} style={{color:'#a020f0',fontSize:12,marginLeft:'auto',paddingRight:10,marginBottom:10}}>Forgot Password?</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.authenticate()} style={styles.button}>
                                        <Text style={{color:'white',fontWeight:'bold'}} >Login</Text>
                                    </TouchableOpacity>
                                    <Text style={{color:'red',textAlign:'center',marginTop:3}}>{this.props.store.verifiedError ? 'Email has not been verified' : this.props.store.credError ? 'Credentials are invalid' : null}</Text>
                                </View>
                                <View style={styles.switch}>
                                    <Text style={{color:'white',fontSize:18,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:false})}>New User? <Text style={{textDecorationLine:'underline'}}>Sign up here</Text></Text>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                        :
                        <KeyboardAvoidingView behavior='position' enabled>
                            <ScrollView containerStyle={{display:'flex',flexDirection:'column',flex:1}}>
                                <View>
                                    <View  style={styles.logo}>
                                        <Image source={logo} resizeMode='cover' style={{height:100,width:100,marginBottom:20}} />
                                        <Text style={{color:'white',textAlign:'center'}}>Change the world in your sleep with Mr. Sleepy. The alarm clock that donates a dollar to a charity of your choice when you Snooze!</Text>
                                    </View>
                                </View>
                                <View style={styles.authBox2}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold',paddingLeft:10,fontSize:25,marginBottom:5}}>Sign up</Text>
                                    <SearchBar 
                                        // raised
                                        noIcon
                                        value={this.state.name}
                                        onChangeText={(e) => this.setState({name:e})}
                                        // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                        inputStyle={this.state.error ? styles.errorInput : styles.input}
                                        placeholder='Name'
                                        placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                        containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                    />
                                    <SearchBar 
                                        // raised
                                        noIcon
                                        onChangeText={(e) => this.setState({email:e})}
                                        // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                                        inputStyle={this.state.error ? styles.errorInput : styles.input}
                                        placeholder='Email'
                                        placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                        containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:10,marginBottom:10}}
                                    />
                                    <SearchBar 
                                        raised
                                        noIcon
                                        onChangeText={(e) => this.setState({password:e})}
                                        // icon={{ type: 'material-community', name: 'key',color:'#a020f0',marginTop:20}}
                                        inputStyle={this.state.error ? styles.errorInput : styles.input}
                                        placeholder='Password'
                                        secureTextEntry
                                        placeholderTextColor={ this.state.error ? 'red' : '#a020f0'}
                                        containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                    />
                                    <TouchableOpacity onPress={() => this.signup()} style={styles.button}>
                                        <Text style={{color:'white',fontWeight:'bold'}}>Sign up</Text>
                                    </TouchableOpacity>
                                    <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                                        <Text style={{color:'#a020f0',width:'90%',textAlign:'center'}}>By signing up you agree to our <Text style={{textDecorationLine:'underline'}}>Terms & Conditions</Text> and <Text style={{textDecorationLine:'underline'}}>Privacy Policy</Text></Text>
                                    </View>
                                </View>
                                <View style={styles.switch}>
                                    <Text style={{color:'white',fontSize:15,width:'90%',textAlign:'center'}} onPress={() => this.setState({login:true})}>Already have an account? <Text style={{textDecorationLine:'underline'}}>Login here</Text></Text>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                }
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={false}
                    modalDidClose={() => this.props.resetLoginModal()}
                    containerStyle={{
                      justifyContent: "center",
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                      backgroundColor: this.props.store.signupSent ? "white" : this.props.store.emailExists ? 'white' : "#a020f0",
                      borderRadius:10,  
                      borderColor:'#a020f0',
                    }}
                    offset={0}
                    open={this.props.store.loading}
                    overlayStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
                      flex: 1
                    }}
                >     
                    {
                      this.props.store.signupSent ? 
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                          <View style={{backgroundColor:'#00ff41',padding:50,width:'100%'}}>
                                <Icon 
                                  color='white'
                                  size={70}
                                  type='material-community'
                                  name='checkbox-marked-circle-outline' 
                                  iconStyle={{marginBottom:20}}
                                />
                                <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Email has been sent!</Text>
                                <TouchableOpacity style={{borderRadius:10,padding:10,marginBottom:10,marginTop:10,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'transparent',borderWidth:1,borderColor:'white'}}>
                                    <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>Resend Link</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{borderRadius:10,padding:10,width:'100%',justifyContent:'center',alignItems:'center',backgroundColor:'white',borderWidth:1,borderColor:'#00ff41'}}>
                                    <Text onPress={() => this.closeToLogin()} style={{textAlign:'center',color:'#00ff41'}}>Login</Text>
                                </TouchableOpacity>
                          </View>
                    </View> : 
                    this.props.store.emailExists ?
                      <View style={{alignItems:'center',justifyContent:'center'}}>
                          <View style={{backgroundColor:'red',padding:50,width:'100%'}}>
                                <Icon 
                                  color='white'
                                  size={70}
                                  name='error' 
                                  iconStyle={{marginBottom:20}}
                                />
                                <Text style={{textAlign:'center',color:'white'}}>This email exists. Please use a different email or login</Text>
                          </View>
                    </View>
                    :
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                          <View style={{backgroundColor:'#a020f0',padding:50}}>
                                <ActivityIndicator size="large" color="white" />
                                <Text style={{textAlign:'center',color:'white'}}>Sending Email...</Text>
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
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex:1,
        paddingLeft:20,
        paddingRight:20,
        // fontFamily:'roboto'
        // fontFamily:'Sinhala Sangam MN'
        // justifyContent:'center',
    },
    input:{
        borderRadius:10,
        backgroundColor:'white',
        borderColor:'#a020f0',
        borderWidth:1,
        color:'#a020f0',
        height:40,
    },
    errorInput:{
        borderRadius:10,
        backgroundColor:'white',
        borderColor:'red',
        borderWidth:1,
        color:'#a020f0',
        height:40,
   
    },
    logo:{
        justifyContent:'center',
        alignItems:'center',
        flexGrow:1,
        marginTop:30,
        // borderRadius:300
    },
    authBox:{
        padding:20,
        backgroundColor:'white',
        borderRadius:10,
        flexGrow:1,
        marginTop:10,
        marginBottom:30,
        // shadowColor: 'white',
        // shadowOpacity: 1,
        // shadowRadius: 10
    },
    authBox2:{
        padding:20,
        backgroundColor:'white',
        borderRadius:10,
        flexGrow:1,
        marginTop:30,
        marginBottom:15,
        // shadowColor: 'white',
        // shadowOpacity: 1,
        // shadowRadius: 10
    },
    button:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#a020f0',
        borderRadius:10,
        padding:13,
        marginTop:10,
        marginRight:9,
        marginLeft:9,
        
    },
    image:{
        height:200,
        width:200,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowRadius: 10,
        borderRadius:50
    },
    switch:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexGrow:1
    }
})


export default connect(Login,Context)