import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'





class CharitySelect extends Component<Props> {
    constructor(props){
      super(props)
      this.state={

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
    const Back = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
              </Text>
            )
     }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            centerComponent={{ text: 'Select Charity', style: { color: '#a020f0',fontSize:22}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
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
              this.props.store.charityList.map((l,i) => 
                <TouchableOpacity 
                key={i}
                onPress={() => this.viewProfile(l)}>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:10}}>
                            <View style={{width:'70%'}}>
                                <Text style={{color:'white',fontSize:22,textAlign:'center'}}>{l.name}</Text>
                                {/*<Text style={{color:'white',fontWeight:'bold'}}>{`(${l.category})`}</Text> */}
                                <Text style={{color:'white',textAlign:'center'}}>{l.short}</Text>
                            </View>
                            <View style={{marginLeft:'auto'}}>
                            <Image 
                                resizeMode='cover' 
                                style={styles.listImage} 
                                source={{uri:`${l.image}`}}/>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
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
    backgroundColor: 'white',
  },
  linearGradient:{
    borderRadius:10,
    margin:10,
  },
  listImage:{
    height:80,
    width:80,
    borderRadius:10,
  }
});

export default connect(CharitySelect, Context)