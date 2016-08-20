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

    return (
      <div style={style.panel}>

        <div style={style.titlebar}><div style={style.panelToggle}>{"»"}</div></div>

        <PanelGroup direction="column">
          {
            this.props.windows.map(function(window, i) {
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
