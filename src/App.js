import React from 'react';
import './App.css';
import Categories from './Categories';
import axios from 'axios';
import Products from './Products';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      categoriesList:[],
      productList:[],
      categoryName:''
    }
  }

  componentDidMount(){
    axios.get(`https://backend.ustraa.com/rest/V1/api/homemenucategories/v1.0.1?device_type=mob`)
    .then(res => {
      var categDropDown=[];
      res.data.category_list.map(data=>categDropDown.push({value:data.category_id,label:data.category_name}))
      this.setState({
        categoriesList:res.data.category_list,
        productList:res.data.product_list.products,
        categoryName:res.data.category_list[0].category_name
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  fetchProducts=(categ_id)=>{
    axios.get(`https://backend.ustraa.com/rest/V1/api/catalog/v1.0.1?category_id=${categ_id}`)
    .then(res => {
      this.setState({
        productList:res.data.products
      });
    }).catch((err)=>{
      console.log(err);
    })
  }

  changeCategFetchProd=(category)=>{
    this.fetchProducts(category.category_id);
    this.setState({categoryName:category.category_name});
  }

  render(){
    const{categoriesList,productList,categoryName}=this.state;
    return (
      <div className="container-fluid">
        <Categories categoriesList={categoriesList} fetchProducts={this.fetchProducts}/>
        <Products productList={productList} categoryName={categoryName} categoriesList={categoriesList}
          changeCategFetchProd={this.changeCategFetchProd}/>
      </div>
    )
  }
}

export default App;
