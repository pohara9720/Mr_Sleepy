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





class ApprovalList extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
          
        }
    }

   

  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const test = [{
              id:1,
              name:'Dua Lipa1',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              id:2,
              name:'Dua Lipa2',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
            },{
              id:3,
              name:'Dua Lipa3',
              category:'Health',
              short: 'This is a foundation that gives money to dua lipa',
              image:'https://cdn.pixabay.com/photo/2017/05/09/21/49/gecko-2299365_960_720.jpg',
              website:'www.dualipa.com',
              email: 'dualipa@dl.com',
              location: 'Los Angeles',
              full:'Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit Dua lipa is lit '
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
            centerComponent={{ text: 'Charity Approval', style: { color: '#a020f0',fontSize:22}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
          <View>
            {
                test.map((r,i) => 
                    <ListItem
                        key={i}
                        // roundAvatar
                        avatar={{uri:r.image}} 
                        title={r.name}
                        titleStyle={{fontSize:16,color:'white',fontWeight:'bold'}}
                        subtitle={r.short}
                        subtitleStyle={{color:'white'}}
                        containerStyle={{backgroundColor:'#a020f0',borderTopWidth:0,borderBottomWidth:0,borderRadius:10,marginBottom:5}}
                        hideChevron={true}
                        onPress={() => navigate('ApprovalProfile',{r})}
                        // badge={{ value: `${r.category}`, textStyle: { color: '#a020f0' }, containerStyle: {backgroundColor:'white' } }}
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

export default connect(ApprovalList, Context)