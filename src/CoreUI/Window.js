import React from 'react';
import reactMerge from "react-merge-styles";
import widgets from "../widgets.js";
import {observer} from "mobx-react";

var Window = observer(React.createClass({
  getInitialState: function() {
    return {
      height: "auto", //Math.random()*256 + 100,
      selected: 0,
    }
  },
  handleTabSelect: function(i) {
    this.setState({selected: i});
  },
  render: function() {
    var style = {
      window: {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        borderRadius: 3,
        // border: "1px solid rgb(56,56,56)",
        // border: "1px solid rgba(0,0,0,0.1)",
        // border: "1px solid rgba(255,255,255,0.125)",
      },
      content: {
        backgroundColor: "rgb(83,83,83)",
        color: "rgb(180,180,180)",
        fontSize: "8pt",
        flexGrow: 1,
        display: "flex",
        border: "1px solid rgba(255,255,255,0.025)",
      },
      titlebar: {
        position: "relative",
        height: 24,
        minHeight: 22,
        // borderBottom: "1px solid rgba(56,56,56,0.25)",
        boxSizing: "border-box",
        display: "flex",
        backgroundColor: "rgb(66,66,66)",
      },
      closebox: {
        boxSizing: "border-box",
        // borderBottom: "1px solid rgb(56,56,56)",
        // backgroundColor: "rgb(66,66,66)",
        color: "grey",
        width: 20,
        height: "calc(100% + 0px)",
        textAlign: "center",
        padding: "2px 4px",
        transform: "scaleX(1.2)",
        fontSize: "10px",
        flexShrink: 0,
        flexGrow: 0,
      },
    }

    var WidgetUI = widgets[this.props.window.widgets[this.state.selected]].Widget;

    return (
      <div className="window" style={style.window}>

        <div className="titlebar" style={style.titlebar}>
          {
            this.props.window.widgets.map(function(widget, i) {
              var thiswidget = widgets[widget]
              return (
                <WindowTab onClick={this.handleTabSelect} key={i} index={i} selected={i === this.state.selected ? true : false} title={ thiswidget.title } />
              );
            }, this)
          }
          <div style={{flexGrow:1}}></div>
          <div style={style.closebox}>☰</div>
        </div>

        <div className="content" style={style.content}>
          <WidgetUI />
        </div>

      </div>
    );
  }
}))

var WindowTab = React.createClass({
  getInitialState: function() {
    return {
      hovering: false,
    }
  },
  handleMouseOver: function(e) {
    e.preventDefault();
    this.setState({hovering: true});
  },
  handleMouseOut: function(e) {
    e.preventDefault();
    this.setState({hovering: false});
  },
  handleClick: function() {
    this.props.onClick(this.props.index);
  },
  render: function() {
    var style = reactMerge({
      tab: {
        position: "relative",
        height: "calc(100% + 1px)",
        padding: "6px 10px",
        boxSizing: "border-box",
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontSize: "9px",
        fontFamily: "verdana",
        fontWeight: "bold",
        borderRadius: "3px 3px 0 0",
        // marginRight: 1,
        // userSelect: "none",

        selected: {
          color: "rgb(200,200,200)",
          backgroundColor: "rgb(83,83,83)",
          border: "1px solid rgba(255,255,255,0.025)",
          borderBottom: 0,
        },
        unselected: {
          color: "grey",
          backgroundColor: this.state.hovering ? "rgba(83,83,83,0.5)" : "transparent",
          cursor: this.state.hovering ? "pointer" : "auto",
        }
      },
      closebox: {
        color: "grey",
        boxSizing: "border-box",
        width: 12,
        height: 12,
        textAlign: "center",
        padding: "0 4px",
        fontSize: "10px",
        flexShrink: 0,
        flexGrow: 0,

        position: "absolute",
        top: 1,
        right: 2,
        margin: 1,

        // borderLeft: "1px solid rgba(0,0,0,0.125)",
        // borderRadius: 1,
      },
      x: {
        position: "absolute",
        top: -1,
        left: 3,
      }
    })

    return (
      <div
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseOut}
        onClick={this.handleClick}
        style={this.props.selected ? style.tab.selected : style.tab.unselected}>
        {this.props.title}
        {/* <div style={style.closebox}>
          <div style={style.x}>x</div>
        </div> */}
      </div>
    );
  }
})

export default Window;
