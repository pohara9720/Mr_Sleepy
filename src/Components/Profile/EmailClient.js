import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,Button,ScrollView,TouchableOpacity,Image,ActivityIndicator,TextInput,KeyboardAvoidingView
} from 'react-native'


import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import { Context } from '../../../App'
import connect from '../HOC'
import Modal from 'react-native-simple-modal'




class EmailClient extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            everybody:false,
            recipient:'',
            message:'',
            subject:'',
            invalid:false
        }
    }


    componentDidMount(){
        this.props.checkAuth()
    }


    verifyEmailFormat = (email) => {
        var re = /^(([^<>()\[\]\\.,:\s@']+(\.[^<>()\[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }
    
    submit = () => {
        let payload 
        if(this.state.everybody){
            payload = {
                recipient:'Everybody',
                message:this.state.message,
                subject:this.state.subject
            }
            
        }
        else{
            if(this.verifyEmailFormat(this.state.recipient) === true){
                payload = {
                    recipient:this.state.recipient,
                    message:this.state.message,
                    subject:this.state.subject
                }
            }
            else{
                this.setState({invalid:true})
            }
        }
        this.props.sendAdminEmail(payload)
    }

    doneLoading = () => {
        const {navigate} = this.props.navigation
        navigate('AdminView')
        this.setState({everybody:false,recipient:'',subject:'',message:''})
    } 


    render() {
        const {navigate} = this.props.navigation
        const backAction = NavigationActions.back({})
        const Back = (props) => {
            return(
                <Text
                    style={{fontSize:14,color:'white',justifyContent:'center'}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }


        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Back />}
                    centerComponent={{ text: 'Email Client', style: { color: 'white',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                <KeyboardAvoidingView behavior='padding' style={styles.search}>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:30}}>
                        <Text style={{color:'white',fontWeight:'bold',paddingBottom:5}}>Send Email to...</Text>
                        <TouchableOpacity onPress={() => this.setState({everybody:!this.state.everybody})} style={{marginLeft:'auto',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Icon
                                name={this.state.everybody ? 'person' :'account-group'}
                                type={this.state.everybody ? null : 'material-community'}
                                color='white'
                            />
                            <Text style={{color:'white'}}>{this.state.everybody ? 'Individual' : 'Everybody'}</Text>
                        </TouchableOpacity>
                    </View>
                    { this.state.everybody ? 
                        <View style={{justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,backgroundColor:'white'}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold'}}>Sending to entire database</Text>
                        </View> : 
                        <TextInput 
                            style={styles.input}
                            placeholder='Email Address'
                            value={this.state.recipient}
                            onChangeText={(e) => this.setState({recipient:e})}
                        />
                    }
                    {this.state.invalid ? <Text style={{color:'white',fontWeight:'bold'}}>Invalid email</Text> : null}
                    <Text style={{color:'white',fontWeight:'bold',paddingBottom:5,paddingTop:30}}>Message Subject</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Subject'
                        value={this.state.subject}
                        onChangeText={(e) => this.setState({subject:e})}
                    />
                    <Text style={{color:'white',fontWeight:'bold',paddingBottom:5,paddingTop:30}}>Message Body</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Message'
                        multiline={true}
                        value={this.state.message}
                        onChangeText={(e) => this.setState({message:e})}

                    />
                </KeyboardAvoidingView>
                <View style={{padding:10,marginTop:40,justifyContent:'flex-end'}}>
                    <TouchableOpacity style={{padding:10,width:'100%',backgroundColor:'white',alignItems:'center',justifyContent:'center',borderRadius:15}} onPress={() => this.submit()}>
                        <Text style={{color:'#a020f0',fontWeight:'bold'}}>Send Email</Text>
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
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={true}
                    modalDidClose={() => this.doneLoading()}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor:'#a020f0',
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
                    <View style={{alignItems:'center',justifyContent:'center'}}>
                        <View style={{backgroundColor:'#a020f0',padding:50}}>
                            <ActivityIndicator size="large" color="white" />
                            <Text style={{textAlign:'center',color:'white'}}>{this.props.store.loadingMessage}</Text>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a020f0',
    },
    search:{
        padding:10,
        // height:'70%'
    },
    input:{
        backgroundColor:'white',
        padding:10,
        color:'#a020f0',
        borderRadius:10,
    }
})

export default connect(EmailClient, Context)