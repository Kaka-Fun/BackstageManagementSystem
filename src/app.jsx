/*
 * @Author: wyatt 
 * @Date: 2018-06-29 10:38:21 
 * @Last Modified by: wyatt
 * @Last Modified time: 2018-07-04 17:43:16
 */

// import 'font-awesome/css/font-awesome.min.css'
// import './index.css'
// import  './index.scss'

import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

class A extends React.Component{
	render(){
		return(
			<div>
				Component A 
				参数： {this.props.match.params.id}
				<Switch>
					<Route exact path={this.props.match.path}
						render={(route)=>{
							return <div>当前组件是不带参数的A</div>
						}}/>
					<Route path={`${this.props.match.path}/sub`}
						render={(route)=>{
							return <div>当前组件是sub的A</div>
						}}/>
					<Route path={`${this.props.match.path}/:id`} 
						render={(route)=>{
							return <div>当前组件是带参数的A，参数是{route.match.params.id}</div>
						}}/>
				</Switch>
			</div>
		)
	}
}

class B extends React.Component{
	render(){
		return(
			<div>Componnet B</div>
		)
	}
}

class Wrapper extends React.Component{
	render(){
		return(
			<div>
				<Link to="/a">组件A</Link>
				<br/>
				<Link to="/a/123">带参数的组件A</Link>
				<br/>
				<Link to="/a/sub">sub组件A</Link>
				<br/>
				<Link to="/b">组件B</Link>
				{this.props.children}
			</div>
		)
	}
}



ReactDOM.render(
	<Router>
		<Wrapper>
				<Route path="/a" component={A}/>
				<Route path="/b" component={B}/>
		</Wrapper>
	</Router>,
    document.getElementById('app')
);
