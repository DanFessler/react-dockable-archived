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

    return (
      <div style={style.root}>
        <div style={style.header}></div>

        <PanelGroup direction="row">
          {
            State.panels.map(function(panel, i, arr) {
              return <Panel
                index={i}
                key={panel.key? panel.key : i}
                resize={panel.resize}
                width={panel.size}
                windows={panel.windows}/>;
            }, this)
          }
        </PanelGroup>

        {/* testcase which breaks on safari */}
        {/* <PanelGroupTest direction="row" spacing={3}>
          <PanelGroupTest direction="column" spacing={3}>
          <div>test1</div>
          <div>test2</div>
          </PanelGroupTest>
          <PanelGroupTest direction="column" spacing={3}>
          <div>test1</div>
          <div>test2</div>
          </PanelGroupTest>
          <PanelGroupTest direction="column" spacing={3}>
          <div>test1</div>
          </PanelGroupTest>
          <PanelGroupTest direction="column" spacing={3}>
          <div>test1</div>
          <div>test2</div>
          <div>test3</div>
          </PanelGroupTest>
          <PanelGroupTest direction="column" spacing={3}>
          <div>test1</div>
          <div>test2</div>
          <div>test3</div>
          </PanelGroupTest>
        </PanelGroupTest> */}
      </div>
    );
  }
}));

export default App;
