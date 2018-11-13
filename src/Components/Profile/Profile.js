import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image,TextInput,Linking,ActivityIndicator
} from 'react-native';


import {Header,Badge,Icon} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import Modal from 'react-native-simple-modal'





class Profile extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            editName:false,
            editEmail:false,
            editPassword:false,
            banner:false,
            blank:false,
            noMatch:false,
            invalid:false
        }
    }

    componentDidMount(){
        this.props.checkAuth()
        this.props.getInvoices(this.props.store.me.snoozer_customerId)
    }

    editInfo = (item) => {
        if(item === 'name'){
            this.setState({editName:!this.state.editName})
        }
        else if(item === 'email'){
            this.setState({editEmail:!this.state.editEmail})
        }
        else{
            this.setState({editPassword:!this.state.editPassword})
        }
    }

    verifyPasswordFormat = (pass) => {
        var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
        return re.test(String(pass))
    }

    saveChanges = () => {
        const deets = this.props.store
        if(deets.accountPassword !== '' && deets.accountPassword !== deets.accountPasswordConfirm){
            this.setState({noMatch: true})
            setTimeout(() => this.setState({noMatch:false}),2000)
            console.log('passwords dont match send name and email')
        }
        else if(deets.accountName === ''){
            this.setState({blank:true})
            setTimeout(() => this.setState({blank:false}),2000)
            console.log('blank name send nothing')
        }
        else{
            if(this.verifyPasswordFormat(deets.accountPassword) === true){
                const payload ={
                    name:deets.accountName,
                    email:deets.accountEmail,
                    password:deets.accountPassword,
                    confirm:deets.accountPasswordConfirm
                }
                this.setState({editPassword:false,editEmail:false,editName:false})
                console.log(payload)
                this.props.clearPasswordInfo()
                this.props.updateProfileDetails(payload)
            }
            else{
                this.setState({invalid:true})
            }
        }
        
    }

    add = (y, z) => {
        return y + z
    }
    calculate = (a) => {
        console.log('A',a)
        const amounts = a.map(x => parseInt(x.amount))
        const result = amounts.reduce(this.add, 0)
        return result
    }

    render() {
        const {navigate} = this.props.navigation
        const test =[12,12,12,12,12]
        return (
            <View style={styles.container}>
                <ScrollView style={{flex:1}}>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{alignItems:'center'}}>
                            <Image 
                                source={require('../../images/whitecircle.png')}
                                resizeMode='cover'
                                style={styles.image}
                            />
                            <Text style={styles.title}>{this.props.store.me.email}</Text>
                            {
                                this.state.editName || this.state.editPassword || this.state.editEmail ?
                                    <TouchableOpacity
                                        style={{borderRadius:25,marginTop:10}}
                                        onPress={() => this.saveChanges()}>
                                        <Badge containerStyle={{ padding:20,backgroundColor: 'transparent',borderColor:'white',borderWidth:1}}>
                                            <Text style={{color:'white'}}>Save Changes</Text>
                                        </Badge>
                                    </TouchableOpacity> : null
                            }
                        </View>
                    </LinearGradient>
                    <View style={{marginTop:15,padding:15}}>
                        {<Text style={{color:'red',fontWeight:'bold'}}>{this.props.store.me.emailVerificationPending ? 'New email requires verification to be changed' : null}</Text>}
                        {<Text style={{color:'red',fontWeight:'bold'}}>{this.state.noMatch ? 'Passwords do not match' : this.state.blank ? 'Name cannot be blank' : null}</Text>}
                        {<Text style={{color:'red',fontWeight:'bold'}}>{this.state.invalid ? 'Password must be at least 8 characters long, have 1 capital,1 lowercase, 1 digit and 1 special character.' : null}</Text>}
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Personal Details</Text>
                        </View>
                        {
                            this.state.editName ?
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                    <Icon 
                                        name={'account-circle'}
                                        color={'#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <TextInput 
                                        value={this.props.store.accountName}
                                        onChangeText={(e) => this.props.updateAccountName(e)}
                                        style={{padding:5}}
                                    />
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Icon 
                                            name={'cancel'}
                                            color={'#a020f0'}
                                            size={20}
                                            onPress={() => this.editInfo('name')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                    <Icon 
                                        name={'account-circle'}
                                        color={'#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.accountName}</Text>
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Icon 
                                            name={'edit'}
                                            color={'#a020f0'}
                                            size={20}
                                            onPress={() => this.editInfo('name')}
                                        />
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            this.state.editEmail ?
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                    <Icon 
                                        name='email'
                                        color='#a020f0'
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <TextInput 
                                        value={this.props.store.accountEmail}
                                        onChangeText={(e) => this.props.updateAccountEmail(e)}
                                        style={{padding:5}}
                                    />
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Icon 
                                            name='cancel'
                                            color={this.props.store.me.emailVerificationPending ? 'red' :'#a020f0'}
                                            size={20}
                                            onPress={() => this.editInfo('email')}
                                        />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                    <Icon 
                                        name='email'
                                        color={this.props.store.me.emailVerificationPending ? 'red' : '#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <Text style={{color:this.props.store.me.emailVerificationPending ? 'red' : '#a020f0',fontSize:15}}>{this.props.store.accountEmail}</Text>
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Icon 
                                            name='edit'
                                            color='#a020f0'
                                            size={20}
                                            onPress={() => this.editInfo('email')}
                                        />
                                    </TouchableOpacity>
                                </View>
                        }
                        {
                            this.state.editPassword ? 
                                <View>
                                    <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                        <Icon 
                                            name={'vpn-key'}
                                            color={'#a020f0'}
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <TextInput 
                                            value={this.props.store.accountPassword}
                                            placeholder='Enter New Password'
                                            onChangeText={(e) => this.props.updatePassword(e)}
                                            style={{padding:5}}
                                            secureTextEntry={true}
                                        />
                                        <TouchableOpacity style={{marginLeft:'auto'}}>
                                            <Icon 
                                                name={'cancel'}
                                                color={'#a020f0'}
                                                size={20}
                                                onPress={() => this.editInfo('password')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                        <Icon 
                                            name={'vpn-key'}
                                            color={'#a020f0'}
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <TextInput 
                                            value={this.props.store.accountPasswordConfirm}
                                            placeholder='Confirm New Password'
                                            onChangeText={(e) => this.props.updatePasswordConfirm(e)}
                                            style={{padding:5}}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                </View>
                                :
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                    <Icon 
                                        name={'vpn-key'}
                                        color={'#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <Text style={{color:'#a020f0',fontSize:15}}>Change Password</Text>
                                    <TouchableOpacity style={{marginLeft:'auto'}}>
                                        <Icon 
                                            name={'edit'}
                                            color={'#a020f0'}
                                            size={20}
                                            onPress={() => this.editInfo('password')}
                                        />
                                    </TouchableOpacity>
                                </View>
                        }
                        <TouchableOpacity onPress={() => navigate('Settings')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name={'settings'}
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Account</Text>
                            </View>
                        </TouchableOpacity>
                        { this.props.store.me && this.props.store.me.isAdmin ? 
                            <TouchableOpacity onPress={() => navigate('AdminView')}>
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row',marginTop:40}}>
                                    <Icon 
                                        name='home-account'
                                        type='material-community'
                                        color={'#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                    <Text style={{color:'#a020f0',fontSize:15}}>Admin</Text>
                                </View>
                            </TouchableOpacity> : null
                        }
                    </View>

                    <TouchableOpacity onPress={() => navigate('Receipts')} style={{marginTop:15,padding:15}}>
                        <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                            <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Donations Made</Text>
                        </View>
                        { this.props.store.me.Donations.length === 0 ?
                            <View  style={styles.lastItem}>
                                <Icon 
                                    name={'favorite-border'}
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>No Donations</Text>
                            </View>
                            :
                            <View style={styles.lastItem}>
                                <Icon 
                                    name={'favorite'}
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:14}}>{`You've made ${this.props.store.me.Donations.length} donations!`}</Text>
                                <View style={{marginLeft:'auto'}}>
                                    <Badge containerStyle={{backgroundColor: '#a020f0',borderColor:'white',}}>
                                        <Text style={{color:'white'}}>{`$${this.calculate(this.props.store.me.Donations).toFixed(2)}`}</Text>
                                    </Badge>
                                </View>
                            </View>
                        }
                    </TouchableOpacity>
                    <View style={{marginTop:15,padding:15}}>
                        { this.props.store.me.Charities.length === 0 ?
                            <TouchableOpacity onPress={() => Linking.openURL('http://sleepywebsite.s3-website-us-east-1.amazonaws.com/')}>
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Visit our website</Text>
                                    <Icon 
                                        name={'touch-app'}
                                        color={'#a020f0'}
                                        size={20}
                                        iconStyle={{marginRight:10}}
                                    />
                                </View>
                                <View  style={styles.lastItem2}>
                                    <Text style={{color:'#a020f0',fontSize:15,textAlign:'center'}}>Do you work for an organization that can benefit from Mr. Sleepy? Click here and visit our website to join our group of charities and organizations</Text>
                                </View>
                            </TouchableOpacity>
                            :
                            this.props.store.me.Charities.map((t,i,array) => 
                                <View key={i}>
                                    <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                                        <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Your Charity</Text>
                                    </View>
                                    <View key={i} style={i === array.length -1 ? styles.lastItem : styles.listItem}>
                                        <Icon 
                                            name={'account-balance'}
                                            color={'#a020f0'}
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'#a020f0',fontSize:15}}>{t.name}</Text>
                                        {/*<View style={{marginLeft:'auto'}}>
                                            <Badge containerStyle={{backgroundColor: '#a020f0',borderColor:'white',}}>
                                                <Text style={{color:'white'}}>{array.length}</Text>
                                            </Badge>
                                        </View>*/}
                                    </View>
                                    <View onPress={() => Linking.openURL(this.props.store.websiteUrl)} style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                                        <Text style={{textAlign:'center',color:'#a020f0'}}>Manage charity here</Text>
                                        <Icon 
                                            name={'touch-app'}
                                            color={'#a020f0'}
                                            size={20}
                                            iconStyle={{marginLeft:5}}
                                        />
                                    </View>
                                </View>
                            )
                        }
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
                    modalDidClose={() => this.props.loadMe(this.props.store.token)}
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
                    open={this.props.store.loading}
                    overlayStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        flex: 1
                    }}
                >     
                    {  
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <View style={{backgroundColor:'#a020f0',padding:50}}>
                                {this.props.store.detailsChanged ? null : <ActivityIndicator size="large" color="white" />}
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
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop:22
    },
    linearGradient:{
        height:230,
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
        width:100,
        shadowColor: 'white',
        shadowOpacity: 1,
        shadowRadius: 5
    },
    listItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:0,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    },
    lastItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    },
    lastItem2:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    }
})

export default connect(Profile, Context)