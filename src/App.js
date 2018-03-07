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

  updatePanelState: function(panels) {
    //State.panels = panels;
    // console.log(panels);
    for (var i=0; i<panels.length; i++) {
      // if (panels[i].size < 150) State.panels[i].expanded = false;
      // if (panels[i].size > 150) State.panels[i].expanded = true;
      State.panels[i].size = panels[i].size;
      State.panels[i].minSize = panels[i].minSize;
      State.panels[i].resize = panels[i].resize;
    }
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
        marginBottom: 1,
      },
      styleTest: {
        width: "100%",
        minWidth: 128,
        height: 256,
        backgroundColor: "grey",
      }
    }

    var panels = [];
    var panelWidths = [];

    for (var i=0; i<State.panels.length; i++) {

      let panel = State.panels[i];

      // if (panel.expanded === true && panel.size < 150) panel.expanded = false;
      // if (panel.expanded === false && panel.size > 150) panel.expanded = true;

      panelWidths.push({
        size: panel.size? panel.size : null,
        resize: panel.resize? panel.resize : null,
        minSize: panel.minSize? panel.minSize : null,
        snap: panel.snap && panel.snap.length > 0? panel.snap : [],
        // size: 36,
        // resize: "fixed",
      })
      panels.push(
        <Panel index={i} key={panel.key? panel.key : i} windows={panel.windows} expanded={panel.expanded}/>
      )
    }

    return (
      <div style={style.root}>
        <div style={style.header}></div>

        <PanelGroup direction="row" panelWidths={panelWidths} spacing={2} onUpdate={this.updatePanelState}>
          {panels}
        </PanelGroup>

      </div>
    );
  }
}));

export default App;
