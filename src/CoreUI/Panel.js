import React from 'react';
import ReactDOM from 'react-dom';
import PanelGroup from "../CoreUI/PanelGroup.js";
import Window from "./Window.js";
import {observer} from "mobx-react";
import State from "../State.js";

var Panel = observer(React.createClass({

  getInitialState: function() {
    return {
      shouldUpdate: false,
    }
  },

  componentDidMount: function() {
    window.addEventListener('resize', this.calculateStretchWidth);
    this.calculateStretchWidth();
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.calculateStretchWidth);
  },

  onNextFrame: function(callback) {
    setTimeout(function () {
        window.requestAnimationFrame(callback)
    }, 0)
  },

  handleEdgeClick: function() {
    this.props.handleEdgeClick(this.props.index, "left");
  },

  handleResize: function(i, delta) {
    State.resizeWindow(this.props.index, i, delta.y);
  },

  calculateStretchWidth: function() {
    if (this.props.data.size === "stretch") {

      var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

      State.setPanelSize(
        this.props.index,
        rect.width,
        // recalcalculate again if the width is below minimum
        function() {this.onNextFrame(this.calculateStretchWidth)}.bind(this)
      );
    }
  },

  render: function() {

    var style = {
      panel: {
        display: "flex",
        position: "relative",
        flexDirection: "column",
        width: this.props.data.width,
        minWidth: !this.props.data.size === "stretch"? this.props.data.width : 0,
        flexGrow: this.props.data.size === "stretch"? 1 : 0,
        flexShrink: this.props.data.size === "stretch"? 1 : 0,
      },
      titlebar: {
        height: 12,
        border: "1px solid rgba(0,0,0,0.125)",
        borderBottom: "none",
        backgroundColor: "rgb(66,66,66)",
        position: "relative",
      },
      panelToggle: {
        color: "grey",
        fontSize: "18px",
        position: "absolute",
        left: 2,
        top: -6
      }
    };

    return (
      <div style={style.panel}>

        <div style={style.titlebar}><div style={style.panelToggle}>{"»"}</div></div>

        <PanelGroup direction="column" onResize={this.handleResize}>
          {
            this.props.data.windows.map(function(window, i) {
              return (
                <Window key={i} window={window}/>
              );
            }, this)
          }
        </PanelGroup>
      </div>
    )
  }

}));

export default Panel;
