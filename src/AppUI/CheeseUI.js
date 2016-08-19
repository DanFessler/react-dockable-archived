import React from 'react';
import {observable, computed, extendObservable} from "mobx";
import {observer} from "mobx-react";

export default {
  title: "Cheese",
  Widget: observer(React.createClass({

    componentWillMount() {
      extendObservable(this, {
        testvariable: 0
      })
    },

    handleClick: function() {
      this.testvariable++;
    },

    render: function() {
      var style = {
        padding: 8,
        minWidth: 128,
      }
      return (
        <div style={style}>
          <div onClick={this.handleClick}>testvariable: {this.testvariable}</div>
        </div>
      )
    }
  }))
};
