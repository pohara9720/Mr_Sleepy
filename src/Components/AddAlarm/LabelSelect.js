import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,TextInput,TouchableOpacity
} from 'react-native'


import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import PropTypes from 'prop-types'




class LabelSelect extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            label:''
        }
    }

    componentDidMount(){
        this.props.checkAuth()
    }
    
    saveLabel = (string) => {
        const backAction = NavigationActions.back({})
        this.props.updateLabel(string)
        this.props.navigation.dispatch(backAction)
    }

    render() {
        const {navigate} = this.props.navigation
        const backAction = NavigationActions.back({})
        const Back = () => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }
        const Save = () => {
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:'center'}}
                    onPress={() => this.saveLabel(this.state.label)}
                >Save
                </Text>
            )
        }

        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Back />}
                    centerComponent={{ text: 'Attach Label', style: { color: '#a020f0',fontSize:22}}}
                    rightComponent={<Save />}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                <View style={{flex:1,justifyContent:'center',padding:15}}>
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:20}}>
                            <Icon 
                                name={'label'}
                                color={'white'}
                                size={25}
                                iconStyle={{marginRight:10}}
                            /> 
                            <View>
                                <TextInput 
                                    value={this.state.label}
                                    placeholder={'Type Label'}
                                    placeholderStyle={{color:'white',fontSize:22}}
                                    style={styles.input}
                                    placeholderTextColor={'white'}
                                    onChangeText={(e) => this.setState({label:e})}
                                />
                            </View>
                        </View>
                    </LinearGradient>
                </View>
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
        )
    }
}

const p = PropTypes

LabelSelect.propTypes = {
    store: p.object,
    systemError:p.bool,
    checkAuth:p.func,
    navigation:p.object,
    dispatch:p.func,
    systemErrorMessage:p.string,
    updateLabel:p.func

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    linearGradient:{
        borderRadius:10,
        margin:5,
    },
    input:{
        justifyContent: 'center',
        color:"white",
        fontSize:22
    }
})

export default connect(LabelSelect, Context)