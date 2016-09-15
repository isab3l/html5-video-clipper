import React from 'react';

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
										{thisComponent.state.clipEditorActive &&
											<VideoClipForm name={clip.name} start={clip.start} stop={clip.stop} onSubmit={thisComponent.editClip}/>
										}
										{!thisComponent.state.clipEditorActive &&
											<div className="edit-delete">
												<a onClick={clipDeleteHandler}>{'delete'}</a>
												<a onClick={thisComponent.toggleClipEditor}>{'edit'}</a>
											</div>
										}
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
});
