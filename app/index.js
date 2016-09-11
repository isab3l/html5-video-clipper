import React from 'react';
import ReactDOM from 'react-dom';
var update = require('react-addons-update');

var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

var VideoPlayer = React.createClass({
	getInitialState: function() {
		return {
			src: this.props.src,
			start: this.props.start,
			stop: this.props.stop
		};
	},

	getVideoUrl: function() {
		return this.state.src.concat('#t=' +
			(this.state.start || '') +
			(this.state.stop ? ',' + this.state.stop : '')
		);
	},

	componentWillReceiveProps: function(nextProps){
		this.setState(nextProps);
	},

	componentDidUpdate: function(){
		var video = document.getElementsByClassName('video-player')[0];
		if (video) { video.load(); } //forces the video to restart and play new clip
	},

	render: function() {
		console.log(this.getVideoUrl())
		return (
			<video className="video-player" autoPlay="autoplay" controls preload="metadata" style={{maxWidth: '100%'}}>
      			<source src={this.getVideoUrl()}  type='video/mp4' />
    		</video>
		);
	}
	
});

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
		var updatedState = update(this.state, { activeClip: { $set: clipIndex } });
		this.setState(updatedState);
	},

	getActiveClip: function(){
		return this.state.clips[this.state.activeClip];
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
						return <li key={index} onClick={clipClickHandler}> {clip.name} - {clip.start}s - {clip.stop}s </li>; 
					})}
				</ul>
			</div>
		);
	}
})

ReactDOM.render(
  <VideoClipperApp src={videoSource} />,
  document.getElementById('video-clipper')
);
