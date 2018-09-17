import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity
} from 'react-native';


import {Header,Icon,ListItem,Badge} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import {SnapDetails} from './SnapDetails'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'




class Snapshots extends Component<Props> {
    constructor(props){
          super(props)
          this.state={

        }
    }

    componentDidMount(){
        this.props.checkAuth()
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
     // console.log('Snapshots',snapshots)
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            // rightComponent={<Save />}
            centerComponent={{ text: 'Snapshots', style: {fontSize:22,color:'#a020f0'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
          <View>
            {
                this.props.store.snapshots.map((r,i) => 
                    <ListItem 
                        key={i}
                        title={`${moment(r.createdAt).format('MMM YY')}`}
                        titleStyle={{fontSize:16,color:'white'}}
                        // subtitle={alarm.label}
                        // subtitleStyle={{color:'white'}}
                        containerStyle={{backgroundColor:'#a020f0',borderTopWidth:0,borderBottomWidth:0,borderRadius:10,marginBottom:5}}
                        hideChevron={true}
                        badge={{ value: 'Details', textStyle: { color: '#a020f0' }, containerStyle: {backgroundColor:'white' }}}
                        onPress={() => navigate('SnapView',{r})}
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
});

export default connect(Snapshots, Context)