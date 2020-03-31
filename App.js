/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React,{useEffect, useState} from 'react';
import {
  View,
  AsyncStorage,Dimensions,ToastAndroid,BackHandler,StyleSheet,
  Overlay
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {Router,Scene,Tabs,Actions, Lightbox,Modal} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import Home from './src/home/Home';
import Cart from './src/cart/Cart';
import My from './src/my/My';
import SwiperPage from './src/common/SwiperPage';
import MyRelease from './src/my/MyRelease';
import Register from './src/common/Register';
import Sort from './src/sort/Sort';
import Login from './src/common/Login';
import List from './src/cart/List';

const {width,scale} = Dimensions.get('window');
const s = width / 640;
//不弹出警告提示
console.disableYellowBox = true;

const App=() => {
  let [isLogin,setlogin] = useState(false);
  let [isInstall,setInstatll] = useState(true);
  let now = 0;
  let now1 = 0;

  let init =()=>{
    AsyncStorage.getItem('isInstall')
    .then(res=>{
      if(res){
        setInstatll(false);
      }
    })
    AsyncStorage.getItem('user')
    .then(res=>{
      let user = JSON.parse(res);
      if(!user){
        SplashScreen.hide();
      }
      if(user&&user.token){
        setlogin(true);
        SplashScreen.hide();
      }
    })
  }
  useEffect(()=>{
    init()
  },[])
  let afterInstall = ()=>{
    setInstatll(false);
    console.log('after install')
  }
  if(isInstall){
    return (
      <View style={{flex:1}}>
        <SwiperPage afterInstall={afterInstall}/>
      </View>
    )
  }
  return (
    <>
      <Router
        backAndroidHandler={()=>{
        }}
      >
      <Overlay>
        <Modal key="modal" hideNavBar>
          {/* <Lightbox key='lightbox'> */}
            <Scene initial={isLogin} key="root">
              <Tabs
              key='tabbar'
              hideNavBar
              activeTintColor='#f23030'
              inactiveTintColor='#767676'
              tabBarStyle={{backgroundColor:'#ffffff'}}
              >
                <Scene
                    key='homePage'
                    title="首页"
                    icon={
                      ({focused})=><Icon
                        color={focused ? '#f23030' : '#767676'}
                        name="home"
                        size={35*s}
                      />
                    }
                  >
                    <Scene hideNavBar key='home' component={Home}/>
                  </Scene>
                  <Scene
                    key='sortPage'
                    title="商品分类"
                    icon={
                      ({focused})=><Icon
                        color={focused ? '#f23030' : '#767676'}
                        name="appstore-o"
                        size={35*s}
                      />
                    }
                  >
                    <Scene hideNavBar key='sort' component={Sort}/>
                  </Scene>
                  <Scene
                    key='cartPage'
                    title="购物车"
                    icon={
                      ({focused})=><Icon
                        color={focused ? '#f23030' : '#767676'}
                        name="shoppingcart"
                        size={35*s}
                      />
                    }
                  >
                    <Scene key='cart' component={Cart}/>
                    <Scene hideTabBar hideNavBar key ='list' component={List}/>
                  </Scene>
                  <Scene
                    key='myPage'
                    title="个人中心"
                    icon={
                      ({focused})=><Icon
                        color={focused ? '#f23030' : '#767676'}
                        name="user"
                        size={35*s}
                      />
                    }
                  >
                    <Scene hideNavBar key='my' component={My}/>
                    <Scene hideNavBar hideTabBar key='release' component={MyRelease}/>
                  </Scene>
              </Tabs>
            </Scene>
          {/* </Lightbox> */}
          <Scene  key = "register" component={Register}/>
          <Scene initial={!isLogin} key = "login" component={Login}/>
        </Modal>
      </Overlay>
      </Router>
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
