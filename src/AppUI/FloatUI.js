import React from 'react';
import {observer} from "mobx-react";

import icon from "../icons/palette.svg";

export default {

  title: "Float",
  icon: icon,

  Widget: observer(React.createClass({
    render: function() {
      var style = {
        padding: 8,
        minWidth: 128,
      }
      return (
        <div style={style}>
          testing a floating window
        </div>
      )
    }
  }))
};
