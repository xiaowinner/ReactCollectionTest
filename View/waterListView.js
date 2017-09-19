import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View, TouchableHighlight, Image, Slider } from 'react-native';
import Masonry from 'react-native-masonry';
import FastImage from 'react-native-fast-image';
import TabNavigator from 'react-native-tab-navigator';
import axios from 'axios'



const data = [
    {
        user: {
            title: "囧囧兔 React-Native",
            name: "redlotus"
        },
        renderFooter: (user) => {
            return (
                <View key = 'brick-header' style = {{backgroundColor: 'white', padding: '5', paddingRight: 9, paddingLeft: 9}}>
                    <Text style = {{lineHeight: 20, fontSize: 14}}>{user.title}</Text>
                </View>
            )
        }
    }
];

const imagesData = [
    {uri: 'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/subject/K2zTtdai6JuAG0oR/a2b11bf51af3a74030a3873fb95d76f8.jpg?x-oss-process=style/w768'},
    {uri: 'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/subject/K2zTtdai6JuAG0oR/d455d04f4aeb2ca22ea0547ca36bd377.jpg?x-oss-process=style/w768'},
    {uri: 'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/subject/K2zTtdai6JuAG0oR/3e5ba901ccf4990669338c5d87f2f5f7.jpg?x-oss-process=style/w768'},
    {uri: 'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/subject/K2zTtdai6JuAG0oR/a2b11bf51af3a74030a3873fb95d76f8.jpg?x-oss-process=style/w768'}    
]

const jojotooImage = () => {
    <FastImage
        style = {{width: 400, height: 400}}
        source = {
            {
                uri: 'https://jojotoo-static.oss-cn-shanghai.aliyuncs.com/subject/K2zTtdai6JuAG0oR/a2b11bf51af3a74030a3873fb95d76f8.jpg?x-oss-process=style/w768',
                header: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal
            }
        }
        resizeMode = {FastImage.resizeMode.contain}
    />

}


const styles = StyleSheet.create({
    container:{
        flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',backgroundColor:'#F5FCFF'
    },
    thumbnail:{
        width:100,height:80
    },
    rightContainer:{
        flex:1
    },
    title:{
        fontSize:20,marginBottom:8,textAlign:'center'
    },
    year:{
        textAlign:'center'
    },
});


export default class waterListView extends Component {

    constructor() {
        super();
        this.state = {
            columns: 2,
            padding: 20,
            paddingLeft: 5,
            paddingRight: 5,
            selectedTab: "home",
            products: null
        };
    }

    fetchData() {

        var self = this;
        axios.get('https://api.jojotu.cn/v1/commerce/products')
        .then(function (response) {

          console.log(response);      

          let result = response.data.data[0].images  
          var resultModel = []

          

          result.forEach(function(element) {
              console.log(element.url)

              var currentUrl = {
                  uri: element.url
              }
              resultModel.push(currentUrl)
              
          }, this);

          console.log(resultModel)          

          self.setState({
              products: resultModel
          })
        })
        .catch(function (error) {
          console.log(error);
        });

    }

    componentDidMount() {

        this.fetchData();

    }

    lodingView()
    {
        return (
            <View style={styles.container}>
            <Text>
            正在加载商品数据......
            </Text>
            </View>
        );
    }

    mainView(products) {

        return (
            <View style = {{flex: 1, backgroundColor: '#f4f4f4'}}>
                <View style = {{flex: 1, flexGrow: 10, padding: this.state.padding}}>
                    <Masonry
                        sorted
                        bricks = {products}
                        columns = {this.state.columns}
                    />
                </View>
                <TabNavigator>
                     <TabNavigator.item 
                        title = "商城" 
                        tabBarStyle = { {height: 49} } 
                        onPress = { () => this.setState({selectedTab: "home"}) }
                     >
                     </TabNavigator.item>
                </TabNavigator>
            </View>
        )

    }


    render() {

        if (!this.state.products) {

            return this.lodingView();

        }

        console.log(this.state.products);        

        return this.mainView(this.state.products);

    }


}
