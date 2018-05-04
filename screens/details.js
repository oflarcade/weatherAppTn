import React, { Component } from 'react';
import {  View, Text,StyleSheet, StatusBar, Dimensions } from 'react-native';
import {EvilIcons,Ionicons, Feather, Entypo} from '@expo/vector-icons';
import { Col, Row, Grid } from "react-native-easy-grid";
import {fetchWeather} from '../API/weatherAPI';
import moment from 'moment';
import iconNames from '../data/iconNames';
import phrases from '../data/phrases';

const time= moment().format('dddd');
const screenWidth = Dimensions.get('window').width;

export default class details extends Component {

    static navigationOptions={header : null}
    state ={
        temp: 0,
        weather: 'Default',
        name: '...',
        country:'..' ,
        isReady: false,
        pressure:0,
        humidity:0,
        maxTemp:0,
        minTemp:0,
        weatherDescription: '',
        windSpeed:0,
        windDeg:0,
        clouds:0,
        sunrise:0,
        sunset:0,
       
      }  
      componentWillMount(){
          StatusBar.setHidden(true, 'slide'); 
          this._getDetails();
             }
        async _getDetails(){
            navigator.geolocation.getCurrentPosition(
                (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
                    .then(res => this.setState({
                        temp: Math.round(res.temp),
                        maxTemp: Math.round(res.maxTemp),
                        minTem: Math.round(res.minTemp),
                        weather: res.weather,
                        windSpeed: res.windSpeed,
                        windDeg: res.windDeg,
                        humidity: res.humidity,
                        clouds: res.clouds,
                        weatherDescription: res.weatherDescription,
                        name: res.name,
                        country: res.country,

                    })),
                    (error)=> alert(error),
                   
            )
        }

       

  render() {
    return (
        <View style={[styles.container, {backgroundColor: phrases[this.state.weather].background,}]}>
               
                        <View style={styles.header}>
                           <EvilIcons name='location' size={35} color='white' />
                               
                                        <Text style={styles.location}>{this.state.name}, {this.state.country}</Text>
        
                                 
                        </View>
                

                <View style={styles.body}>

                        <View style={styles.top}>

                                <View>
                                <Text style={styles.temp}>{this.state.temp}°</Text>
                                </View>

                               {/*  <View style={styles.topSide}>
                                    <View style={styles.sideTop}>
                                            <Feather name='chevrons-up' size={20} color='white' />
                                            <Text style={{fontSize:23,color:'white'}}> {this.state.maxTemp}</Text>
                                    </View>
                                    <View style={styles.sideTop}>
                                            <Feather name='chevrons-down' size={20} color='white' />
                                            <Text style={{fontSize:23,color:'white'}}> {this.state.minTemp}</Text>
                                    </View>
                                </View> */}
                        </View>


                        <View style={styles.bodyMiddle}>
                                    <View style={{flexDirection:'column', flex:1, justifyContent:'center',alignItems:'center'}}>
                                            <View>
                                                 <Ionicons name={iconNames[this.state.weather]} size={100} color="white" />
                                             </View>
                                             <View style={{marginRight:5}}>
                                                <Text style={styles.dateStyles}>{this.state.weatherDescription}</Text>
                                             </View>
                                    </View>

                                  {/*   <View style={{flexDirection:'column',flex:1}}>
                                       <View style={{ flexDirection:'row',marginBottom: 12}}>
                                           <Feather name='sunrise' size={20} color='white' />
                                           <Text style={{fontSize: 15, fontWeight:'bold', fontFamily:'System', color:'white',marginHorizontal:5,marginTop:3}}>{this.state.sunrise}</Text>
                                       </View>
                                       <View style={{ flexDirection:'row'}}>
                                            <Feather name='sunset' size={20} color='white' />
                                            <Text style={{fontSize: 15, fontWeight:'bold', fontFamily:'System',color:'white', marginHorizontal:5,marginTop:3}}>{this.state.sunset}</Text>
                                       </View>
                                    </View> */}
                        </View>
                       
                </View>
                <View style={styles.footer}>
                
                           {/*  <View style={{flexDirection:'row', justifyContent:'space-around',}}>
                                    <View style={{flexDirection:'column',alignItems:'stretch'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Feather name='wind' size={20} color='white'/>
                                            <Text style={styles.dateStyles}>{this.state.windSpeed}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}} >
                                            <Feather name='compass' size={20} color='white' />
                                            <Text style={styles.dateStyles}> {this.state.windDeg}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{flexDirection:'row'}} >
                                            <Entypo name='water' size={20} color='white'/>
                                            <Text style={styles.dateStyles}>{this.state.humidity}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <Feather name='cloud' size={20} color='white' />
                                            <Text style={styles.dateStyles}>{this.state.clouds}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{flexDirection:'row'}}>
                                            <Feather name='chevrons-up' size={20} color='white' />
                                            <Text style={styles.dateStyles}>{this.state.maxTemp}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                        <Feather name='chevrons-down' size={20} color='white' />
                                            <Text style={styles.dateStyles}>{this.state.minTemp}</Text>
                                        </View>
                                    </View>
                        </View> */}
                </View>
                
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    header:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 5,
    },
    body:{
        flex:6,
        flexDirection: 'column',
        backgroundColor: 'red',
    },
    footer:{
        flex:1,
        backgroundColor:'red' ,
    },
    top:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft:5,
        marginTop: 5,
    },
    topSide:{
        flexDirection: 'column',
  
    },
    sideTop:{
        marginLeft: 15,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        alignContent: 'center',
    },
    bodyMiddle:{
        
        justifyContent: 'center',
        alignItems: 'center',
    },
    middle:{
        flexDirection: 'row',
    },
    location:{
        fontFamily: 'System',
        fontSize: 35,
        fontWeight: 'bold',
        color:'white'
    },
    date:{
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    dateStyles:{
        fontFamily: 'System',
        fontSize: 23,
        fontWeight: 'bold',
        color:'white'
    }, 
    temp:{
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 100,
    color:'white'
    },
  });
  