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

   componentDidMount(){
      this.props.checkAuth()
      this.props.loadApprovals()
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
            centerComponent={{ text: 'Charity Approval', style: { color: '#a020f0',fontSize:22}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
          <View>
            {
                this.props.store.approvals.map((r,i) => 
                    <ListItem
                        key={i}
                        // roundAvatar
                        avatar={{uri:r.orgImage}} 
                        title={r.name}
                        titleStyle={{fontSize:16,color:'white',fontWeight:'bold'}}
                        subtitle={r.subtitle}
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