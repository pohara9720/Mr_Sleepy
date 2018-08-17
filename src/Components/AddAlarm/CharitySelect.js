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





class CharitySelect extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
        search:'',
        filter:true,
        category:''
      }
    }

    viewProfile = (object) => {
      console.log(object)
        const {navigate} = this.props.navigation
        navigate('CharityProfile')
        this.props.fillCharityProfile(object)
    }


  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const categories = ['Animal','Environmental','Health','Education','Art & Culture','International','Religious','Community Development','Human Services','Children','Clear']
    
    const searchedCharities = this.props.store.charityList.filter(x => x.name.toLowerCase().includes(this.state.search.toLowerCase()) || x.location.toLowerCase().includes(this.state.search.toLowerCase())) 
    // const locationFilter = searchedCharities.filter(x => x.location.toLowerCase.includes(this.state.search.toLowerCase()))
    const Back = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'white',justifyContent:"center"}}
                 onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
              </Text>
            )
     }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            centerComponent={{ text: 'Select Charity', style: { color: 'white',fontSize:22}}}
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
                placeholder='Filter by name or location' 
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
            <Text style={{color:'white',fontWeight:'bold'}}>{`${searchedCharities.length} results`}</Text>
        </View>
        <ScrollView style={{flex:1,padding:15}}>
            { this.props.store.charityList.length === 0 ?
              <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                  <View style={{padding:10,alignItems:'center'}}>
                      <View>
                          <Text style={{color:'white',fontSize:22,textAlign:'center'}}>We are working hard to get charities added to the list!</Text>
                      </View>
                  </View>
              </LinearGradient>
              :
              searchedCharities.map((l,i) => 
                <View style={{borderRadius:10}}>
                  <TouchableOpacity 
                      key={i}
                      style={{borderRadius:10}}
                      onPress={() => this.viewProfile(l)}>
                      <Card
                        mediaSource={{uri:l.image}}
                        style={{
                          borderRadius:10,
                          shadowColor: 'white',
                          shadowOpacity: 1,
                          position:'relative',
                          shadowRadius: 10,borderRadius:10}}
                        >
                          <CardTitle  
                              title={l.name} 
                              subtitle={l.short} 
                              style={{borderRadius:10}}/>
                      </Card>
                      <View style={{position:'absolute',top:0,right:0,margin:20,zIndex:1000}}>
                              <Badge containerStyle={{ backgroundColor: 'white'}}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold'}}>{l.category}</Text>
                              </Badge>
                          </View>
                  </TouchableOpacity>
                  </View>
              )
            }
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

export default connect(CharitySelect, Context)