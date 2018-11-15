import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,Button,ScrollView,TouchableOpacity,Image,ActivityIndicator
} from 'react-native'


import {Header,Badge,SearchBar,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import LinearGradient from 'react-native-linear-gradient'
import Collapsible from 'react-native-collapsible'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'
import Modal from 'react-native-simple-modal'




class SuperSearch extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            search:'',
            filter:true,
            category:'',
        }
    }


    componentDidMount(){
        this.props.checkAuth()
    }
    
  submit = () => {
      if(this.state.category === 'Charity'){
          this.props.searchCharityEmail(this.state.search)
      }
      else{
          this.props.searchUserEmail(this.state.search)
      }
  }

  doneLoading = () => {
      const {navigate} = this.props.navigation
      navigate('AdminView')
      this.props.resetAdminResults()
  } 


  render() {
      const {navigate} = this.props.navigation
      const backAction = NavigationActions.back({})
      const categories = ['Charity','User']
      const test = []
      const Back = (props) => {
          return(
              <Text
                  style={{fontSize:14,color:'white',justifyContent:"center"}}
                  onPress={() => this.props.navigation.dispatch(backAction)}
              >Back
              </Text>
          )
      }

     
      // console.log(this.props.store.adminSearchResults)
      const e = this.props.store.adminSearchResults
       
      return (
          <View style={styles.container}>
              <Header
                  leftComponent={<Back />}
                  centerComponent={{ text: 'Admin Search', style: { color: 'white',fontSize:22}}}
                  outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
              />
              <View style={styles.search}>
                  <SearchBar
                      round
                      lightTheme
                      onChangeText={(e) => this.setState({search:e})}
                      // onClearText={(e) => this.setState({search:false})}
                      containerStyle={{backgroundColor:'transparent',borderBottomWidth:0,borderTopWidth:0,width:'90%'}}
                      // cancelButtonTitle={'Cancel'}
                      // showLoadingIcon={true}
                      inputStyle={{color:'#a020f0',backgroundColor:'white'}}
                      // clearIcon={this.state.search ? {icon:'cancel',color:'#02E7FE'} : null}
                      icon={{ type: 'font-awesome', name: 'search'}}
                      placeholder='Search by email' 
                  />
                  <Icon
                      name='sort'
                      color='white'
                      iconStyle={{width:'100%'}}
                      onPress={() => this.setState({filter: !this.state.filter})}
                  />
              </View>
              <Collapsible collapsed={this.state.filter}>
                  <View style={{display:'flex',flexDirection:'column'}}>
                      <View style={{display:'flex',flexDirection:'column',padding:10}}>
                          <Text style={{color:'white',fontWeight:'bold'}}>Select category</Text>
                          <View style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                              {
                                  categories.map((c,i) => 
                                      <Badge key={i} onPress={() => c === 'Clear' ? this.setState({category:'',filter:true}) : this.setState({category:c})} containerStyle={ this.state.category === c ? {backgroundColor: '#a020f0',margin:5,borderColor:'white',borderWidth:1} : {backgroundColor: 'white',margin:5,borderWidth:1,borderColor:'transparent'}}>
                                          <Text style={this.state.category === c ? {color:'white',fontWeight:'bold'} : {color:'#a020f0',fontWeight:'bold'}}>{c}</Text>
                                      </Badge>)
                              }
                          </View>
                      </View>
                  </View>
              </Collapsible>
              { this.state.search === '' ? null :
                  <View style={{justifyContent:'center',alignItems:'center',padding:10}}>
                      <TouchableOpacity onPress={() => this.submit()} style={{width:'100%',borderRadius:15,flexDirection:'row',justifyContent:'center',alignItems:'center',padding:10,borderColor:'white',borderWidth:1}}>
                          <Icon 
                              name='search'
                              color='white'
                          />
                          <Text style={{color:'white'}}>Search</Text>
                      </TouchableOpacity>
                  </View>
              }
              <ScrollView style={{flex:1}}>
                  {
                      this.props.store.adminSearchResults === '' ? null :
                          <View>
                              <View style={{margin:5,display:'flex',flexDirection:'column',backgroundColor:'white'}}>
                                  <Text style={{color:'#a020f0',fontSize:20,fontWeight:'bold',padding:10}}>User Info</Text>
                                  <View style={{padding:10,borderBottomWidth:0,flexDirection:'row'}}>
                                      <Icon 
                                          name='account-circle'
                                          color='#a020f0'
                                          size={20}
                                          iconStyle={{marginRight:10}}
                                      />
                                      <Text style={{color:'#a020f0',fontSize:15}}>{e.name}</Text>
                                  </View>
                                  <View style={{padding:10,borderBottomWidth:0,flexDirection:'row'}}>
                                      <Icon 
                                          name='email'
                                          color='#a020f0'
                                          size={20}
                                          iconStyle={{marginRight:10}}
                                      />
                                      <Text style={{color:'#a020f0',fontSize:15}}>{e.email}</Text>
                                  </View>
                                  <View style={{padding:10,borderBottomWidth:0,flexDirection:'row'}}>
                                      <Icon 
                                          name={e.verified === true ? 'check' : 'remove'}
                                          type='font-awesome'
                                          color={e.verified === true ? 'green' : 'red'}
                                          size={20}
                                          iconStyle={{marginRight:10}}
                                      />
                                      <Text style={{color:'#a020f0',fontSize:15}}>Verified</Text>
                                  </View>
                                  <View style={{padding:10,borderColor:'#a020f0',borderBottomWidth:0,flexDirection:'row'}}>
                                      <Icon 
                                          name='key'
                                          type='font-awesome'
                                          color='#a020f0'
                                          size={20}
                                          iconStyle={{marginRight:10}}
                                      />
                                      <Text style={{color:'#a020f0',fontSize:15}}>Snoozer ID</Text>
                                      <Text style={{color:'#a020f0',fontSize:15,marginLeft:'auto'}}>{e.snoozer_customerId}</Text>
                                  </View>
                                  <View style={{padding:10,borderColor:'#a020f0',borderBottomWidth:0,flexDirection:'row'}}>
                                      <Icon 
                                          name='key'
                                          type='font-awesome'
                                          color='#a020f0'
                                          size={20}
                                          iconStyle={{marginRight:10}}
                                      />
                                      <Text style={{color:'#a020f0',fontSize:15}}>Connected Acct.</Text>
                                      <Text style={{color:'#a020f0',fontSize:15,marginLeft:'auto'}}>{e.connected_accountId}</Text>
                                  </View>
                                  <View style={{padding:10,borderColor:'#a020f0',borderBottomWidth:1,width:'100%'}}>
                                      <TouchableOpacity onPress={() => this.props.adminDeleteUser(e.id)} style={{marginTop:20,marginBottom:20,borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                          <Text style={{color:'red'}}>Delete User Account</Text>
                                      </TouchableOpacity>
                                  </View>
                                  <View style={{display:'flex',flexDirection:'column',padding:10}}>
                                      <Text style={{color:'#a020f0',fontSize:20,fontWeight:'bold'}}>Charities</Text>
                                      {
                                          e.Charities.map((c,j) => 
                                              <View key={j} style={{borderColor:'#a020f0',flexDirection:'column',borderBottomWidth:1}}>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='business'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.name}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name={c.active === true ? 'check' : 'remove'}
                                                          color={c.active === true ? 'green' : 'red'}
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:c.active === true ? '#a020f0' : 'red',fontSize:15,width:'90%'}}>{c.active === true ? 'Active' : 'Deactived'}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='email'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.email}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='location-on'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.location}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='filter-list'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.category}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='language'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.website}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='open-book'
                                                          type='entypo'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.subtitle}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='open-book'
                                                          type='entypo'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15,width:'90%'}}>{c.bio}</Text>
                                                  </View>
                                                  { c.active === false ? null :
                                                      <TouchableOpacity onPress={() => this.props.adminDeleteCharity(c.id,e.id)} style={{marginTop:20,marginBottom:20,borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                                          <Text style={{color:'red'}}>Delete Charity</Text>
                                                      </TouchableOpacity> 
                                                  }
                                              </View>
                                          )}
                                  </View>
                                  <View style={{display:'flex',flexDirection:'column',padding:10}}>
                                      <Text style={{color:'#a020f0',fontSize:20,fontWeight:'bold'}}>Donations</Text>
                                      {
                                          e.Donations.map((d,f) => 
                                              <View key={f} style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,flexDirection:'column'}}>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='coin'
                                                          type='material-community'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15}}>{d.amount}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='calendar-check'
                                                          type='material-community'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15}}>{moment(d.createdAt).format('MMM dd YY')}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='receipt'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15}}>{d.invoiceId}</Text>
                                                  </View>
                                                  <View style={{flexDirection:'row',padding:10}}>
                                                      <Icon 
                                                          name='business'
                                                          color='#a020f0'
                                                          size={20}
                                                          iconStyle={{marginRight:10}}
                                                      />
                                                      <Text style={{color:'#a020f0',fontSize:15}}>{d.Charity.name}</Text>
                                                  </View>
                                              </View>
                                          )}
                                  </View>
                              </View>
                          </View>
                  }
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
                      backgroundColor: "rgba(0, 0, 0, 0.75)",
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
    results:{
        display:'flex',
        alignItems:'center',
        marginBottom:15,
        marginTop:10
    },
    linearGradient:{
        borderRadius:10,
        margin:10,
    },
    search:{
        display:'flex',
        flexDirection:'row'
    }
})

export default connect(SuperSearch, Context)