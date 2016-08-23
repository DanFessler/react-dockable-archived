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

    var testStyle = {
      flexGrow: 1,
      // flexDirection: "row",
      // width: "100%",
      // height: "100%",
      backgroundColor: "grey",
    }

    return (
      <div style={style.root}>
        <div style={style.header}></div>

        <PanelGroup direction="row" panelWidths={panelWidths}>
          {panels}
        </PanelGroup>

      </div>
      // <PanelGroup direction="row" spacing={2} panelWidths={[{size: 100}]}>
      //   <div style={testStyle}>div 1</div>
      //   <div style={testStyle}>div 2</div>
      //   <PanelGroup direction="column" spacing={2}>
      //     <PanelGroup direction="row" spacing={2} panelWidths={[{size: 100},{size: 100},{size: 100}]}>
      //       <div style={testStyle}>div 3</div>
      //       <div style={testStyle}>div 4</div>
      //       <div style={testStyle}>div 5</div>
      //     </PanelGroup>
      //     <div style={testStyle}>div 4</div>
      //     <div style={testStyle}>div 5</div>
      //   </PanelGroup>
      // </PanelGroup>
    );
  }
}));

export default App;
