import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,Button,ScrollView,TouchableOpacity,Image
} from 'react-native';


import {Header,Icon} from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import {  Context } from '../../../App'
import connect from '../HOC'




class RepeatSelect extends Component<Props> {
    constructor(props){
      super(props)
      this.state={
          once:false,
          everyday:false,
          options: [
          {option:'Everyday',selected:false,id:0},
          {option:'Sundays',selected:false,id:1},
          {option:'Mondays',selected:false,id:2},
          {option:'Tuesdays',selected:false,id:3},
          {option:'Wednesdays',selected:false,id:4},
          {option:'Thursdays',selected:false,id:5},
          {option:'Fridays',selected:false,id:6},
          {option:'Saturdays',selected:false,id:7},
          {option:'Just Once',selected:false,id:8}
          ]
      }
    }
      toggleOnce(key){
          this.setState({once: !this.state.once})
      }
      toggleEveryday(){
        this.setState({everyday: !this.state.everyday})
      }
      populateDays = (day) => {
        if(day === 0){
          this.setState({everyday: !this.state.everyday})
        }
        else if(day === 8){
          this.setState({once: !this.state.once})
        }
        else{
        var days = {...this.state.options}
        days[day].selected = !days[day].selected
        this.setState({days})
      }
     }

     saveFrequency = () => {
      const backAction = NavigationActions.back({})
        if(this.state.once){
            this.props.updateFrequency([{option:'Just Once',selected:false,id:8}])
            this.props.navigation.dispatch(backAction)

        }
        else if(this.state.everyday){
            this.props.updateFrequency([{option:'Everyday',selected:false,id:0}])
            this.props.navigation.dispatch(backAction)
        }
        else{
            selectedDays = this.state.options.filter(x => x.selected === true)
            this.props.updateFrequency(selectedDays)
            this.props.navigation.dispatch(backAction)
        }
        
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
     const Save = (props) => {
            return(
              <Text
                 style={{fontSize:14,color:'#a020f0',justifyContent:"center"}}
                 onPress={() => this.saveFrequency()}
                >Save
              </Text>
            )
     }
    return (
      <View style={styles.container}>
        <Header
            leftComponent={<Back />}
            centerComponent={{ text: 'Choose Frequency', style: { color: '#a020f0',fontSize:22}}}
            rightComponent={<Save />}
            outerContainerStyles={{backgroundColor:'transparent',borderBottomWidth:0}}
        />
        <ScrollView style={{flex:1,padding:15}}>
            { !this.state.once && !this.state.everyday ? 
              this.state.options.map((l,i) => 
                <TouchableOpacity 
                    key={i}
                    onPress={() => this.populateDays(l.id)}
                    >
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:10}}>
                            { l.selected ? 
                                <Icon 
                                  name={'check-circle'}
                                  color={'#00FF00'}
                                  size={25}
                                  iconStyle={{marginRight:10}}
                              /> : null
                            }
                            <View style={{width:'70%'}}>
                                <Text style={{color:'white',fontSize:22}}>{l.option}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
              ) : this.state.once ?
              <TouchableOpacity 
                    // key={i}
                    onPress={() => this.toggleOnce()}
                    >
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:10}}>
                           
                                <Icon 
                                  name={'check-circle'}
                                  color={'#00FF00'}
                                  size={25}
                                  iconStyle={{marginRight:10}}
                              /> 
                            <View style={{width:'70%'}}>
                                <Text style={{color:'white',fontSize:22}}>Just Once</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity> 
                :
                <TouchableOpacity 
                    // key={i}
                    onPress={() => this.toggleEveryday()}
                    >
                    <LinearGradient  colors={[ '#7016a8' ,'#a020f0']} start={{x: 1, y: 2}} end={{x: 0.9, y: 0}} style={styles.linearGradient}>
                        <View style={{flexDirection:'row',padding:10}}>
                     
                                <Icon 
                                  name={'check-circle'}
                                  color={'#00FF00'}
                                  size={25}
                                  iconStyle={{marginRight:10}}
                              /> 
                           
                            <View style={{width:'70%'}}>
                                <Text style={{color:'white',fontSize:22}}>Everyday</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
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
    );
  }
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
});

export default connect(RepeatSelect, Context)