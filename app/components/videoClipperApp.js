import React from 'react';
import ReactDOM from 'react-dom';
import {VideoPlayer} from './videoPlayer'
import {VideoClipForm} from './VideoClipForm'
var update = require('react-addons-update');

export const VideoClipperApp = React.createClass({
	getInitialState: function() {
		return {
			src: this.props.src,
			clips: this.getInitialClips(),
			activeClip: 0,
			clipEditorActive: false
		};
	},

	getInitialClips: function() {
		return [{name:'Full Video', start: 0, stop: false}, {name:'Test Clip', start: 5, stop: 10}];
	},

	setActiveClip: function(clipIndex){
		if(this.state.clips[clipIndex] === this.getActiveClip()) {
			return; //selected clip is already active
		}
		var updatedState = update(this.state, { 
			activeClip:       { $set: clipIndex },
			clipEditorActive: { $set: false }
		});
		this.setState(updatedState);
	},

	getActiveClip: function(){
		return this.state.clips[this.state.activeClip];
	},

	addNewClip: function(clip) {
		var newClipIndex = this.state.clips.length;
		var updatedState = update(this.state, { 	
			clips:      { $push: [clip] },
			activeClip: { $set: newClipIndex } 
		});
		this.setState(updatedState);
	},

	deleteClip: function(clipIndex, e){
		this.state.clips.splice(clipIndex, 1)
		var updatedState = update(this.state, { 
			clips:      { $set: this.state.clips },
			activeClip: { $set: 0 }
		});
		this.setState(updatedState);
	},

	editClip: function(clip) {
		var index = this.state.activeClip;
		var updatedState = update(this.state, { 
			clips: { [index] : {$set: clip} },
			clipEditorActive: { $set: false }
		});
		this.setState(updatedState);
	},

	toggleClipEditor: function(){
		var toggledState = !this.state.clipEditorActive;
		var updatedState = update(this.state, { 
			clipEditorActive: { $set: toggledState }
		});
		this.setState(updatedState);
	},

	getActiveClipTemplate: function(clip, deleteHandler) {
		return (
			<span className="active-clip-control">
				{this.state.clipEditorActive &&
					<VideoClipForm name={clip.name} start={clip.start} stop={clip.stop} onSubmit={this.editClip}/>
				}
				{!this.state.clipEditorActive &&
					<div className="edit-delete">
						<a onClick={deleteHandler}>{'delete'}</a>
						<a onClick={this.toggleClipEditor}>{'edit'}</a>
					</div>
				}
		</span>);
	},

	getClipClassName: function(clip, index) {
		var className = 'video-clip';
		if (this.getActiveClip() === clip) { className += ' active' }
		if (index !==0 && this.state.clipEditorActive && this.getActiveClip() === clip) { className += ' editor' }
		return className;
	},

	getClipListingTemplate: function(clip, index){
		var clipClickHandler = this.setActiveClip.bind(this, index);
		var clipDeleteHandler = this.deleteClip.bind(this, index);
		return (
			<li className={this.getClipClassName(clip, index)} key={index}>
				<span className="display-name" onClick={clipClickHandler}>{clip.name}</span>
				{(this.getActiveClip() === clip && index !==0) && 
					this.getActiveClipTemplate(clip, clipDeleteHandler)
				}
				<span className="time">{clip.start}s{(clip.stop ? '-'+clip.stop+'s' : '')}</span>
			</li>
		); 
	},

	render: function() {
		var activeClip = this.getActiveClip();
		var thisComponent = this;

		return (
			<div className="video-clipper-app">	
				<VideoPlayer src={this.props.src} name={activeClip.name} start={activeClip.start} stop={activeClip.stop} />
				<ul className="video-clip-list">
					{this.state.clips.map(function(clip, index) { 
						return thisComponent.getClipListingTemplate(clip, index);
					})}
				</ul>
				<VideoClipForm onSubmit={this.addNewClip}/>
			</div>
		);
	}
});
