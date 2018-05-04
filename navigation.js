import SwiperNavigator from 'react-native-swipe-navigation';
import Home from './screens/Home';
import details from './screens/details';

const Navigator = SwiperNavigator({
    Home:{
        screen: Home,
        right:'details', 
    },
    details:{
        screen: details,
        left:'Home',
        type:'push'
    }
})

export default Navigator;
