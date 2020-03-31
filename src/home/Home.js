import React, { Component } from 'react'
import {View,Text, StatusBar, StyleSheet,Dimensions, TextInput,ScrollView,Image, FlatList, Button, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Swiper from 'react-native-swiper';
import { Actions } from 'react-native-router-flux';
const {width,scale} = Dimensions.get('window');
const s = width / 640;
const list = [
    {
        tit: '居家维修保养',
        img: require('../../assets/icon1.png')
    },
    {
        tit: '住宿优惠',
        img: require('../../assets/icon2.png')
    },
    {
        tit: '出行接送',
        img: require('../../assets/icon3.png')
    },
    {
        tit: 'E族活动',
        img: require('../../assets/icon4.png')
    },
]
export default class HomePage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#f23030'/>
                <View style={styles.header}>
                    <View style={styles.search}>
                        <View style={styles.input}>
                            <Icon name='search1'
                            size={25*s}
                            style={{
                                paddingLeft:25/3,
                                paddingRight:25/3,
                                color:'#FFFFFF'
                            }}/>
                            <TextInput
                                placeholderTextColor='#FFFFFF'
                                placeholder='请输入您要搜索的关键字' style={{
                                padding:0,
                                color:'#FFFFFF'
                            }}/>
                        </View>
                        <Icon name='shoppingcart' 
                        size={35*s}
                        style={{
                            paddingLeft:25/3,
                            color:'#FFFFFF'
                        }}/>
                    </View>
                </View>
                <ScrollView>
                <View style={styles.container}>
                    <Swiper height={280*s} horizontal={true} autoplay autoplayTimeout={1} 
                    onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
                    dot={<View style={{backgroundColor:'#ffffff', width: 12*s, height: 12*s,borderRadius: 6*s, marginLeft: 12*s, marginRight: 12*s, marginTop: 2, marginBottom: 2}} />}
                    activeDot={<View style={{backgroundColor: '#f23030', width: 12*s, height: 12*s, borderRadius: 6*s, marginLeft: 12*s, marginRight: 12*s, marginTop: 2, marginBottom: 2}} />}
                    paginationStyle={{
                        bottom:13*s
                    }}
                    loop
                    >
                        <View style={styles.slide}>
                            <Image style={styles.image} source={require('../../assets/carousel.png')}/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={require('../../assets/carousel2.png')}/>
                        </View>
                        <View style={styles.slide}>
                            <Image style={styles.image} source={require('../../assets/carousel.png')}/>
                        </View>
                    </Swiper>
                </View>
                <FlatList
                    style={{backgroundColor:'#f5f5f5'}}
                    data={list}
                    renderItem={({item,id})=>(
                        <View key={id} style={{justifyContent:'center',height:120*s,flexDirection:'row',marginTop:10*s,marginRight:10*s,marginLeft:10*s,backgroundColor:'#ffffff'}}>
                            <View style={{alignItems:'center',justifyContent:'center',width:'20%'}}>
                                <Image source={item.img} style={{width:95*s,height:95*s}}/>
                            </View>
                            <View style={{marginLeft:30*s,justifyContent:'center',width:'63%'}}>
                                <Text style={{color:'#333333'}}>{item.tit}</Text>
                            </View>
                            <View style={{justifyContent:'center',width:'5%'}}>
                                <Icon name='right'/>
                            </View>
                        </View>
                    )}
                />
                <View style={{justifyContent:'center',alignItems:'center',marginTop:30*s}}>
                    <TouchableOpacity  style={{width:545*s,height:70*s,borderRadius:12*s,backgroundColor:'#f23030',alignItems:'center',justifyContent:'center'}}> 
                        <Text style={{color:'#ffffff'}}>发布需求</Text>
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',marginTop:60*s}}>
                    <Text style={{fontSize:20*s,color:'#767676'}}>@E族之家 版权所有</Text>
                </View>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header:{
        height:70*s,
        backgroundColor:'#f23030',
        justifyContent:'center',
        alignItems:'center'
    },
    search:{
        width:530*s,
        height:50*s,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    input:{
        width:530*s,
        height:50*s,
        backgroundColor:'#fbb8b8',
        alignItems:'center',
        flexDirection:'row',
        borderRadius:25*s,
    },
    side:{
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        flex: 1
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width:640*s,
        height:280*s,
        flex: 1
    }
})
