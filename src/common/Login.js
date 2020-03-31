import React, {Component} from 'react';
import { View, Text, Image, TextInput, AsyncStorage , TouchableOpacity , BackHandler , ToastAndroid , Alert }  from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Actions } from 'react-native-router-flux';
import { myFetch } from '../utils';
export default class Login extends Component {
    constructor(){
        super();
        this.state={
            username:'',
            pwd:'',
            isLoading:false,
            now:0
        }
    }
    usernamehandle=(text)=>{
        this.setState({username:text})
    }
    pwdhandle=(text)=>{
        this.setState({pwd:text})
    }
    login=()=>{
      if(this.state.username===''||this.state.pwd===''){
        ToastAndroid.show('手机号和密码不能为空',ToastAndroid.SHORT)
      }else{
        this.setState({
          isLoading: true
        })
        myFetch.post('/login',{
            username:this.state.username,
            pwd:this.state.pwd
        }).then(res=>{
            if(res.data.state==='0'){
              ToastAndroid.show('登录成功',ToastAndroid.SHORT);
              AsyncStorage.setItem('user',JSON.stringify(res.data))
              .then(()=>{
                console.log(res.data)
                  this.setState({
                      isLoading:false
                  })
                  Actions.homePage();
              })
            }else if(res.data.state==='1'){
              this.setState({
                isLoading:false
              })
              ToastAndroid.show('用户名密码错误',ToastAndroid.SHORT)
            }else if(res.data.state==='2'){
              this.setState({
                isLoading:false
              })
              ToastAndroid.show('该用户名未注册',ToastAndroid.SHORT)
            }
        });
      }
        
    }
    
  render() {
    BackHandler.addEventListener('back',()=>{
      if(Actions.currentScene==='login'){
        if(new Date().getTime()-this.state.now <2000){
          BackHandler.exitApp()
          return false;
        }else{
          ToastAndroid.show('再按一次退出',ToastAndroid.SHORT);
          this.state.now =new Date().getTime();
          return true;
        }
      }else {
        if(Actions.currentScene !== 'home' && Actions.currentScene !== 'login'){
          Actions.pop();
          return true;
        }else{
          if(new Date().getTime()-this.state.now <2000){
            BackHandler.exitApp();
            return false;
          }else{
            ToastAndroid.show('确定要退出吗',ToastAndroid.SHORT);
            this.state.now =new Date().getTime();
            return true;
          }
        }
      }
    });
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
            <TextInput placeholder="手机号"
                onChangeText={this.usernamehandle}
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
            <TextInput placeholder="密码" 
                onChangeText={this.pwdhandle}
                secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
              style={{
                width:'80%',
              }}
              onPress={()=>Actions.register()}
            >
              <Text style={{marginLeft:'60%'}}>没有账号？去注册</Text>
            </TouchableOpacity>
            {
              this.state.isLoading
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
                  <Text>正在登录……</Text>
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
                  onPress={this.login}>
                  <Text style={{color:'#ffffff'}}>登录</Text>
                </TouchableOpacity>
            }
            
            
        </View>
        
      </View>
    );
  }
}