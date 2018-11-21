import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,TouchableOpacity,Image,Linking,ActivityIndicator
} from 'react-native'


import {Badge,Icon,SearchBar} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import Modal from 'react-native-simple-modal'
import PropTypes from 'prop-types'



class ApprovalProfile extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            reason:'',
            alert:false
        }
    }
    
    componentDidMount(){
        this.props.checkAuth()
    }

    clearProfile = () => {
        const backAction = NavigationActions.back({})
        this.props.navigation.dispatch(backAction)
    }

    approve = (id) => {
        console.log(id)
        this.props.approveCharity(id,this.props.navigation.state.params.r.email)
    }

    deny = (id,reason) => {
        console.log(id,reason)
        if(this.state.reason === ''){
            this.setState({alert:true})
        }
        else{
            this.props.rejectCharity(id,reason,this.props.navigation.state.params.r.email)
        }
    }


    render() {
        const {navigate} = this.props.navigation
        const profile = this.props.navigation.state.params.r
        const account = profile.User.connected_accountId
        return (
            <View style={styles.container}> 
                <ScrollView style={{flex:1}}>
                    <View style={{backgroundColor:'#a020f0',display:'flex',flexDirection:'row'}}>
                        <TouchableOpacity
                            style={{marginRight:'auto'}}
                            onPress={() => this.clearProfile()}>
                            <Icon 
                                name='arrow-back'
                                color='white'
                                size={25}
                                iconStyle={{paddingTop:22,paddingLeft:15}}
                            />
                        </TouchableOpacity>
                        { account === null || account === '' ?
                            <TouchableOpacity
                                style={{marginLeft:'auto'}}
                                onPress={() => console.log('DONT ACCEPT')}>
                                <Icon 
                                    name='lan-disconnect'
                                    type='material-community'
                                    color='red'
                                    size={25}
                                    iconStyle={{paddingTop:22,paddingRight:15}}
                                />
                            </TouchableOpacity> :
                            <TouchableOpacity
                                style={{marginLeft:'auto'}}
                                onPress={() => this.approve(profile.id)}>
                                <Icon 
                                    name='approval'
                                    type='material-community'
                                    color='#00ff41'
                                    size={25}
                                    iconStyle={{paddingTop:22,paddingRight:15}}
                                />
                            </TouchableOpacity>
                        }
                        
                    </View>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={{uri:profile.orgImage}}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <Text style={styles.title}>{`${profile.name} (${profile.category})`}</Text>
                            <TouchableOpacity
                                style={{borderRadius:25,marginTop:10,paddingBottom:20}}
                                onPress={() => this.deny(profile.id,this.state.reason)}>
                                <Badge containerStyle={{ padding:20,backgroundColor: 'red',borderColor:'white',borderWidth:1}}>
                                    <Text style={{color:'white'}}>Reject Charity</Text>
                                </Badge>
                            </TouchableOpacity>
                            {this.state.alert ? <Text style={{color:'white'}}>Reason must be given for rejecting a charity</Text> : null}
                        </View>
                    </LinearGradient>
                    <View style={{padding:15}}>
                        <SearchBar 
                            // raised
                            noIcon
                            onChangeText={(e) => this.setState({reason:e})}
                            // icon={{ type: 'material-community', name: 'email-outline',color:'#a020f0'}}
                            inputStyle={styles.input}
                            placeholder={account === null || account === '' ? 'There is no stripe account associated with your ID. Please upload your charity again and complete the stripe onboarding process.' : 'Reason for denial'}
                            placeholderTextColor={'red'}
                            containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0,marginTop:5,marginBottom:10}}
                        />
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Basic Info</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`@mailto:${profile.email}`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name={'email'}
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>{profile.email}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                            <Icon 
                                name={'account-circle'}
                                color={'#a020f0'}
                                size={20}
                                iconStyle={{marginRight:10}}
                            />
                            <Text style={{color:'#a020f0',fontSize:15}}>{profile.location}</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`${profile.website}`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name={'language'}
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>{profile.website}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:15,padding:15}}>
                        <View style={{borderColor:'#a020f0',borderWidth:1 ,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Summary</Text>
                        </View>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                            <Text style={{color:'#a020f0',fontSize:15}}>{profile.bio}</Text>
                        </View>
                    </View>
                </ScrollView>
                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={true}
                    modalDidClose={() => navigate('AdminView')}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor: this.props.store.charityApproved ? 'white' : this.props.store.systemError ? 'white' : '#a020f0',
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
                    {
                        this.props.store.charityApproved ? 
                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <View style={{backgroundColor:'#00ff41',padding:50,width:'100%'}}>
                                    <Icon 
                                        color='white'
                                        size={70}
                                        type='material-community'
                                        name='checkbox-marked-circle-outline' 
                                        iconStyle={{marginBottom:20}}
                                    />
                                    <Text style={{textAlign:'center',color:'white'}}>Success</Text>
                                </View>
                            </View> : 
                            this.props.store.systemError ?
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <View style={{backgroundColor:'red',padding:50,width:'100%'}}>
                                        <Icon 
                                            color='white'
                                            size={70}
                                            name='error' 
                                            iconStyle={{marginBottom:20}}
                                        />
                                        <Text style={{textAlign:'center',color:'white'}}>Call failed</Text>
                                    </View>
                                </View>
                                :
                                <View style={{alignItems:'center',justifyContent:'center'}}>
                                    <View style={{backgroundColor:'#a020f0',padding:50}}>
                                        <ActivityIndicator size="large" color="white" />
                                        <Text style={{textAlign:'center',color:'white'}}>Sending decision...</Text>
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

ApprovalProfile.propTypes = {
    store: p.object,
    systemError:p.bool,
    checkAuth:p.func,
    navigation:p.object,
    dispatch:p.func,
    systemErrorMessage:p.string,
    approveCharity:p.func,
    rejectCharity:p.func
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    linearGradient:{
        height:210,
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
    input:{
        borderRadius:10,
        backgroundColor:'white',
        borderColor:'red',
        borderWidth:1,
        borderBottomWidth:1,
        color:'red',
        height:30,
        width:'95%'
    }
})

export default connect(ApprovalProfile, Context)