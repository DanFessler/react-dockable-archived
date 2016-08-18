import React from 'react';

var PanelGroup = React.createClass({
  getDefaultProps: function() {
    return {
      spacing: 1,
    };
  },
  handleResize: function(i, delta) {
    if (this.props.onResize){
      return this.props.onResize(i, delta);
    }
  },
  render: function() {
    var style = {
      container: {

        // this line is super important otherwise we get stuck in a recursive
        // loop when we resize the window too small
        minWidth: this.props.minSize? this.props.minSize : 0,

        display: "flex",
        flexDirection: this.props.direction,
        flexGrow: 1,
      },
      panel: {
        flexGrow: 0,
        display: "flex",
      },
    }

    // lets build up a new children array with added resize borders
    var children = [];
    for (var i=0; i < this.props.children.length; i++) {

      // give position info to children
      var metadata = {
        isFirst: (i === 0 ? true : false),
        isLast: (i === this.props.children.length-1 ? true : false),
      }

      // push children with added metadata
      children.push(React.cloneElement(
          this.props.children[i],
          {...metadata}
        )
      );

      // add a handle between panels
      if (i < this.props.children.length-1) {
        children.push(<Divider key={"divider"+i} panelID={i} handleResize={this.handleResize} dividerWidth={this.props.spacing} direction={this.props.direction} showHandles={this.props.showHandles}/>);
      }
    }

    return <div style={style.container}>{children}</div>
  },
})

var Divider = React.createClass({
  getDefaultProps: function() {
    return {
      dividerWidth: 1,
      handleBleed: 4,
    };
  },
  getInitialState: function () {
    return {
      dragging: false,
      initPos: {x:null,y:null},
    }
  },
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('mouseup', this.onMouseUp)
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove)
      document.removeEventListener('mouseup', this.onMouseUp)
    }
  },
  // calculate relative position to the mouse and set dragging=true
  onMouseDown: function (e) {
    // only left mouse button
    if (e.button !== 0) return
    this.setState({
      dragging: true,
      initPos: {
        x: e.pageX,
        y: e.pageY
      },
    })

    e.stopPropagation()
    e.preventDefault()
  },
  onMouseUp: function (e) {
    this.setState({dragging: false})
    e.stopPropagation()
    e.preventDefault()
  },

  onMouseMove: function (e) {
    if (!this.state.dragging) return

    var resultDelta = this.handleResize(
      this.props.panelID,
      {x: e.pageX - this.state.initPos.x, y: e.pageY - this.state.initPos.y}
    );

    // if we've resized the panel like intended, reset the initPos
    if (resultDelta !== 0) {
      this.setState({
        initPos: {
          x: e.pageX,
          y: e.pageY
        },
      })
    }

    e.stopPropagation()
    e.preventDefault()
  },

  handleResize(i, delta) {
    return this.props.handleResize(i, delta);
  },

  getHandleWidth: function() {
    return (this.props.dividerWidth + (this.props.handleBleed * 2));
  },
  getHandleOffset: function() {
    return (this.props.dividerWidth/2) - (this.getHandleWidth()/2);
  },
  render: function() {
    var style = {
      divider: {
        width:    this.props.direction === "row" ? this.props.dividerWidth : "auto",
        minWidth: this.props.direction === "row" ? this.props.dividerWidth : "auto",
        maxWidth: this.props.direction === "row" ? this.props.dividerWidth : "auto",
        height:    this.props.direction === "column" ? this.props.dividerWidth : "auto",
        minHeight: this.props.direction === "column" ? this.props.dividerWidth : "auto",
        maxHeight: this.props.direction === "column" ? this.props.dividerWidth : "auto",
        flexGrow: 0,
        position: "relative",
      },
      handle: {
        position: "absolute",
        width:  this.props.direction === "row"    ? this.getHandleWidth() : "100%",
        height: this.props.direction === "column" ? this.getHandleWidth() : "100%",
        left:   this.props.direction === "row"    ? this.getHandleOffset() : 0,
        top:    this.props.direction === "column" ? this.getHandleOffset() : 0,
        backgroundColor: this.props.showHandles? "rgba(0,128,255,0.25)" : "auto",
        cursor: this.props.direction === "row" ? "ew-resize" : "ns-resize",
        zIndex: 100,
      }
    }
    return (
      <div style={style.divider} onMouseDown={this.onMouseDown}>
        <div style={style.handle}></div>
      </div>
    );
  }
})

export default PanelGroup;
