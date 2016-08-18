import React from 'react';

export default {
  title: "Cheese",
  Widget: React.createClass({
    render: function() {
      var style = {
        padding: 8,
        minWidth: 128,
      }
      return (
        <div style={style}>
          <div>This is Cheese's Content</div>
        </div>
      )
    }
  })
};
