import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image,TextInput
} from 'react-native';


import {Header,Badge,Icon} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class Profile extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
          editName:false,
          editEmail:false,
          editPassword:false,
          banner:false
      }
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

    saveChanges = () => {
      this.setState({
          editEmail:false,
          editName:false,
          editPassword:false,
          banner:true
        })
      setTimeout(() => this.setState({banner:false}),2000)
    }

  render() {
    const {navigate} = this.props.navigation
    const test =[12,12,12,12,12]
    return (
      <View style={styles.container}>
              {
                this.state.banner ?
                <View style={{backgroundColor:'#00FF00',justifyContent:'center',alignItems:'center',padding:10,paddingTop:20}}>
                    <Text style={{color:'white',fontWeight:'bold',fontSize:15}}>Changes saved successfully</Text>
                </View> : null
              }
        <ScrollView style={{flex:1}}>
            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
              <View style={{alignItems:'center'}}>
                <Image 
                  source={{uri:'https://i.pinimg.com/736x/22/0c/c2/220cc27703322d06e4eefe9af4c8990c--arianna-grande-ariana-grande-smile.jpg'}}
                  resizeMode='cover'
                  style={styles.image}
                />
                <Text style={styles.title}>{this.props.store.accountEmail}</Text>
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
                        name={'email'}
                        color={'#a020f0'}
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
                            name={'cancel'}
                            color={'#a020f0'}
                            size={20}
                            onPress={() => this.editInfo('email')}
                          />
                      </TouchableOpacity>
                  </View>
                    :
                    <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                      <Icon 
                        name={'email'}
                        color={'#a020f0'}
                        size={20}
                        iconStyle={{marginRight:10}}
                      />
                      <Text style={{color:'#a020f0',fontSize:15}}>{this.props.store.accountEmail}</Text>
                      <TouchableOpacity style={{marginLeft:'auto'}}>
                          <Icon 
                            name={'edit'}
                            color={'#a020f0'}
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
                      <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
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
                    <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,padding:15,flexDirection:'row'}}>
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
              </View>

              <View style={{marginTop:15,padding:15}}>
                  <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                      <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Donations Made</Text>
                  </View>
                  { this.props.store.donations.length === 0 ?
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
                    this.props.store.donations.map((t,i,array) => 
                      <View key={i} style={i === array.length -1 ? styles.lastItem : styles.listItem}>
                          <Icon 
                            name={'favorite'}
                            color={'#a020f0'}
                            size={20}
                            iconStyle={{marginRight:10}}
                          />
                          <Text style={{color:'#a020f0',fontSize:15}}>{t.name}</Text>
                          <View style={{marginLeft:'auto'}}>
                              <Badge containerStyle={{backgroundColor: '#a020f0',borderColor:'white',}}>
                                  <Text style={{color:'white'}}>{array.length}</Text>
                              </Badge>
                          </View>
                      </View>
                    )
                  }
              </View>
              <View style={{marginTop:15,padding:15}}>
              { this.props.store.accountCharities.length === 0 ?
                <TouchableOpacity>
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
                    this.props.store.accountCharities.map((t,i,array) => 
                      <View>
                          <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                              <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Your Organizations</Text>
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
                          <View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
                              <Text style={{textAlign:'center',color:'#a020f0'}}>Manage organizations here</Text>
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
    width:100
  },
  listItem:{
    borderColor:'#a020f0',
    borderWidth:1,
    borderBottomWidth:0,
    padding:15,
    flexDirection:'row'
  },
  lastItem:{
    borderColor:'#a020f0',
    borderWidth:1,
    borderBottomWidth:1,
    padding:15,
    flexDirection:'row'
  },
  lastItem2:{
    borderColor:'#a020f0',
    borderWidth:1,
    borderBottomWidth:1,
    padding:15,
    flexDirection:'row',
    alignItems:'center'
  }
});

export default connect(Profile, Context)