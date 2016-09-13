import React from 'react';

export const VideoPlayer = React.createClass({
	
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
		return (
			<video className="video-player" autoPlay="autoplay" controls preload="metadata" style={{maxWidth: '100%'}}>
      			<source src={this.getVideoUrl()}  type='video/mp4' />
    		</video>
		);
	}
	
});
