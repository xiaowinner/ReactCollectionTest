import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, ScrollView, View, TouchableHighlight, Image, Slider } from 'react-native';
import Masonry from 'react-native-masonry';
import FastImage from 'react-native-fast-image';
import TabNavigator from 'react-native-tab-navigator';
import axios from 'axios'


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

const navigationOptions = {
    title: "商城"
}


export default class waterListView extends Component {

    constructor() {
        super();
        this.state = {
            columns: 2,
            padding: 5,
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

          let result = response.data.data
          var resultModel = []

          console.log(result);      
          
          result.forEach(function(element) {

            var currentUrl = {
                uri: element.images[0].url
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
            <View style = {{flex: 11, backgroundColor: '#f4f4f4'}}>
                <View style = {{flex: 10, padding: this.state.padding, top: 0}}>
                    <Masonry
                        sorted
                        bricks = {products}
                        columns = {this.state.columns}
                        /* customImageComponent= {FastImage} */
                    />
                </View>
                <TabNavigator>
                     <TabNavigator.item 
                        title = "商城" 
                        tabBarStyle = { {height: 49, bottom: 0} } 
                        onPress = { () => this.setState({selectedTab: "home"}) }
                     >
                     </TabNavigator.item>
                </TabNavigator>
            </View>
        )

    }


    render() {

        const navigate = this.props.navigation;
        
        if (!this.state.products) {

            return this.lodingView();

        }

        console.log(this.state.products);        

        return this.mainView(this.state.products);

    }


}
