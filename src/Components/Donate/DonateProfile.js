import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,ScrollView,TouchableOpacity,Image,Linking
} from 'react-native'


import {Header,Badge,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import Modal from 'react-native-simple-modal'
import {  Context } from '../../../App'
import connect from '../HOC'




class DonateProfile extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            card:false
        }
    }

    componentDidMount(){
        this.props.checkAuth()
        
    }
    
    clearProfile = () => {
        const backAction = NavigationActions.back({})
        this.props.navigation.dispatch(backAction)
        this.props.clearDonateProfile()
    }

    makeDonation = () => {
        const {navigate} = this.props.navigation
        if(this.props.store.payMethod){
            navigate('MakeDonation')
        }
        else{
            this.setState({card:true})
        }
        
    }

    goToPayments = () => {
        this.setState({card:false})
        const {navigate} = this.props.navigation
        navigate('Payments')
    }

    


    render() {
        // const {navigate} = this.props.navigation
        return (
            <View style={styles.container}> 
                <ScrollView style={{flex:1}}>
                    <View style={{backgroundColor:'#a020f0'}}>
                        <TouchableOpacity
                            style={{marginRight:'auto'}}
                            onPress={() => this.clearProfile()}>
                            <Icon 
                                name={'arrow-back'}
                                color={'white'}
                                size={25}
                                iconStyle={{paddingTop:22,paddingLeft:15}}
                            />
                        </TouchableOpacity>
                    </View>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={{uri:this.props.store.donateProfile.orgImage}}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <Text style={styles.title}>{this.props.store.donateProfile.name}</Text>
                            <TouchableOpacity
                                style={{borderRadius:25,marginTop:10,paddingBottom:20}}
                                onPress={() => this.makeDonation()}>
                                <Badge containerStyle={{ padding:20,backgroundColor: 'transparent',borderColor:'white',borderWidth:1}}>
                                    <Text style={{color:'white'}}>Make a donation</Text>
                                </Badge>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                    <View style={{marginTop:15,padding:15}}>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Basic Info</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`@mailto:${this.props.store.donateProfile.email}`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='email'
                                    color='#a020f0'
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.donateProfile.email}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                            <Icon 
                                name='location-on'
                                color='#a020f0'
                                size={20}
                                iconStyle={{marginRight:10}}
                            />
                            <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.donateProfile.location}</Text>
                        </View>
                        <TouchableOpacity onPress={() => Linking.openURL(`${this.props.store.donateProfile.website}`)}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='language'
                                    color='#a020f0'
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.donateProfile.website}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop:15,padding:15}}>
                        <View style={{borderColor:'#a020f0',borderWidth:1 ,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Summary</Text>
                        </View>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                            <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.donateProfile.bio}</Text>
                        </View>
                    </View>
                </ScrollView>
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
                                type='material-community'
                                size={70}
                                name='heart' 
                                iconStyle={{marginBottom:20}}
                            />
                            <Text style={{textAlign:'center',color:'white'}}>Please add a payment method to make a donation.</Text>
                        </View>
                        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',padding:12,backgroundColor:'white',width:'107%',marginBottom:-10,borderBottomLeftRadius:10,borderBottomRightRadius:10}} onPress={() => this.goToPayments()}>
                            <Text style={{color:'#a020f0',fontSize:15}}>Okay</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        )
    }
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
})

export default connect(DonateProfile, Context)