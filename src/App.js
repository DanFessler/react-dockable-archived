import React from 'react';
import {observer} from "mobx-react";
import State from "./State.js";
import PanelGroup from "./CoreUI/PanelGroup.js";
import Panel from "./CoreUI/Panel.js";

var App = observer(React.createClass({

  handleEdgeClick: function(i, position) {
    State.insertColumn(i, position);
  },

  handleResize: function(i, delta) {
    State.resizePanel(i, delta.x);
  },

  render: function() {
    var style = {
      root: {
        height: "100%",
        display: "flex",
        flexDirection: "column"
      },
      container: {
        // height: "100%",
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        transformStyle: "preserve-3d",
        perspective: 0,
      },
      header: {
        height: 32,
        minHeight: 32,
        backgroundColor: "rgb(83,83,83)",
      },
      styleTest: {
        width: "100%",
        minWidth: 128,
        height: 256,
        backgroundColor: "grey",
      }
    }

    return (
      <div style={style.root}>
        <PanelGroup direction="row" onResize={this.handleResize} minSize={State.getPanelGroupMinWidth(1)}>
          {
            State.panels.map(function(panel, i, arr) {
              return <Panel handleEdgeClick={this.handleEdgeClick} key={panel.key? panel.key : i} index={i} data={panel}/>;
            }, this)
          }
        </PanelGroup>
      </div>
    );
  }
}));

export default App;
