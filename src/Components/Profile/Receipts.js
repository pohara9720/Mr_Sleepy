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
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Back />}
                    centerComponent={{ text: 'Invoices & Donations', style: { color: '#a020f0',fontSize:22}}}
                    outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
                />
                {/*<LinearGradient  colors={[ '#8E2DE2' ,'#4A00E0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.bannerGrad}>
                    <View style={styles.banner}>
                        <Text style={{fontSize:12,color:'white'}}>Mr. Sleepy charges your donations weekly to ensure that the charities get a higher percentage of the donation. Your weekly receipts will be emailed to your account and here is where you can view your upcoming weekly payment amount</Text> 
                    </View>
                </LinearGradient>*/}
                <ScrollView style={{flex:1,padding:15}}>
                    {
                        this.props.store.invoices === '' || this.props.store.invoices === null || this.props.store.invoices.length === 0? 
                            <LinearGradient  colors={[ '#8E2DE2' ,'#4A00E0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.bannerGrad}>
                                <View style={styles.banner}>
                                    <Text style={{fontSize:15,color:'white'}}>You have no invoices</Text> 
                                </View>
                            </LinearGradient>
                            :
                            <View>
                                <Text style={{color:'#a020f0',fontWeight:'bold',paddingBottom:5}}>* Donations are processed weekly</Text>
                                <View style={{borderColor:'#a020f0',borderWidth:1,borderBottomWidth:0,padding:15}}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>Pending Donations</Text>
                                </View>
                                <LinearGradient  colors={[ '#8E2DE2' ,'#4A00E0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.invoice}>
                                    <View style={{borderWidth:0,borderBottomWidth:0,padding:5,flexDirection:'row'}}>
                                        <Icon 
                                            name='calendar'
                                            type='material-community'
                                            color='white'
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'white',fontSize:15}}>Due Date</Text>
                                        <Text style={{color:'white',fontSize:20,marginLeft:'auto',fontWeight:'bold'}}>{moment(this.props.store.invoices.period_end).format('MMM DD')}</Text>
                                    </View>
                                    <View style={{borderWidth:0,borderBottomWidth:0,padding:5,flexDirection:'row'}}>
                                        <Icon 
                                            name='square-inc-cash'
                                            type='material-community'
                                            color='white'
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'white',fontSize:15}}>Subtotal</Text>
                                        <Text style={{color:'white',fontSize:20,marginLeft:'auto',fontWeight:'bold'}}>{`$${(this.props.store.invoices.subtotal / 100)}.00`}</Text>
                                    </View>
                                    <View style={{borderWidth:0,borderBottomWidth:0,padding:5,flexDirection:'row'}}>
                                        <Icon 
                                            name='square-inc-cash'
                                            type='material-community'
                                            color='white'
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'white',fontSize:15}}>Tax</Text>
                                        <Text style={{color:'white',fontSize:20,marginLeft:'auto',fontWeight:'bold'}}>{`$${(this.props.store.invoices.tax / 100)}`}</Text>
                                    </View>
                                    <View style={{borderWidth:0,borderBottomWidth:0,padding:5,flexDirection:'row'}}>
                                        <Icon 
                                            name='square-inc-cash'
                                            type='material-community'
                                            color='white'
                                            size={20}
                                            iconStyle={{marginRight:10}}
                                        />
                                        <Text style={{color:'white',fontSize:15}}>Total</Text>
                                        <Text style={{color:'white',fontSize:20,marginLeft:'auto',fontWeight:'bold'}}>{`$${(this.props.store.invoices.total / 100)}`}</Text>
                                    </View>
                                </LinearGradient>
                                {
                                    this.props.store.invoices.lines && this.props.store.invoices.lines.data.map((l,i,a) => 
                                        <View key={i} style={i === a.length -1 ? styles.last : styles.item}>
                                            <Icon 
                                                name='favorite'
                                                color='#a020f0'
                                                size={12}
                                                iconStyle={{marginRight:10,marginTop:-2}}
                                            />
                                            <Text style={{color:'#a020f0',fontSize:12}}>{l.description}</Text>
                                            <Text style={{color:'#a020f0',fontSize:15,marginLeft:'auto'}}>{`$${(l.amount/100)}`}</Text>
                                        </View>
                                  
                                    )}
                            
                                <View style={{borderColor:'#a020f0',borderWidth:1,padding:15,marginTop:15,borderBottomWidth:this.props.store.me.Donations.length === 0 ? 1 : 0}}>
                                    <Text style={{color:'#a020f0',fontWeight:'bold',fontSize:15}}>{this.props.store.me.Donations.length === 0 ? 'No other donations' : 'All Donations'}</Text>
                                </View>
                                {
                                    this.props.store.me.Donations.map((d,i,a) => 
                                        <View key={i} style={i === a.length - 1 ? styles.last : styles.item}>
                                            <Icon 
                                                name={'favorite'}
                                                color={'#a020f0'}
                                                size={20}
                                                iconStyle={{marginRight:10}}
                                            />
                                            <Text style={{color:'#a020f0',fontSize:14}}>{d.Charity.name}</Text>
                                            <View style={{marginLeft:'auto'}}>
                                                <Badge containerStyle={{backgroundColor: '#a020f0',borderColor:'white',}}>
                                                    <Text style={{color:'white'}}>{`$${d.amount}`}</Text>
                                                </Badge>
                                            </View>
                                        </View>
                                    )
                                }
                            </View>
                    }
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
    item:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:0,
        padding:15,
        flexDirection:'row',
    },
    last:{
        borderColor:'#a020f0',
        borderWidth:1,
        borderBottomWidth:1,
        padding:15,
        flexDirection:'row',
        marginBottom:20
    },
    invoice:{
        width:'100%',
        padding:10
    },
    banner:{
        flexDirection:'row',
    },
    bannerGrad:{
        width:'100%',
        padding:10,
        alignItems:'center'
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
})

export default connect(Receipts, Context)