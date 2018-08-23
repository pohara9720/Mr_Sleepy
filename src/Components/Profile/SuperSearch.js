import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header,Badge,SearchBar,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import LinearGradient from 'react-native-linear-gradient'
import Collapsible from 'react-native-collapsible'
import {  Context } from '../../../App'
import connect from '../HOC'





class SuperSearch extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
        search:'',
        filter:true,
        category:'',
        openDetails:'',
        openUp:false
      }
    }



  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const categories = ['Charity','User','Donation']
    
    const Back = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'white',justifyContent:"center"}}
                 onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
              </Text>
            )
     }

     const example = [{
          id:34,
          name:'John Appleseed',
          email:'japple@appl.com',
          customerId: 'cus_aksdhaid813813',
          verified:true,
          pendingDonations: 5,
          Charity:[{
              name: 'Food for the hungry',
              email: 'ffh@foodforhungry.com',
              location: 'Los Angeles',
              website: 'http://www.foodforhungry.com',
              orgImage: 'https://i.pinimg.com/736x/22/0c/c2/220cc27703322d06e4eefe9af4c8990c--arianna-grande-ariana-grande-smile.jpg',
              subtitle: 'This charity is lit',
              bio: 'akdnaksn iasdn aisdn iasdnma isdm aoismd ioamsdoi amdi msadio masodi amsdma osidmaois dmaoisdmaoimsoi masiod maoisd maisod masiod masoid masoid madoi masdoi amsiodm oiasmd aiosmd',
              category: 'Health',
              pendingDonations: 34
          }],
          Donation:[{
              amount: 32,
              donatedOn: 'Aug 12,2018',
              transaction: 'tra_asdasd139423',
              status: 'success',
              charity:'Food for the hungry'
          },{
              amount: 32,
              donatedOn: 'Aug 12,2018',
              transaction: 'tra_asdasd139423',
              status: 'success',
              charity:'Food for the hungry'
          },{
              amount: 32,
              donatedOn: 'Aug 12,2018',
              transaction: 'tra_asdasd139423',
              status: 'success',
              charity:'Food for the hungry'
          }]
     },{
        id:34,
            name:'Margot Robbie',
            email:'margot@gmail.com',
            customerId: 'cus_aksdhaid813813',
            verified:true,
            pendingDonations: 5,
            Charity:[{
                name: 'Food for the hungry',
                email: 'ffh@foodforhungry.com',
                location: 'Los Angeles',
                website: 'http://www.foodforhungry.com',
                orgImage: 'https://i.pinimg.com/736x/22/0c/c2/220cc27703322d06e4eefe9af4c8990c--arianna-grande-ariana-grande-smile.jpg',
                subtitle: 'This charity is lit',
                bio: 'akdnaksn iasdn aisdn iasdnma isdm aoismd ioamsdoi amdi msadio masodi amsdma osidmaois dmaoisdmaoimsoi masiod maoisd maisod masiod masoid masoid madoi masdoi amsiodm oiasmd aiosmd',
                category: 'Health',
                pendingDonations: 34
            }],
            Donation:[{
                amount: 32,
                donatedOn: 'Aug 12,2018',
                transaction: 'tra_asdasd139423',
                status: 'success',
                charity:'Food for the hungry'
            },{
                amount: 32,
                donatedOn: 'Aug 12,2018',
                transaction: 'tra_asdasd139423',
                status: 'success',
                charity:'Food for the hungry'
            },{
                amount: 32,
                donatedOn: 'Aug 12,2018',
                transaction: 'tra_asdasd139423',
                status: 'success',
                charity:'Food for the hungry'
            }]
     }]
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
                onClearText={(e) => this.setState({search:false})}
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
                              <Badge onPress={() => c === 'Clear' ? this.setState({category:'',filter:true}) : this.setState({category:c})} containerStyle={ this.state.category === c ? {backgroundColor: '#a020f0',margin:5,borderColor:'white',borderWidth:1} : {backgroundColor: 'white',margin:5,borderWidth:1,borderColor:'transparent'}}>
                                    <Text style={this.state.category === c ? {color:'white',fontWeight:'bold'} : {color:'#a020f0',fontWeight:'bold'}}>{c}</Text>
                              </Badge>)
                          }
                      </View>
                  </View>
              </View>
        </Collapsible>
        <View style={styles.results}>
            <Text style={{color:'white',fontWeight:'bold'}}>{`12 results`}</Text>
        </View>
        <ScrollView style={{flex:1}}>
                  {
                    example.map((e,i) => 
                      <View>
                          <Card>
                              <CardTitle 
                                title={e.name} 
                                subtitle={e.email}
                                style={{color:'#a020f0'}}
                               />
                              <CardAction 
                                separator={true} 
                                inColumn={false}>
                                      <CardButton
                                        onPress={() => this.setState({openDetails:e.id, openUp:!this.state.openUp})}
                                        title={'Show More'}
                                        color='#a020f0'

                                      />
                                      <CardButton
                                        onPress={() => this.setState({openDetails:e.id,openUp:!this.state.openUp})}
                                        title="Delete User"
                                        color='red'
                                      />
                              </CardAction>
                        </Card>
                        <Collapsible collapsed={this.state.openDetails === e.id && this.state.openUp === true ? false : true}>
                              <View style={{margin:5,display:'flex',flexDirection:'column',backgroundColor:'white'}}>
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
                                  <View style={{padding:10,borderColor:'#a020f0',borderBottomWidth:1,flexDirection:'row'}}>
                                        <Icon 
                                              name='key'
                                              type='font-awesome'
                                              color='#a020f0'
                                              size={20}
                                              iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'#a020f0',fontSize:15}}>Customer ID</Text>
                                        <Text style={{color:'#a020f0',fontSize:15,marginLeft:'auto'}}>{e.customerId}</Text>
                                  </View>
                                  <View style={{display:'flex',flexDirection:'column',padding:10}}>
                                <Text style={{color:'#a020f0',fontSize:20,fontWeight:'bold'}}>Charities</Text>
                                  {
                                    e.Charity.map((c,i) => 
                                          <View style={{borderColor:'#a020f0',flexDirection:'column',borderBottomWidth:1}}>
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
                                              <TouchableOpacity style={{marginTop:20,marginBottom:20,borderColor:'red',borderWidth:1,justifyContent:'center',alignItems:'center',padding:10}}>
                                                    <Text style={{color:'red'}}>Delete Charity</Text>
                                              </TouchableOpacity>
                                        </View>
                                    )}
                              </View>
                              <View style={{display:'flex',flexDirection:'column',padding:10}}>
                                <Text style={{color:'#a020f0',fontSize:20,fontWeight:'bold'}}>Donations</Text>
                                  {
                                    e.Donation.map((d,i) => 
                                          <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:1,flexDirection:'column'}}>
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
                                                  <Text style={{color:'#a020f0',fontSize:15}}>{d.donatedOn}</Text>
                                              </View>
                                              <View style={{flexDirection:'row',padding:10}}>
                                                  <Icon 
                                                        name='receipt'
                                                        color='#a020f0'
                                                        size={20}
                                                        iconStyle={{marginRight:10}}
                                                  />
                                                  <Text style={{color:'#a020f0',fontSize:15}}>{d.transaction}</Text>
                                              </View>
                                              <View style={{flexDirection:'row',padding:10}}>
                                                  <Icon 
                                                        name={d.status ==='success' ? 'check' : 'clear'}
                                                        color={d.status === 'success' ? 'green' : 'red'}
                                                        size={20}
                                                        iconStyle={{marginRight:10}}
                                                  />
                                                  <Text style={{color:'#a020f0',fontSize:15}}>{d.status}</Text>
                                              </View>
                                              <View style={{flexDirection:'row',padding:10}}>
                                                  <Icon 
                                                        name='business'
                                                        color='#a020f0'
                                                        size={20}
                                                        iconStyle={{marginRight:10}}
                                                  />
                                                  <Text style={{color:'#a020f0',fontSize:15}}>{d.charity}</Text>
                                              </View>
                                        </View>
                                    )}
                              </View>
                              </View>
                      </Collapsible>
                    </View>
                  )}
        </ScrollView>
      </View>
    );
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
    marginBottom:15
  },
  linearGradient:{
    borderRadius:10,
    margin:10,
  },
  search:{
      display:'flex',
      flexDirection:'row'
  }
});

export default connect(SuperSearch, Context)