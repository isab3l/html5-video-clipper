import React from 'react';
import ReactDOM from 'react-dom';
import {VideoPlayer} from './components/videoPlayer'
var update = require('react-addons-update');
var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

var VideoClipForm = React.createClass({
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
	},

	changeHandler: function(e) {
		var updatedState = update(this.state, { [e.target.className] : { $set: e.target.value } });
		this.setState(updatedState);
	}, 

	render: function() {
		return (
			<form className="clip-form" onSubmit={this.submitHandler}>
				<label>Name <input className="name"  value={this.state.name} onChange={this.changeHandler}></input></label>
				<label>Start <input className="start" value={this.state.start} onChange={this.changeHandler}></input>seconds</label>
				<label>Stop <input className="stop" value={this.state.stop} onChange={this.changeHandler}></input>seconds</label>
				<input type="submit" value="Submit"></input>
			</form>
		);
	}

})

var VideoClipperApp = React.createClass({
	getInitialState: function() {
		return {
			src: this.props.src,
			clips: this.getInitialClips(),
			activeClip: 0
		};
	},

	getInitialClips: function() {
		return [{name:'Full Video', start: 0, stop: false}, {name:'Test Clip', start: 5, stop: 10}];
	},

	setActiveClip: function(clipIndex){
		if(this.state.clips[clipIndex] === this.getActiveClip()) {
			return; //selected clip is already active
		}
		var updatedState = update(this.state, { activeClip: { $set: clipIndex } });
		this.setState(updatedState);
	},

	getActiveClip: function(){
		return (this.state.clips[this.state.activeClip] ? this.state.clips[this.state.activeClip] : this.state.clips[0]);
	},

	addNewClip: function(clip) {
		var updatedState = update(this.state, { clips: { $set: this.state.clips.concat(clip) } });
		this.setState(updatedState);
	},

	deleteClip: function(clipIndex, e){
		this.state.clips.splice(clipIndex, 1)
		var updatedState = update(this.state, { clips: {$set: this.state.clips} });
		this.setState(updatedState);
	},

	render: function() {
		var activeClip = this.getActiveClip();
		var thisComponent = this;

		return (
			<div className="video-clipper-app">
				<VideoPlayer src={this.props.src} name={activeClip.name} start={activeClip.start} stop={activeClip.stop} />
				<ul className="video-clip-list">
					{this.state.clips.map(function(clip, index) { 
						var clipClickHandler = thisComponent.setActiveClip.bind(thisComponent, index);
						var clipDeleteHandler = thisComponent.deleteClip.bind(thisComponent, index);
						return (
							<li className={'video-clip' + (thisComponent.getActiveClip() === clip ? ' active' : '')} key={index}>
								<span className="name" onClick={clipClickHandler}>{clip.name}</span>
								{(thisComponent.getActiveClip() === clip && index !==0) && 
									<span className="active-clip-control">
										<a onClick={clipDeleteHandler}>{'delete'}</a>
									</span>
								}
								<span className="time">{clip.start}s{(clip.stop ? '-'+clip.stop+'s' : '')}</span>
							</li>
						); 
					})}
				</ul>
				<VideoClipForm onSubmit={this.addNewClip}/>

			</div>
		);
	}
})

ReactDOM.render(
  <VideoClipperApp src={videoSource} />,
  document.getElementById('video-clipper')
);
