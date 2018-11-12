import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView,
    Navigator,KeyboardAvoidingView,TouchableOpacity,TextInput,ActivityIndicator
} from 'react-native'

import { FormLabel, FormInput,Button, Header,SearchBar,PricingCard,Icon } from 'react-native-elements'
import { StackNavigator,NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import connect from '../HOC'
import { Context } from '../../../App'
import Modal from 'react-native-simple-modal'


class MakeDonation extends Component<{}> { 
    constructor(props){
        super(props)
        this.state = {
            donation:'',
            // validCard:false
        }
    }
    

    sendDonation = () => {
        const rx = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/

        if(rx.test(this.state.donation)){
            console.log('valid')
            const parsed = parseInt(this.state.donation)
            console.log(parsed)
            this.props.makeDonation(parsed,this.props.store.donateProfile.id,this.props.store.donateProfile.name)
            this.setState({donation:0})
        }
        else{
            this.setState({donation:10,error:true})
        }
    }

    format = (e) => {
        this.setState({donation:e})
    }

    render() {
        const backAction = NavigationActions.back({})
        const Back = (props) => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }
        const { navigate } = this.props.navigation
        return (
            <View style={styles.linearGradient}>
                <Header
                    leftComponent={<Back />}
                    // centerComponent={{ text: 'Make your donation', style: { color: '',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                <View style={{padding:15,width:'100%',paddingTop:'10%',alignItems:'center',flex:1}}>
                    <Image source={require('../../images/purplecirlce.png')} style={{height:100,width:100,marginBottom:40}}/>
                    <Text style={{color:'#a020f0',textAlign:'center',fontSize:20,fontWeight:'bold'}}>{`How much would you like to donate to ${this.props.store.donateProfile.name}?`}</Text>
                    <TextInput 
                        value={`${this.state.donation}`}
                        onChangeText={(e) => this.format(e)}
                        keyboardType='numeric'
                        style={{padding:15,borderBottomWidth:1,borderBottomColor:'#a020f0',fontSize:30,color:'#a020f0',fontWeight:'bold',width:'100%'}}

                    />
                    {this.state.error ? <Text style={{color:'red',fontWeight:'bold',padding:5,textAlign:'center',fontSize:10}}>That was not a valid dollar amount. Please try again</Text> : null}
                    {
                        this.state.donation === '' ? null :
                            <TouchableOpacity onPress={() => this.sendDonation()} style={{marginTop:30,backgroundColor:'#a020f0',justifyContent:'center',alignItems:'center',flexDirection:'row',padding:15,borderRadius:10,width:'70%'}}>
                                <Icon 
                                    name='heart'
                                    color='white'
                                    type='material-community'
                                />
                                <Text style={{color:'white',marginLeft:8,fontWeight:'bold'}}>{`Send $${this.state.donation} Donation`}</Text>
                            </TouchableOpacity>
                    }
                </View>

                <Modal
                    animationDuration={200}
                    animationTension={40}
                    closeOnTouchOutside={true}
                    modalDidClose={() => navigate('DonateSelect')}
                    containerStyle={{
                        justifyContent: 'center',
                    }}
                    disableOnBackPress={false}
                    // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
                    modalStyle={{
                        backgroundColor: this.props.store.donationMade ? 'white' : '#a020f0',
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
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <View style={{backgroundColor:this.props.store.donationMade ?  '#00ff41' : '#a020f0',padding:50}}>
                                {this.props.store.donationMade ? null : <ActivityIndicator size="large" color="white" />}
                                <Text style={{textAlign:'center',color:'white',fontWeight:'bold'}}>{this.props.store.loadingMessage}</Text>
                            </View>
                        </View>
                    }
                </Modal>
               
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex:1,
        backgroundColor:'white',
        padding:10,
        
    }
})


export default connect(MakeDonation,Context)

