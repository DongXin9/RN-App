import React, { Component } from 'react'
import {View,Text,Image,Dimensions,StatusBar, FlatList, ScrollView,AsyncStorage,TouchableOpacity} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import Button from 'react-native-button';
import {Actions}  from  'react-native-router-flux';

const {width,scale} = Dimensions.get('window');
const s = width / 640;
const icons = [
    {
        img:require(`../../assets/my/2.png`),
        tit:'账户管理'
    },
    {
        img:require(`../../assets/my/3.png`),
        tit:'收货地址'
    },
    {
        img:require(`../../assets/my/4.png`),
        tit:'我的信息'
    },
    {
        img:require(`../../assets/my/5.png`),
        tit:'我的订单'
    },
    {
        img:require(`../../assets/my/6.png`),
        tit:'我的二维码'
    },
    {
        img:require(`../../assets/my/7.png`),
        tit:'我的积分'
    },
    {
        img:require(`../../assets/my/8.png`),
        tit:'我的收藏'
    }
];
const icons2 = [
    {
        img:require(`../../assets/my/9.png`),
        tit:'居家维修保养',
        btn:Actions.dft
    },
    {
        img:require(`../../assets/my/10.png`),
        tit:'出行接送',
        btn:Actions.dft
    },
    {
        img:require(`../../assets/my/11.png`),
        tit:'我的受赠人',
        btn:Actions.dft
    },
    {
        img:require(`../../assets/my/12.png`),
        tit:'我的住宿优惠',
        btn:Actions.dft
    },
    {
        img:require(`../../assets/my/13.png`),
        tit:'我的活动',
        btn:Actions.dft
    },
    {
        img:require(`../../assets/my/14.png`),
        tit:'我的发布',
        btn:Actions.release
    },
]
export default class My extends Component {
    constructor(){
        super();
        this.state = {
            imageUrl:''
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('photo')
        .then((res)=>
            res===null?
            this.setState({imageUrl:require('../../assets/my/icon.png')})
            :
            this.setState({imageUrl:{'uri':res}})
        ) 
    }
    componentDidUpdate(){
        let image = this.state.imageUrl;
        AsyncStorage.setItem('photo',image.uri
        ,()=>{console.log(image.uri)})
    }
    takephoto=()=>{
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            this.setState({imageUrl:{uri:image.path}})
        });
    }
    exit=()=>{
        // AsyncStorage.clear()
        AsyncStorage.removeItem('user')
        .then(()=>{
            Actions.login()
        })
    }
    render() {
        return (
            <View>
            <ScrollView>
                {/* 头像 */}
                <View>
                    <Image style={{width:640*s,height:376*s}} source={require('../../assets/background.png')}/>
                    <View style={{position:'absolute',left:0,width:640*s,height:376*s,justifyContent:'center',alignItems:'center'}}>
                        <Button onPress={()=>{this.takephoto()}}>
                            <Image style={{width:150*s,height:150*s,marginBottom:16*s,borderRadius:75*s}} source={this.state.imageUrl}/>
                        </Button>
                        <Text style={{color:'#ffffff'}}>BINNU DHILLON</Text>
                    </View>
                </View>
                {/* 我的个人中心 */}
                <View style={{flexDirection:'row',alignItems:'center',height:70*s,backgroundColor:'#ffffff',marginBottom:1}}>
                    <Image style={{height:40*s,width:32*s,marginLeft:20*s,marginRight:20*s}} source={require('../../assets/my/1-1.png')}/>
                    <Text>我的个人中心</Text>
                </View>
                <FlatList 
                    style={{backgroundColor:'#ffffff',paddingTop:20*s,paddingBottom:10*s,marginBottom:10*s}}
                    numColumns={3}
                    data={icons}
                    renderItem={({item})=>(
                        item.tit==='账户管理'?
                        <View style={{height:130*s,width:'33.3%',paddingTop:5*s,paddingBottom:5*s,alignItems:'center',justifyContent:'center'}}>
                        <Button style={{width:'100%'}}>
                            <View style={{alignItems:'center'}}>
                                <Image style={{height:35*s,width:35*s,margin:10*s}} source={item.img}/>
                                <Text>{item.tit}</Text>
                            </View>
                        </Button>
                        </View>
                        :
                        <View style={{height:130*s,width:'33.3%',justifyContent:'center',alignItems:'center',paddingTop:5*s,paddingBottom:5*s}}>
                            <Image style={{height:35*s,width:35*s,margin:10*s}} source={item.img}/>
                            <Text>{item.tit}</Text>
                        </View>
                    )}
                />
                {/* E族中心 */}
                <View style={{flexDirection:'row',alignItems:'center',height:70*s,backgroundColor:'#ffffff',marginBottom:1}}>
                    <Image style={{height:40*s,width:40*s,marginLeft:20*s,marginRight:20*s}} source={require('../../assets/my/1-2.png')}/>
                    <Text>E族活动</Text>
                </View>
                <FlatList 
                    style={{backgroundColor:'#ffffff',paddingTop:20*s,paddingBottom:10*s,marginBottom:10*s}}
                    numColumns={3}
                    data={icons2}
                    renderItem={({item})=>(
                        item.tit==='我的发布'?
                        <View style={{height:130*s,width:'33.3%',paddingTop:5*s,paddingBottom:5*s,alignItems:'center',justifyContent:'center'}}>
                            <Button style={{width:'100%'}} onPress={()=>Actions.release()}>
                                <View style={{alignItems:'center'}}>
                                    <Image style={{height:35*s,width:35*s,margin:10*s}} source={item.img}/>
                                    <Text>{item.tit}</Text>
                                </View>
                            </Button>
                        </View>
                        :
                        <View style={{height:130*s,width:'33.3%',paddingTop:5*s,paddingBottom:5*s,alignItems:'center',justifyContent:'center'}}>
                            <Button style={{width:'100%'}}>
                                <View style={{alignItems:'center'}}>
                                    <Image style={{height:35*s,width:35*s,margin:10*s}} source={item.img}/>
                                    <Text>{item.tit}</Text>
                                </View>
                            </Button>
                        </View>
                    )}
                />
                <TouchableOpacity onPress={this.exit} style={{justifyContent:'center',alignItems:'center',height:100*s}}>
                    <Text style={{fontSize:20*s,color:'#767676'}}>BINNU DHILLON  |  退出</Text>
                </TouchableOpacity>
            </ScrollView>
            </View>
        )
    }
}

