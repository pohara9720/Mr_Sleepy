import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image,TextInput,Linking
} from 'react-native';


import {Header,Badge,Icon,SearchBar} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class ApprovalProfile extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
        reason:'',
        alert:false
      }
    }

    clearProfile = () => {
      const backAction = NavigationActions.back({})
      this.props.navigation.dispatch(backAction)
    }

    approve = (id) => {
      console.log(id)
      this.props.approveCharity(id)
    }

    deny = (id,reason) => {
      console.log(id,reason)
      if(this.state.reason === ''){
          this.setState({alert:true})
      }
      else{
          this.props.rejectCharity(id,reason)
      }
    }


  render() {
    const profile = this.props.navigation.state.params.r
    return (
      <View style={styles.container}> 
        <ScrollView style={{flex:1}}>
            <View style={{backgroundColor:'#a020f0',display:'flex',flexDirection:'row'}}>
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
              <TouchableOpacity
                  style={{marginLeft:'auto'}}
                  onPress={() => this.approve(profile.id)}>
                <Icon 
                    name={'approval'}
                    type={'material-community'}
                    color={'#00ff41'}
                    size={25}
                    iconStyle={{paddingTop:22,paddingRight:15}}
                  />
              </TouchableOpacity>
            </View>
            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
              <View style={{alignItems:'center'}}>
                <Image 
                  source={{uri:profile.image}}
                  resizeMode='cover'
                  style={styles.image}
                />
                <Text style={styles.title}>{profile.name}</Text>
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
                    placeholder='Reason for denial'
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
                      <Text style={{color:'#a020f0',fontSize:15}}>{profile.full}</Text>
                  </View>
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
});

export default connect(ApprovalProfile, Context)