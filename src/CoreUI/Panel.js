import React from 'react';
import PanelGroup from "../CoreUI/PanelGroup.js";
import Window from "./Window.js";
import widgets from "../widgets.js";
import {observer} from "mobx-react";
import reactMerge from 'react-merge-styles';

import State from "../State.js";

var Panel = observer(React.createClass({

  getInitialState: function() {
    return {
      shouldUpdate: false,
    }
  },

  handleExpand: function() {
    State.panels[this.props.index].expanded = !State.panels[this.props.index].expanded;
  },

  render: function() {

    var style = {
      panel: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
      },
      titlebar: {
        height: 12,
        // borderBottom: "1px solid rgba(0,0,0,0.075)",
        // marginTop: 1,
        // borderBottom: "none",
        backgroundColor: "rgb(66,66,66)",
        position: "relative",
      },
      panelToggle: {
        color: "grey",
        fontSize: "18px",
        position: "absolute",
        left: 2,
        top: -6
      },
      window: {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        borderRadius: 3,
        // border: "1px solid rgba(0,0,0,0.1)",
        // border: "1px solid rgba(255,255,255,0.125)",
      },
    };

    let windows;
    let panelWidths;

    if (this.props.expanded === true) {
      windows = this.props.windows.map(function(window, i) {
        return <Window key={i} window={window}/>
      }, this)

      panelWidths = this.props.windows.map(function(panel) {
        return {
          size: panel.size? panel.size : null,
          resize: panel.resize? panel.resize : null,
          minSize: panel.minSize? panel.minSize : null,
        }
      }, this)
    }
    else {
      windows = <div style={style.window}>
        {this.props.windows.map(function(window, i) {
          return <IconGroup key={i} window={window} isLast={i==this.props.windows.length-1}/>
        }, this)}
      </div>

      panelWidths = this.props.windows.map(function(panel) {
        return {
          size: ((windows.length-1) * 29) + 10,
          resize: "fixed",
        }
      }, this)
    }

    return (
      <div className="panel" style={style.panel}>
        {/* <div className="panelHeader" onClick={this.handleExpand} style={style.titlebar}><Grip length={16} height={5} /></div> */}
        <PanelGroup direction="column" panelWidths={panelWidths} spacing={3}>
          {windows}
        </PanelGroup>
      </div>
    )
  }

}));

var IconGroup = React.createClass({
  render: function() {

    var style = {
      container: {
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        flexGrow: this.props.isLast? 1 : 0,
        backgroundColor: "rgb(83,83,83)",
        color: "rgb(180,180,180)",
        fontSize: "8pt",
        border: "1px solid rgba(255,255,255,0.025)",
        borderBottom: "1px solid rgb(65,65,65)"
      },
    }

    return (
      <div style={style.container}>
        <Grip length={10}/>
        {
          this.props.window.widgets.map(function(widget, i) {
            var thiswidget = widgets[widget]
            // thiswidget.title
            return (
              // <div key={i} style={Object.assign({}, style.button, {backgroundImage: "url("+thiswidget.icon+")"})}>
              //   {/* {thiswidget.title} */}
              // </div>
                <WidgetButton key={i} icon={thiswidget.icon} label={thiswidget.title} />
            )
          }, this)
        }
      </div>
    )
  }
});

var Grip =React.createClass({
  render: function() {
    var style = {
      handle: {
        height: 4,
        fontSize: "6pt",
        textAlign: "center",
        padding: 3,
        color: "rgba(0,0,0,0.25)",
      },
      grip: {
        width: this.props.bold? 2 : 1,
        height: this.props.height? this.props.height : 4,
        marginRight: 1,
        backgroundColor: "rgba(0,0,0,0.2)",
        display: "inline-block",
        position: "relative",
        verticalAlign: "text-top"
      }
    }
    var grippies = [];
    for (var i=0; i<this.props.length; i++) {
      grippies.push(<div style={style.grip} key={i}></div>);
    }
    return (
      <div style={style.handle}>
        {grippies}
      </div>
    )
  }
})

var WidgetButton = React.createClass({
  getInitialState: function() {
    return {
      hover: false,
    }
  },
  handleMouseOver: function() {
    this.setState({hover: true})
  },
  handleMouseLeave: function() {
    this.setState({hover: false})
  },
  render: function() {
    var style = reactMerge({
      container: {
        boxSizing: "border-box",
        display: "flex",
        padding: 3,
        margin: 3,
        marginTop: 0,
        height: 26,
        minHeight: 26,
        borderRadius: 3,
        selected: {
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0.125)",
          // border: "1px solid rgba(0,0,0,0.125)",
        }
      },
      containerPadding: {
        display: "flex",
        overflow: "hidden",
      },
      button: {
        boxSizing: "border-box",
        marginRight: 3,
        width: 26,
        minWidth: 26,
        display: "flex",
        overflow: "hidden",
        flexGrow: 0,
      },
      icon: {
        filter: "invert(100%)",
        backgroundSize: "auto 80%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        // opacity: 0.75,
        backgroundImage: "url("+this.props.icon+")",
        flexGrow: 1,
        flexShrink: 0
      },
      label: {
        flexShrink: 1,
        lineHeight: "18px",
        fontWeight: "bold",
        color: "white",
        fontSize: "9px",
      }
    });
    return (
      <div onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={this.state.hover? style.container.selected : style.container}>
        <div style={style.containerPadding}>
          <div style={style.button}>
            <div style={style.icon}></div>
          </div>
          <div style={style.label}>{this.props.label}</div>
        </div>
      </div>
    )
  }
});



export default Panel;
