import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header,Badge,SearchBar,Icon,List,ListItem} from 'react-native-elements'
import moment from 'moment'
import { NavigationActions } from 'react-navigation'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import LinearGradient from 'react-native-linear-gradient'
import Collapsible from 'react-native-collapsible'
import {  Context } from '../../../App'
import connect from '../HOC'





class Receipts extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
          
        }
    }

   

  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const receiptsList = [{
      date:moment().format('l'),
      amount: '$6.00'
    },
    {
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },
    {
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    },{
      date:moment().format('l'),
      amount: '$6.00'
    }]
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
            centerComponent={{ text: 'Receipts', style: { color: '#a020f0',fontSize:22}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
          <View>
            {
                receiptsList.map((r,i) => 
                    <ListItem 
                        title={`Week of ${r.date}`}
                        titleStyle={{fontSize:16,color:'white'}}
                        // subtitle={alarm.label}
                        // subtitleStyle={{color:'white'}}
                        containerStyle={{backgroundColor:'#a020f0',borderTopWidth:0,borderBottomWidth:0,borderRadius:10,marginBottom:5}}
                        hideChevron={true}
                        badge={{ value: `${r.amount}`, textStyle: { color: '#a020f0' }, containerStyle: {backgroundColor:'white' } }}
                        // onPressRightIcon={() => this.props.deleteAlarm(i)}
                        // rightIcon={{name:'remove-circle',color:'red'}}
                    />
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

export default connect(Receipts, Context)