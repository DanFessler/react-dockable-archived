import React from 'react';
import ReactDOM from 'react-dom';
import {observable} from "mobx";
import {observer} from "mobx-react";
// import State from "../State.js";
import $ from "jquery";

var State = observable({
  sliderval: 50,

  testDragPos: {
    x: 10,
    y: 10,
  },
})

export default {
  title: "Poop2",
  Widget: observer(React.createClass({
    handleSliderChange: function(e) {
      State.sliderval = e.currentTarget.valueAsNumber;
    },
    render: function() {
      var style = {
        container: {
          position: "relative",
          padding: 8,
          minWidth: 128,
          minHeight: 128,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column"
        },
        slider: {
          width: "100%"
        },
        dragContainer: {
          flexGrow:1,
          position:"relative",
          overflow:"hidden",
          backgroundColor: "rgba(0,0,0,0.125)",
          border: "1px solid rgba(0,0,0,0.125)",
        }
      }
      return (
        <div style={style.container}>
          <div>This is Poop's Content.</div>
          <br/>
          <input style={style.slider} onChange={this.handleSliderChange} type="range" value={State.sliderval}/>
          <div style={style.dragContainer}>
            <Draggable initialPos={State.testDragPos}><div>this is a test div</div></Draggable>
          </div>
        </div>
      )
    }
  }))
};

var Draggable = React.createClass({
  getDefaultProps: function () {
    return {
      // allow the initial position to be passed in as a prop
      initialPos: {x: 0, y: 0}
    }
  },
  getInitialState: function () {
    return {
      dragging: false,
      rel: {x:null,y:null}, // position relative to the cursor
      abs: {x:null,y:null}
    }
  },
  // we could get away with not having this (and just having the listeners on
  // our div), but then the experience would be possibly be janky. If there's
  // anything w/ a higher z-index that gets in the way, then you're toast,
  // etc.
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },

  // calculate relative position to the mouse and set dragging=true
  onMouseDown: function (e) {
    // only left mouse button
    if (e.button !== 0) return
    var pos = $(ReactDOM.findDOMNode(this)).position();
    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      },
      abs: {
        x: pos.left,
        y: pos.left,
      }
    })
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseUp: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },
  onMouseMove: function (e) {
    if (!this.state.dragging) return

    State.testDragPos = {
      x: e.pageX - this.state.rel.x,
      y: e.pageY - this.state.rel.y
    };

    e.stopPropagation()
    e.preventDefault()
  },
  render: function () {
    // transferPropsTo will merge style & other props passed into our
    // component to also be on the child DIV.

    return React.cloneElement(
      this.props.children,
      {
        onMouseDown: this.onMouseDown,
        style: {
          cursor: this.state.dragging? "-webkit-grabbing" : "-webkit-grab",
          position: "absolute",
          padding: 8,
          left: this.props.initialPos.x + 'px',
          top: this.props.initialPos.y + 'px',
          width:100,height:100,
          boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          borderRadius: 4,
          backgroundColor: "white",
          color: "black",
        }
      },
      <div>{"x: "+this.state.rel.x}<br/>{"y: "+this.state.rel.y}<br/>{"dragging: "+this.state.dragging}</div>
    )
  }
});
