import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity
} from 'react-native';


import {Header,Icon} from 'react-native-elements'
import { CreditCardInput, LiteCreditCardInput } from "rn-credit-card-view"
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class Payments extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
          edit:false,
          values:''
      }
    }


    _onChange = (form) => {
    this.setState({values:form})
  }

  render() {
    const {navigate} = this.props.navigation
    const Edit = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.setState({edit:!this.state.edit})}>
                 {this.state.edit ? 'Done' : 'Edit'}
              </Text>
            )
     }
     const Save = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.setState({edit:!this.state.edit})}>
                 {this.state.values === '' ? '' : 'Save'}
              </Text>
            )
     }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={this.props.store.card === null ? null : <Edit />}
            rightComponent={<Save />}
            centerComponent={{ text: 'Manage Payments', style: {fontSize:22,color:'#a020f0'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
            <CreditCardInput 
              requiresName={true}
              onChange={this._onChange}
              allowScroll={true}
              placeholderColor={'grey'}
              inputContainerStyle={{padding:2,borderBottomColor:'#a020f0',borderBottomWidth: 1}}
              inputStyle={{color:'#a020f0'}}
              labelStyle={{color:'#a020f0'}}
           />
          <Text style={{color:'#a020f0', fontSize:18,fontWeight:'bold',marginTop:20}}>Account Payment Method</Text>
          <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
              <View style={{padding:15}}>
                  <View style={{marginBottom:15,flexDirection:'row'}}>
                      <View>
                          <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Name on Card</Text>
                          <Text style={{color:'white',fontSize:20}}>{this.props.store.accountName}</Text>
                      </View>
                      { this.state.edit ? 
                        <TouchableOpacity style={{marginLeft:'auto'}}>
                            <Icon 
                              name={'remove-circle'}
                              color={'red'}
                              size={30}
                              onPress={() => console.log('delete')}
                            />
                        </TouchableOpacity> : null
                      }
                  </View>
                  <View style={{marginBottom:15}}>
                      <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Card Number</Text>
                      <Text style={{color:'white',fontSize:20}}>**** **** **** 6588 (VISA)</Text>
                  </View>
                  <View style={{marginBottom:15,flexDirection:'row'}}>
                      <View style={{flexGrow:1}}>
                          <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>Expiration Date</Text>
                          <Text style={{color:'white',fontSize:20}}>12/20</Text>
                      </View>
                      <View style={{flexGrow:1}}>
                          <Text style={{color:'white',fontSize:12,fontWeight:'bold'}}>CVC</Text>
                          <Text style={{color:'white',fontSize:20}}>353</Text>
                      </View>
                  </View>
              </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  linearGradient:{
    borderRadius:10,
    marginTop:10
  },
});

export default connect(Payments, Context)