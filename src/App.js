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
    return State.resizePanel(i, delta.x);
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

    var panelWidths = State.panels.map(function(panel) {
      return { size: panel.size, resize: panel.resize }
    }, this)

    var panels = State.panels.map(function(panel, i, arr) {
      return <Panel index={i} key={panel.key? panel.key : i} windows={panel.windows} />
    }, this)

    return (
      <div style={style.root}>
        <div style={style.header}></div>

        <PanelGroup direction="row" panelWidths={panelWidths}>
          {panels}
        </PanelGroup>

      </div>
    );
  }
}));

export default App;
