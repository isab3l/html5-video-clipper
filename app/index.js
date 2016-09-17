import React from 'react';
import ReactDOM from 'react-dom';
import {VideoClipperApp} from './components/VideoClipperApp'

var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

ReactDOM.render(
  <VideoClipperApp src={videoSource} />,
  document.getElementById('video-clipper')
);
