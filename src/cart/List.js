import React, { Component } from 'react'
import {View,Text,Button,ActivityIndicator} from 'react-native';

export default class List extends Component {
    constructor(){
        super()
        this.state = {
            data:[1,2,3,4,5,6],
            isLoad:false
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                isLoad:true
            })
        },1000)
    }
    render() {
        if(this.state.isLoad){
        return (

            <View>
                {
                    this.state.data.map((item)=>(
                    <Text key={item}>{item}</Text>
                    ))
                }
                
               
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
