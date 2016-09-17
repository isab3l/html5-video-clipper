import React from 'react';
var update = require('react-addons-update');

export const VideoClipForm = React.createClass({
	getInitialState: function() {
		return {
			name: this.props.name,
			start: this.props.start,
			stop: this.props.stop, 
			onSubmit: this.props.onSubmit
		}
	}, 

	submitHandler: function(e) {
		e.preventDefault();
		this.state.onSubmit({name: this.state.name, start: this.state.start, stop: this.state.stop});
		this.clearForm();
	},

	changeHandler: function(e) {
		var updatedState = update(this.state, { [e.target.className] : { $set: e.target.value } });
		this.setState(updatedState);
	},

	clearForm: function() {
		this.setState({name: '', start: '', stop: ''});
	},

	render: function() {
		return (
			<form className="clip-form" onSubmit={this.submitHandler}>
				<label>Name <input className="name"  value={this.state.name} onChange={this.changeHandler}></input></label>
				<label>Start <input className="start" placeholder="seconds" value={this.state.start} onChange={this.changeHandler}></input></label>
				<label>Stop <input className="stop" placeholder="seconds" value={this.state.stop} onChange={this.changeHandler}></input></label>
				<input type="submit" value="Submit"></input>
			</form>
		);
	}

});