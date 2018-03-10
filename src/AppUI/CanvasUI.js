import React from 'react';
import ReactDOM from 'react-dom';
import {observable, extendObservable} from "mobx";
import {observer} from "mobx-react";

import icon from "../icons/writing.svg";

var State = observable({
  sliderval: 50,
})

export default {

  title: "Canvas",
  icon: icon,

  Widget: observer(React.createClass({
    componentWillMount() {
      extendObservable(this, {
        testDragPos: {
          x: 10,
          y: 10,
        },
        sliderval: 50,
      })
    },
    handleSliderChange: function(e) {
      State.sliderval = e.currentTarget.valueAsNumber;
    },
    updatePos: function(x,y) {
      this.testDragPos = {
        x: x,
        y: y
      };
    },
    render: function() {
      var style = {
        container: {
          position: "relative",
          padding: 1,
          minWidth: 128,
          minHeight: 128,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column"
        },
        slider: {
          width: "100%"
        },
        canvas: {
          flexGrow:1,
          position:"relative",
          overflow:"hidden",
          backgroundColor: "rgb(40,40,40)",
          // border: "1px solid rgba(0,0,0,0.125)",
        }
      }
      return (
        <div style={style.container}>
          <div style={{padding:8}}>
            <input style={style.slider} onChange={this.handleSliderChange} type="range" value={State.sliderval}/>
          </div>
          <div style={style.canvas}></div>
        </div>
      )
    }
  }))
};
