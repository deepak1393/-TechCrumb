import React, { Component } from 'react';

import List from './List/List';
import './Lists.css';

class Lists extends Component {

	constructor(props) {
		super(props);
		this.state = {
			lists: JSON.parse(localStorage.getItem('lists')) || []
		}
	}

	render() {
		const lists = this.state.lists.map((list, index) => <List
			list={list}
			key={index}
			markThis={this.markThis.bind(this)}
			deleteThis={this.deleteThis.bind(this)} />
		);

		return (
			<div className="Notes col-md-6">
				<h1>Lists</h1>
				<input className="form-control" ref={(inp) => this.myInput = inp} />
				<ul>
					{lists}
				</ul>
			</div>
		);
	}

	componentDidMount() {
		this.myInput.onkeypress = function (e) {
			if (e.keyCode === 13) {
				this.setState((prevState) => {
					return {
						lists: [...prevState.lists, {
							id: Math.random().toString(36).substring(7),
							name: e.target.value,
							marked: false
						}]
					}
				});
				localStorage.setItem('lists', JSON.stringify(this.state.lists));
				e.target.value = '';
			}
		}.bind(this);
	}

	markThis(id) {
		this.setState((prevState) => {
			const objIndex = prevState.lists.findIndex(obj => obj.id === id);
			const lists = [...prevState.lists];
			lists[objIndex].marked = !lists[objIndex].marked;
			localStorage.setItem('lists', JSON.stringify(lists));
			return {
				lists: lists
			}
		});
	}

	deleteThis(id, e) {
		e.stopPropagation();
		this.setState((prevState) => {
			const objIndex = prevState.lists.findIndex(obj => obj.id === id);
			const lists = [...prevState.lists];
			lists.splice(objIndex, 1);
			localStorage.setItem('lists', JSON.stringify(lists));
			return {
				lists: lists
			}
		});
	}

}

export default Lists;