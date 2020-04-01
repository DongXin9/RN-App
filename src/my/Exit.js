import React, { Component } from 'react'
import { Text, View ,TouchableOpacity,Dimensions,AsyncStorage} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/AntDesign'
const {width} = Dimensions.get('window');
const s = width/640;
export default class Exit extends Component {
    exit=()=>{
        // AsyncStorage.clear()
        AsyncStorage.removeItem('user')
        .then(()=>{
            Actions.replace()
            Actions.login()
        })
    }
    // login.js
    // componentDidMount(){
    //   if (Platform.OS === 'android'){
    //       BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    //   }
    // }
    // componentWillUnmount() {
    //     if (Platform.OS === 'android') {
    //       BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    //     }
    // }
    // onBackAndroid = () => {
    //     if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
    //         BackHandler.exitApp();
    //     }
    //     else{
    //         this.lastBackPressed = Date.now();
    //         ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    //         return true;
    //     }
    // }   
    // componentDidMount(){
    //   let now=0;
    //   BackHandler.addEventListener('back', () => {
    //     if (new Date().getTime() - now < 2000) {
    //       BackHandler.exitApp();
    //     } else {
    //       ToastAndroid.show('确定要退出吗', ToastAndroid.SHORT);
    //       now = new Date().getTime();
    //       return true;
    //     }
    //     // return false;
    //   });
    // }
    // componentWillMount(){
    //   let now=0;
    //   BackHandler.addEventListener('back', () => {
    //     if (new Date().getTime() - now < 2000) {
    //       BackHandler.exitApp();
    //     } else {
    //       ToastAndroid.show('确定要退出吗', 100);
    //       now = new Date().getTime();
    //       return true;
    //     }
    //     // return false;
    //   });
    // }   
    // componentWillUnmount(){
    //   let now=0;
    //   BackHandler.removeEventListener('back', () => {
    //     if (new Date().getTime() - now < 2000) {
    //       BackHandler.exitApp();
    //     } else {
    //       ToastAndroid.show('确定要退出吗', 100);
    //       now = new Date().getTime();
    //       return true;
    //     }
    //     // return false
    //   });
    // }   
    // App.js
     // console.log('Action：'+Actions.currentScene)
          // if(Actions.currentScene==='login'){
          //   if(new Date().getTime()-now<2000){
          //     BackHandler.exitApp();
          //     return false;
          //   }else{
          //     ToastAndroid.show('确定要退出吗？',ToastAndroid.SHORT);
          //     now = new Date().getTime();
          //     console.log(1);
          //     console.log('login'+now)
          //     return true;
          //   }
          //   // return false
          // }
          // else if(Actions.currentScene !== 'login'){
          //   if(Actions.currentScene !== 'home'){
          //     Actions.pop();
          //     return true;
          //   }else{
          //       if(new Date().getTime()-now1<2000){
          //         BackHandler.exitApp();
          //         return false
          //       }else{
          //         ToastAndroid.show('确定要退出吗？',ToastAndroid.SHORT);
          //         now1 = new Date().getTime();
          //         console.log('home'+now1)
          //         return true;
          //       }
          //   }
          // }else{

          // }
          // if(Actions.currentScene !== 'home' && Actions.currentScene !== 'login'){
          //   Actions.pop();
          //   return true;
          // }
          // else{
          //     if(new Date().getTime()-now1<2000){
          //       BackHandler.exitApp();
          //     }else{
          //       ToastAndroid.show('确定要退出吗？',ToastAndroid.SHORT);
          //       now1 = new Date().getTime();
          //       console.log('home'+now1)
          //       return true;
          //     }
          // }
    render() {
        return (
            <View>
                <View style={{flexDirection:'row',height:80*s,backgroundColor:'#f23030',alignItems:'center',justifyContent:'center'}}>
                    <Button onPress={Actions.pop}>
                        <Icon size={30*s} style={{color:'#FFFFFF'}} name='left'/>
                    </Button>
                    <View style={{width:'80%',alignItems:'center'}}>
                        <Text style={{color:'#FFFFFF',fontSize:18}}>账号管理</Text>
                    </View>
                </View>
                <View style={{height:400}}></View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity  
                style={{width:'80%',height:70*s,borderRadius:12*s,backgroundColor:'#f23030',alignItems:'center',justifyContent:'center'}}
                onPress={this.exit}
                > 
                    <Text style={{color:'#ffffff'}}>退出登录</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
