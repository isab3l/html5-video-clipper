import React from 'react';
import ReactDOM from 'react-dom';
import {VideoPlayer} from './components/videoPlayer'
import {VideoClipForm} from './components/VideoClipForm'
import {VideoClipperApp} from './components/VideoClipperApp'

var update = require('react-addons-update');
var videoSource = 'http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4';

ReactDOM.render(
  <VideoClipperApp src={videoSource} />,
  document.getElementById('video-clipper')
);
