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
    };

    let windows;
    let panelWidths;

    // if (this.props.expanded === true) {
      windows = this.props.windows.map(function(window, i) {
        return <Window key={i} window={window} expanded={this.props.expanded}/>
      }, this)

      panelWidths = this.props.windows.map(function(panel) {
        return {
          size: this.props.expanded? panel.size? panel.size : null : ((windows.length-1) * 29) + 10 + 3,
          resize: this.props.expanded? panel.resize? panel.resize : null : "fixed",
          minSize: panel.minSize? panel.minSize : null,
        }
      }, this)
    // }
    // else {
    //   windows = <div style={style.window}>
    //     {this.props.windows.map(function(window, i) {
    //       return <IconGroup key={i} window={window} isLast={i==this.props.windows.length-1}/>
    //     }, this)}
    //   </div>
    //
    //   panelWidths = this.props.windows.map(function(panel) {
    //     return {
    //       size: ((windows.length-1) * 29) + 10,
    //       resize: "fixed",
    //     }
    //   }, this)
    // }

    return (
      <div className="panel" style={style.panel}>
        {/* <div className="panelHeader" onClick={this.handleExpand} style={style.titlebar}><Grip length={16} height={5} /></div> */}
        <PanelGroup direction="column" panelWidths={panelWidths} spacing={1}>
          {windows}
        </PanelGroup>
      </div>
    )
  }

}));





export default Panel;
