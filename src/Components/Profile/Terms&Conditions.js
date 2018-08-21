import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity
} from 'react-native';


import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import {Legal} from './Legal'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class Terms_Conditions extends Component<Props> {
    constructor(props){
          super(props)
          this.state={

        }
    }

  render() {
    const {navigate} = this.props.navigation
    const backAction = NavigationActions.back({})
    const Back = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'white',justifyContent:"center"}}
                 onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
              </Text>
            )
     }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            // rightComponent={<Save />}
            centerComponent={{ text: 'Terms & Conditions', style: {fontSize:22,color:'white'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <Legal form='terms' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#a020f0',
    },
});

export default connect(Terms_Conditions, Context)