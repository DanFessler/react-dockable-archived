import React from 'react';
import PanelGroup from "../CoreUI/PanelGroup.js";
import Window from "./Window.js";
import {observer} from "mobx-react";

var Panel = observer(React.createClass({

  getInitialState: function() {
    return {
      shouldUpdate: false,
    }
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

    var panelWidths = this.props.windows.map(function(panel) {
      return { size: panel.size, resize: panel.resize }
    }, this)

    var windows = this.props.windows.map(function(window, i) {
      return <Window key={i} window={window}/>
    }, this)

    return (
      <div className="panel" style={style.panel}>
        <div className="panelHeader" style={style.titlebar}><div style={style.panelToggle}>{"»"}</div></div>

        <PanelGroup direction="column" panelWidths={panelWidths}>
          {windows}
        </PanelGroup>

      </div>
    )
  }

}));

export default Panel;
