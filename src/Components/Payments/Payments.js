import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,ActivityIndicator
} from 'react-native';


import {Header,Icon} from 'react-native-elements'
import { CreditCardInput, LiteCreditCardInput } from "rn-credit-card-view"
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import Modal from "react-native-simple-modal"




class Payments extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
          edit:false,
          values:'',
          error:false
      }
    }


    _onChange = (form) => {
    this.setState({values:form})
  }
  validate = () => {
    const values = this.state.values.values
    if(this.state.values.valid === true){
        this.props.loading(true)
        this.props.addCard(values)
    }
    else{
      this.setState({error:true})
      setTimeout(() => this.setState({error:false}),2000)
    }
    
  }

   componentWillUnmount(){
        this.setState({values:''})
    }

  render() {
    console.log(this.state)
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
                 onPress={() => this.validate()}>
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
        {
            this.state.error ? 
            <View style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'red',padding:15}}>
                <Text style={{color:'white',fontWeight:'bold'}}>One or more fields is invalid</Text>
          </View> : null
        }
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
          {
            this.props.store.card === null ?

            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                <View style={styles.customBtns}>
                    <Icon 
                      name={'credit-card-off'}
                      type={'material-community'}
                      size={40}
                      color={'white'}
                      iconStyle={styles.customIcon}
                    />
                    <Text style={styles.btnText}>No payment methods have been added</Text> 
                </View>
            </LinearGradient> :
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
          }
          
        </ScrollView>
        <Modal
            animationDuration={200}
            animationTension={40}
            closeOnTouchOutside={true}
            modalDidClose={() => navigate('Alarms')}
            containerStyle={{
              justifyContent: "center",
            }}
            disableOnBackPress={false}
            // modalDidClose={() => PushNotificationsHandler.requestPermissions()}
            modalStyle={{
              backgroundColor: this.props.store.cardAdded ? "white" : this.props.store.cardError ? 'white' : "#a020f0",
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
            {
              this.props.store.cardAdded ? 
              <View style={{alignItems:'center',justifyContent:'center'}}>
                  <View style={{backgroundColor:'#00ff41',padding:50}}>
                        <Icon 
                          color='white'
                          size={70}
                          type='material-community'
                          name='checkbox-marked-circle-outline' 
                          iconStyle={{marginBottom:20}}
                        />
                        <Text style={{textAlign:'center',color:'white'}}>Your card has been successfully added!</Text>
                  </View>
            </View> : 
            this.props.store.cardAdded ?
              <View style={{alignItems:'center',justifyContent:'center'}}>
                  <View style={{backgroundColor:'red',padding:50}}>
                        <Icon 
                          color='white'
                          size={70}
                          name='error' 
                          iconStyle={{marginBottom:20}}
                        />
                        <Text style={{textAlign:'center',color:'white'}}>Your card has been successfully added!</Text>
                  </View>
            </View>
            :
            <View style={{alignItems:'center',justifyContent:'center'}}>
                  <View style={{backgroundColor:'#a020f0',padding:50}}>
                        <ActivityIndicator size="large" color="white" />
                        <Text style={{textAlign:'center',color:'white'}}>Adding your card...</Text>
                  </View>
            </View>
            }
        </Modal>
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
  customBtns: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight:20,
    paddingLeft:20,
  },
  btnText: {
    color: 'white',
    fontSize:25,
    textAlign:'center'
  },
});

export default connect(Payments, Context)