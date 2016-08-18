import React from 'react';
import {observer} from "mobx-react";
import reactMerge from "react-merge-styles";
import Input from "../keyboardInput.js";

var HoverDiv = observer(React.createClass({
  getInitialState: function() {
    return {
      hover: false,
      hoverHandle: false,
    }
  },
  handleMouseOver: function() {
    this.setState({hover: true});
  },
  handleMouseOut: function() {
    this.setState({hover: false})
  },
  handleMouseOverHandle: function() {
    this.setState({hoverHandle: true});
  },
  handleMouseOutHandle: function() {
    this.setState({hoverHandle: false})
  },
  render: function() {
    // if (!Input.shiftkey && this.state.hover) this.setState({hover:false});

    var style = reactMerge({
      edge: {
        position: "absolute",
        zIndex: 100,
        borderRadius: 1,
        pointerEvents: Input.shiftkey ? "all" : "none",

        left: {
          left: -1, top: 0,
          width: 16, height: "100%",
        },
        right: {
          right: -1, top: 0,
          width: 16, height: "100%",
        },
        top: {
          right: 0, top: -1,
          width: "100%", height: 16,
        },
        bottom: {
          right: 0, bottom: -1,
          width: "100%", height: 16,
        }
      },
      border: {
        position: "absolute",
        zIndex: 100,
        borderRadius: 1,
        // transition: "background-color 0.2s",
        backgroundColor: (this.state.hover && Input.shiftkey)? "rgba(0,200,255,1)" : "rgba(0,200,255,0)",
        pointerEvents: "all",

        left: {
          left: this.props.first ? 1 : -1.5,
          top: 0,
          width: 4, height: "100%",
          cursor: !this.props.first ? "ew-resize" : "auto",
        },
        right: {
          right: this.props.last ? 1 : -1.5,
          top: 0,
          width: 4, height: "100%",
          cursor: !this.props.last ? "ew-resize" : "auto",
          // display: this.props.last ? "initial" : "none",
        },
        top: {
          right: 0,
          top: this.props.first ? 1 : -1.5,
          width: "100%", height: 4,
          cursor: !this.props.first ? "ns-resize" : "auto",
        },
        bottom: {
          right: 0,
          bottom: this.props.last ? 1 : -1.5,
          width: "100%", height: 4,
          cursor: !this.props.last ? "ns-resize" : "auto",
          // display: this.props.last ? "initial" : "none",
        }
      },
    });

    return (
      // Input.shiftkey?
      <div onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut} style={style.edge[this.props.edge]}>
        <div onClick={this.props.onClick} onMouseOver={this.handleMouseOverHandle} onMouseOut={this.handleMouseOutHandle} style={style.border[this.props.edge]}></div>
      </div>
      // :
      // null
    );
  }
}));

export default HoverDiv;
