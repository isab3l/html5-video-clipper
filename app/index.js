import React from 'react';
import ReactDOM from 'react-dom';
import {VideoPlayer} from './components/videoPlayer'
var update = require('react-addons-update');
var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

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
						return (
							<li className={'video-clip' + (thisComponent.getActiveClip() === clip ? ' active' : '')} key={index} onClick={clipClickHandler}>
								<span className="name">{clip.name}</span>
								{thisComponent.getActiveClip() === clip && <span className="active-clip-control">testing</span>}
								<span className="time">{clip.start}s{(clip.stop ? '-'+clip.stop+'s' : '')}</span>
							</li>
						); 
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
