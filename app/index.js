import React from 'react';
import ReactDOM from 'react-dom';

var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

var VideoPlayer = React.createClass({
	getInitialState: function() {
		return {
			src: this.props.src
		};
	},

	render: function() {
		return (
			<video controls preload="metadata" style={{maxWidth: '100%'}}>
      			<source src={this.props.src}  type='video/mp4' />
    		</video>
		);
	}
});

ReactDOM.render(
  <VideoPlayer src={videoSource}/>,
  document.getElementById('video-clipper')
);
