import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header ,List,ListItem } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../App'
import connect from './HOC'




class Alarms extends Component<Props> {
    constructor(props){
      super(props)
      this.state ={
        edit:false
      }
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
     const test=[12,12,12,12,12,12]
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Edit />}
            centerComponent={{ text: 'Mr. Sleepy', style: {fontSize:22,color:'#a020f0'}}}
            rightComponent={{ icon: 'add', color: '#a020f0', onPress:() => navigate('AddAlarm')}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0,borderBottomColor:'transparent'}}
        />
            <TouchableOpacity>
                <Image
                    resizeMode='cover'
                    source={require('../images/bannerAd.png')}
                    style={{height:140,width:'100%'}}/>
            </TouchableOpacity>
             <ScrollView style={styles.container}>
                <View style={{borderTopWidth:0}}>
                    {
                        test.map((item, i) => (
                            <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                            { this.state.edit ? 
                                <ListItem
                                    title={'9:30 am'}
                                    titleStyle={{fontSize:30,color:'white'}}
                                    subtitle={'Subtitle'}
                                    subtitleStyle={{color:'white'}}
                                    containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                    hideChevron={false}
                                  
                                    rightIcon={{name:'remove-circle',color:'red'}}
                                    // onSwitch={() => this.props.switch(i)}
                                    // switched={this.props.store.alarms[i].switchOn}
                                />
                              :
                                <ListItem
                                    title={'9:30 am'}
                                    titleStyle={{fontSize:30,color:'white'}}
                                    subtitle={'Subtitle'}
                                    subtitleStyle={{color:'white'}}
                                    switchButton={true}
                                    containerStyle={{backgroundColor:'transparent',borderTopWidth:0,borderBottomWidth:0}}
                                    hideChevron={true}
                                    switchOnTintColor={'#7D26CD'}
                                    switchThumbTintColor={'white'}
                                    switchTintColor={'grey'}
                                    // onSwitch={() => this.props.switch(i)}
                                    // switched={this.props.store.alarms[i].switchOn}
                                />
                            }
                              </LinearGradient>
                        ))
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
    borderTopWidth:0,
    borderTopColor:'transparent',
    borderBottomWidth:0
  },
  linearGradient:{
    borderRadius:10,
    margin:10,
  },
});

export default connect(Alarms, Context)