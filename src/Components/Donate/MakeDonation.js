import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,ScrollView,
    Navigator,KeyboardAvoidingView,TouchableOpacity,TextInput
} from 'react-native'

import { FormLabel, FormInput,Button, Header,SearchBar,PricingCard,Icon } from 'react-native-elements'
import { StackNavigator,NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import connect from '../HOC'
import { Context } from '../../../App'


class MakeDonation extends Component<{}> { 
    constructor(props){
        super(props)
        this.state = {
           donation:10,
        }
    }
    
    

    render() {
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
        // const { navigate } = this.props.navigation
        return (
            <View style={styles.linearGradient}>
                <Header
                    leftComponent={<Back />}
                    // centerComponent={{ text: 'Make your donation', style: { color: '',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
               <View style={{padding:15,width:'100%',justifyContent:'center',alignItems:'center',flex:1}}>
                    <Text style={{color:'#a020f0',textAlign:'center',fontSize:20,fontWeight:'bold'}}>{`How much would you like to donate to ${this.props.store.donateProfile.name}?`}</Text>
                    <TextInput 
                        value={`${this.state.donation}`}
                        onChangeText={(e) => this.setState({donation:e})}
                        keyboardType='numeric'
                        style={{padding:15,borderBottomWidth:1,borderBottomColor:'#a020f0',fontSize:30,color:'#a020f0',fontWeight:'bold',width:'100%'}}

                    />
                    {
                        this.state.donation === '' ? null :
                            <TouchableOpacity style={{marginTop:30,backgroundColor:'#a020f0',justifyContent:'center',alignItems:'center',flexDirection:'row',padding:15,borderRadius:10,width:'70%'}}>
                                <Icon 
                                    name='heart'
                                    color='white'
                                    type='material-community'
                                />
                                <Text style={{color:'white',marginLeft:8,fontWeight:'bold'}}>{`Send $${this.state.donation} Donation`}</Text>
                            </TouchableOpacity>
                    }
               </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    linearGradient: {
        flex:1,
        backgroundColor:'white',
        padding:10,
        
    }
})


export default connect(MakeDonation,Context)

