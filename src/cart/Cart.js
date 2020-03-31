import React, { Component } from 'react'
import { Text, View, Button, Image ,Dimensions} from 'react-native'
import { Actions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width} = Dimensions.get('window');
const s = width/640;
export default class Cart extends Component {
  render() {
    return (
      <View>
        <View style={{marginTop:10*s,marginLeft:15*s,marginRight:15*s}}>
          <View style={{flexDirection:'row',height:80*s,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
            <View style={{width:'85%',flexDirection:'row'}}><Text>上好佳官方旗舰店</Text>
            <Icon size={30*s} style={{paddingLeft:25/3,paddingRight:25/3}} name='right'/>
            </View>
          </View>
          <View style={{justifyContent:'center',flexDirection:'row',paddingTop:15*s,paddingBottom:15*s,backgroundColor:'#fff'}}>
            <Image style={{height:200*s,width:200*s}} source={require('../../assets/pic2.png')}/>
            <View style={{width:'50%',marginLeft:10*s}}>
              <Text>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
              <TouchableOpacity style={{width:250*s,backgroundColor:'#ccc',marginTop:40*s,alignItems:'center'}}><Text style={{color:'#f1f1f'}}>【五袋】精装</Text></TouchableOpacity>
              <View style={{flexDirection:'row',marginTop:20*s}}>
                <Text style={{color:'red'}}>$36.00</Text>
                <Text style={{marginLeft:'50%'}}>-1+</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
