import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,Button,ScrollView,TouchableOpacity,Image,TextInput
} from 'react-native'

import { NavigationActions } from 'react-navigation'
import {Header,Badge,Icon} from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'
import moment from 'moment'




class AdminView extends Component<Props> {
    constructor(props){
        super(props)
        this.state={
            
        }
    }

    componentDidMount(){
        this.props.checkAuth()
        const date = {date:moment().format()}
        this.props.getCurrentSnapshot()
        this.props.getSnapshots()
        this.props.loadLineData(date)
    }

    render() {
        const Back = (props) => {
            const backAction = NavigationActions.back({})
            return(
                <Text
                    style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                    onPress={() => this.props.navigation.dispatch(backAction)}
                >Back
                </Text>
            )
        }

        const {navigate} = this.props.navigation

        const test =[12,12,12,12,12]
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Back />}
                    centerComponent={{ text: 'Admin', style: { color: '#a020f0',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                <ScrollView style={{flex:1}}>
                    <View style={{marginTop:15,padding:15}}>
                        <Text style={{color:'#a020f0',fontSize:20,marginBottom:5}}>Admin</Text>
                        <TouchableOpacity onPress={() => navigate('Admin')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='chart-line'
                                    type='material-community'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Analytics</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('Snapshots')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='camera-enhance'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Snapshot History</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('SuperSearch')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='search-plus'
                                    type='font-awesome'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Super Search</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('ApprovalList')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,padding:15,borderBottomWidth:0,flexDirection:'row'}}>
                                <Icon 
                                    name='approval'
                                    type='material-community'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Charity Approval</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigate('EmailClient')}>
                            <View style={{borderColor:'#a020f0',borderWidth:1,padding:15,flexDirection:'row'}}>
                                <Icon 
                                    name='mail'
                                    type='foundation'
                                    color={'#a020f0'}
                                    size={20}
                                    iconStyle={{marginRight:10}}
                                />
                                <Text style={{color:'#a020f0',fontSize:15}}>Email Client</Text>
                            </View>
                        </TouchableOpacity>
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
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    linearGradient:{
        height:230,
        justifyContent:'center'
    },
    title:{
        textAlign:'center',
        color:'white',
        fontSize:22,
        marginTop:10
    },
    image:{
        borderRadius:50,
        height:100,
        width:100
    },
    listItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:0,
        padding:15,
        flexDirection:'row'
    },
    lastItem:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row'
    },
    lastItem2:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    }
})

export default connect(AdminView, Context)