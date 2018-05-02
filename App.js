import React,{Component} from 'react';
import { StyleSheet, Text, ScrollView,View, StatusBar, Dimensions,} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {fetchWeather} from './API/weatherAPI';
import Highlighter from 'react-native-highlight-words';
import moment from "moment";  
import {AdMobBanner} from 'expo';

const time= moment().format('MMMM D, YYYY');
const screenWidth = Dimensions.get('window').width;
const iconNames= {
  Default: 'ios-cloud-download',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
  Mist: 'md-partly-sunny',
}
const phrases = {
  Default: {
		title: "wahda wahda, nchallah el sne ",
		subtitle: "osbor chwaya",
		highlight: "nchallah",
		color: "#636363",
		background: "#9C9C9C",
	},
	Clear: {
		title: "Ta9iss chbeb",
		subtitle: "okhroj khali ommik thawi el bit",
		highlight: "Ta9iss",
		color: "#E32500",
		background: "#FFD017",
	},
	Rain: {
		title: "Rabi 3ta khirou, 3irss el thib ya baba",
		subtitle: "kharij haka el bott",
		highlight: "khirou",
		color: "#004A96",
		background: "#2F343A",
	},
	Thunderstorm: {
		title: "R3ad w bra9 ya m3allim",
		subtitle: "ken 3andik karhba salaktha",
		highlight: "m3allim",
		color: "#FBFF46",
		background: "#020202",
	},
	Clouds: {
		title: "Msa7ba, men ghir matmid wejhik",
		subtitle: "ken T7eb hiz s7abba",
		highlight: "matmid",
		color: "#0044FF",
		background: "#939393",
	},
	Snow: {
		title: "Za3ma za3ma thelij",
		subtitle: "elbis w zid elbiss, famech matfothha",
		highlight: "thelij",
		color: "#021D4C",
		background: "#15A678",
	},
	Drizzle: {
		title: "Ta9iss el youm dra kifeh",
		subtitle: "Tunis ta9isha mayetfhmich",
		highlight: "kifeh",
		color: "#B3F6E4",
		background: "#3c6382",
	},
	Mist: {
		title: "Thbeb w katha",
		subtitle: "sayess rou7ik",
		highlight: "thbeb",
		color: "#B3F6E4",
		background: "#f8c291",
	  },
  }

export default class HomeScreen extends Component {

    static navigationOptions ={
        header: null,
    }

  state ={
    temp: 0,
    weather: 'Default',
    name: '...',
    country:'..' ,
   
  }
 
  componentWillMount(){
    StatusBar.setHidden(true,'slide');
   
   
  }
  componentDidMount(){
     this.getLocation();
  }

  getLocation(){
    navigator.geolocation.getCurrentPosition(
			(posData) => fetchWeather(posData.coords.latitude,posData.coords.longitude)
				.then(res => this.setState({
					temp:Math.round(res.temp),
          weather: res.weather,
          name: res.name,
          country: res.country,
				})),
			(error) => alert(error),
			{timeout:10000}
		)
  }



  render() {
    
    return (
      <View style={[styles.container,  {backgroundColor: phrases[this.state.weather].background}]}>
          
            <View style={styles.header}>
            <Ionicons name={iconNames[this.state.weather]} size={80} color="white" />

                    
                    <Text style={styles.temp}> {this.state.temp}°</Text>
                  <View>
                    <Text style={styles.city}>{this.state.name} ,{this.state.country}</Text>
                    <Text style={styles.time}> {time}</Text>
                 </View>
            </View>
            
            <View style={styles.body}>
                  <Highlighter
                  style={styles.titre}
                  highlightStyle={{color: phrases[this.state.weather].color}}
                  searchWords={[phrases[this.state.weather].highlight]}
                  textToHighlight= {phrases[this.state.weather].title}
                  />
                 <Text style={styles.subTitle}>{phrases[this.state.weather].subtitle}</Text>
          </View>
          <View style={styles.banner}>             
         {/*  <AdMobBanner
                bannerSize="smartBanner"
                adUnitID="ca-app-pub-3465282364470954/3188528756" // Test ID, Replace with your-admob-unit-id
                testDevices={[AdMobBanner.simulatorId]}
                onDidFailToReceiveAdWithError={this.bannerError} /> */}
          </View>
          
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fbc531',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    //backgroundColor: '#e84118',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  body:{
    flex: 5,
    //backgroundColor: '#0097e6',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    margin: 10,
  },
  temp:{
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 45,
    color:'white'
  },
  titre:{
    fontFamily:'System',
    fontWeight:'bold',
    color:'#f5f6fa',
    fontSize:78,
    marginBottom: 10,
  },
  subTitle:{
    fontFamily:'System',
    fontWeight:'bold',
    color:'#f5f6fa',
    fontSize:24,
  },
  city:{
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 22,
    color:'white',
  },
  time:{
    fontFamily: 'System',
    fontWeight: 'bold',
    fontSize: 20,
    color:'white',
  }, 
  banner:{
    width: screenWidth,
    height: 60,
  }
});
