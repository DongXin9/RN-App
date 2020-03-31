import React, { Component } from 'react'
import {View, Text, Image, TextInput, AsyncStorage,TouchableOpacity, ToastAndroid,BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils';

export default class Register extends Component {
    constructor() {
      super();
      this.state = {
          username: '',
          pwd: '',
          pwd2:'',
          isloading: false
      }
    }
    userhandle = (text) => {
      this.setState({ username: text })
    }
    pwdhandle = (text) => {
      this.setState({ pwd: text })
    }
    pwdhandle2 = (text) => {
      this.setState({ pwd2: text })
    }
    register=()=>{
      if(this.state.username===''||this.state.pwd===''){
        ToastAndroid.show('手机号密码不能为空',ToastAndroid.SHORT)
      }else{
        if(this.state.pwd!==this.state.pwd2){
          ToastAndroid.show('两次密码输入不一致',ToastAndroid.SHORT)
        }else{
          this.setState({
            isloading: true
          })
          myFetch.post('/register',{username:this.state.username,pwd:this.state.pwd})
          .then(res=>{
            if(res.data.state==='1'){
              this.setState({
                isloading:false
              })
              ToastAndroid.show('该手机号已被注册',ToastAndroid.SHORT)
            }else{
              AsyncStorage.setItem('register',JSON.stringify(res.data))
              .then(()=>{
                  this.setState({
                      isloading:false
                  })
                  ToastAndroid.show('注册成功',ToastAndroid.SHORT);          
                  Actions.login();
              })
            }
          });
        }
      }
    }
    render() {
        return (
        <View style={{flex: 1,justifyContent: 'center'}}>
         <View
          style={{ alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入注册手机号"
                onChangeText={this.userhandle}
            />
          </View>
          
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请输入密码" 
                onChangeText={this.pwdhandle}
                secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="请再次输入密码" 
                onChangeText={this.pwdhandle2}
                secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
              style={{width:'80%'}}
              onPress={()=>Actions.login()}
            >
              <Text style={{marginLeft:'65%'}}>有账号？去登录</Text>
          </TouchableOpacity>
          {
              this.state.isloading
                ? 
                <TouchableOpacity 
                  style={{
                      width: '80%',
                      height: 40,
                      backgroundColor: '#ccc',
                      marginTop: 30,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  >
                  <Text>正在注册……</Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity 
                  style={{
                      width: '80%',
                      height: 40,
                      backgroundColor: '#f23030',
                      marginTop: 30,
                      alignItems: 'center',
                      justifyContent: 'center'
                  }}
                  onPress={this.register}>
                  <Text style={{color:'#ffffff'}}>注册</Text>
                </TouchableOpacity>
            }
        </View>
      </View>
        )
    }
}
