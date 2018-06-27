import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class CharitySelect extends Component<Props> {



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
    const testArray =[12,12,12,12,12,12,12,12]
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            centerComponent={{ text: 'Select Charity', style: { color: '#a020f0',fontSize:22}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
            {
              testArray.map((l,i) => 
                <TouchableOpacity key={i}>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:10}}>
                            <View style={{width:'70%'}}>
                                <Text style={{color:'white',fontSize:22}}>Dua Lipa Foundation</Text>
                                <Text style={{color:'white',fontWeight:'bold'}}>(Entertainment)</Text>
                                <Text style={{color:'white'}}>This is a foundation that gives money to dua lipa </Text>
                            </View>
                            <View style={{marginLeft:'auto'}}>
                            <Image 
                            resizeMode='cover' 
                            style={styles.listImage} 
                            source={{uri: 'https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg'}}/>
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