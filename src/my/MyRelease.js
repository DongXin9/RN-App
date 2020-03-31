import React, { Component } from 'react'
import {View,Text,TouchableOpacity, Dimensions, ToastAndroid,ActivityIndicator} from 'react-native'
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/AntDesign'
import { Actions } from 'react-native-router-flux'
const {width} = Dimensions.get('window');
const s = width/640;
export default class MyRelease extends Component {
    constructor(){
        super(),
        this.state={
            limit:15,
            page:1,
            topic:[],
            isloading:false
        }
    }
    componentDidMount(){
        let limit = this.state.limit;
        let page = this.state.page;
        fetch('https://cnodejs.org/api/v1/topics'+'?limit='+limit+'&page='+page)
        .then((res)=>res.json())
        .then((res)=>{
            setTimeout(()=>{
                this.setState({
                    isLoad:true
                })
            },1000);
            this.setState({topic:res.data,isloading:false})
        })
    }
    delPage=()=>{
        let page1 = this.state.page-1;
        let limit = this.state.limit;
        fetch('https://cnodejs.org/api/v1/topics'+'?limit='+limit+'&page='+page1)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({topic:res.data})
        })
        if(page1===0){
            ToastAndroid.show('没有上一页啦！',ToastAndroid.SHORT);
            this.setState({
                page:1
            })
        }else{
            this.setState({
                page:page1
            })
        }
        
    };
    addPage=()=>{
        let limit = this.state.limit;
        let page2 = this.state.page+1;
        fetch('https://cnodejs.org/api/v1/topics'+'?limit='+limit+'&page='+page2)
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({topic:res.data})
        })
        this.setState({
            page:page2
        })
    }
    render() {
        if(this.state.isLoad){
        return (
            <View style={{backgroundColor:'#FFFFFF'}}>
                <View style={{flexDirection:'row',height:80*s,backgroundColor:'#f23030',alignItems:'center',justifyContent:'center'}}>
                    <Button onPress={Actions.pop}>
                        <Icon size={30*s} style={{paddingLeft:25/3,paddingRight:25/3,color:'#FFFFFF'}} name='left'/>
                    </Button>
                    <View style={{width:'75%',alignItems:'center'}}><Text style={{color:'#FFFFFF',fontSize:18}}>我的发布</Text></View>
                    <Icon size={30*s} style={{paddingLeft:25/3,paddingRight:25/3,color:'#FFFFFF'}} name='ellipsis1'/>
                </View>
                <View>
                    {
                        this.state.topic.map((item)=>(
                            <View style={{flexDirection:'row',height:50*s,width:'95%',alignItems:'center',justifyContent:'center',marginLeft:'2.5%',marginRight:'2.5%'}}>
                                <Text style={{width:'60%',fontSize:12}} ellipsizeMode={"tail"} numberOfLines={1}>
                                    {
                                        item.title.length > 15 ? item.title.substring(0,15) + '……' : 
                                        item.title
                                    }
                                </Text>
                                <Text style={{marginLeft:'5%',fontSize:12}}>{item.create_at.substring(0,10)}</Text>
                                <Text style={{marginLeft:'5%',fontSize:12}}>
                                    {
                                    parseInt(Math.random()*(3-1)+1)===1 ? (
                                        <Text>已回复</Text>
                                    ) : (
                                        <Text style={{color:'#f23030'}}>待回复</Text>
                                    )
                                    }
                                </Text>
                            </View>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:60*s,marginBottom:40*s}}>
                    <TouchableOpacity style={{width:170*s,height:50*s,marginRight:65*s,backgroundColor:'#f23030',borderRadius:35*s,alignItems:'center',justifyContent:'center'}} 
                    onPress={this.delPage}>
                        <Text style={{color:'#ffffff'}}>上一页</Text>
                    </TouchableOpacity>
                    <Text style={{alignItems:'center',justifyContent:'center'}}>第{this.state.page}页</Text>
                    <TouchableOpacity style={{width:170*s,height:50*s,marginLeft:65*s,backgroundColor:'#f23030',borderRadius:35*s,alignItems:'center',justifyContent:'center'}} 
                    onPress={this.addPage}>
                        <Text style={{color:'#ffffff'}}>下一页</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
        }else{
            return(
                <View>
                    <ActivityIndicator size='large' color='red'/>
                </View>
            )
        }
    }
}
