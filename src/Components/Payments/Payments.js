import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button
} from 'react-native';


import {Header} from 'react-native-elements'

import {  Context } from '../../../App'
import connect from '../HOC'




class Payments extends Component<Props> {



  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Header
            centerComponent={{ text: 'Manage Payments', style: {fontSize:22,color:'#a020f0'}}}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <View style={{flex:1}}>
            <Text>
                This is adding an Payments
            </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default connect(Payments, Context)