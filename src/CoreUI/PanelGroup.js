import React from 'react';
import ReactDOM from 'react-dom';

var PanelGroup = React.createClass({

  getDefaultProps: function() {
    return {
      spacing: 1,
      direction: "row",
      panelWidths: []
    };
  },

  getInitialState: function() {
    var panels = []

    // load provided props into state
    if (this.props.children) {

      var defaultSize = 256;
      var defaultResize = "stretch";
      var stretchIncluded = false;
      var children = React.Children.toArray(this.props.children);

      for (var i=0; i<children.length; i++) {

        if (i < this.props.panelWidths.length) {
          var widthObj = {
            size: this.props.panelWidths[i].size? this.props.panelWidths[i].size : defaultSize,
            resize: this.props.panelWidths[i].resize? this.props.panelWidths[i].resize :
                    this.props.panelWidths[i].size? "dynamic" : defaultResize,
          }
          panels.push(widthObj);
        } else {
          // default values if no props are given
          panels.push({size: defaultSize, resize: defaultResize})
        }

        // if none of the panels included was stretchy, make the last one stretchy
        if (panels[i].resize === "stretch") stretchIncluded = true;
        if (!stretchIncluded && i === children.length-1) panels[i].resize = "stretch";
      }
    }

    return {
      panels: panels
    }
  },

  getSizeDirection: function(caps) {
    if (caps)
      return this.props.direction === "column" ? "Height" : "Width";
    else
      return this.props.direction === "column" ? "height" : "width";
  },

  render: function() {
    var style = {
      container: {
        // this line is super important otherwise we get stuck in a recursive
        // loop when we resize the window too small
        width: "100%", height: "100%",
        ["min"+this.getSizeDirection(true)]: this.getPanelGroupMinSize(this.props.spacing),

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
    var initialChildren = React.Children.toArray(this.props.children);
    var newChildren = [];
    var stretchIncluded = false;

    for (var i=0; i < initialChildren.length; i++) {

      var panelStyle = {
        [this.getSizeDirection()]: this.state.panels[i].size,
        ["min"+this.getSizeDirection(true)]: this.state.panels[i].resize === "stretch"? 0 : this.state.panels[i].size,

        flexGrow: this.state.panels[i].resize === "stretch"? 1 : 0,
        flexShrink: this.state.panels[i].resize === "stretch"? 1 : 0,
        display: "flex",
        overflow: "hidden",
        position: "relative",
      }

      // give position info to children
      var metadata = {
        isFirst: (i === 0 ? true : false),
        isLast: (i === initialChildren.length-1 ? true : false),
        // TODO for some reason this function isn't being assigned correctly
        onWindowResize: this.state.panels[i].resize === "stretch"? this.setPanelSize : null,
        resize: this.state.panels[i].resize
      }

      // if none of the panels included was stretchy, make the last one stretchy
      if (this.state.panels[i].resize === "stretch") stretchIncluded = true;
      if (!stretchIncluded && metadata.isLast) metadata.resize = "stretch";

      // push children with added metadata
      newChildren.push(
        <Panel style={panelStyle} key={"panel"+i} panelID={i} resize={this.state.panels[i].resize} {...metadata}>{initialChildren[i]}</Panel>
      );

      // add a handle between panels
      if (i < initialChildren.length-1) {
        newChildren.push(<Divider key={"divider"+i} panelID={i} handleResize={this.handleResize} dividerWidth={this.props.spacing} direction={this.props.direction} showHandles={this.props.showHandles}/>);
      }
    }

    return <div className="panelGroup" style={style.container}>{newChildren}</div>
  },

  handleResize: function(i, delta) {
    var tempPanels = this.state.panels.slice();
    var returnDelta = this.resizePanel(i, this.props.direction === "row" ? delta.x : delta.y, tempPanels);
    this.setState({panels: tempPanels});
    return returnDelta;
  },

  resizePanel: function(panelIndex, delta, panels) {

    // Default minimum size of panel
    var minsize = 128; var maxsize = 256;

    // track the progressive delta so we can report back how much this panel
    // actually moved after all the adjustments have been made
    var resultDelta = delta;

    // make the changes and deal with the consequences later
    panels[panelIndex].size += delta;
    panels[panelIndex+1].size -= delta;

    // Min and max for THIS panel
    minsize = this.getPanelMinSize(panelIndex, panels);
    maxsize = this.getPanelMaxSize(panelIndex, panels);

    // if we made this panel too small
    if (panels[panelIndex].size < minsize) {
      delta = minsize - panels[panelIndex].size;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, delta, panels);
      else
        resultDelta += this.resizePanel(panelIndex-1, -delta, panels);
    };

    // if we made this panel too big
    if (maxsize !== 0 && panels[panelIndex].size > maxsize) {
      delta = panels[panelIndex].size - maxsize;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, -delta, panels);
      else
        resultDelta += this.resizePanel(panelIndex-1, delta, panels);
    };


    // Min and max for NEXT panel
    minsize = this.getPanelMinSize(panelIndex+1, panels);
    maxsize = this.getPanelMaxSize(panelIndex+1, panels);

    // if we made the next panel too small
    if (panels[panelIndex+1].size < minsize) {
      delta = minsize - panels[panelIndex+1].size;

      if (panelIndex+1 === panels.length-1)
        resultDelta += this.resizePanel(panelIndex, -delta, panels);
      else
        resultDelta += this.resizePanel(panelIndex+1, delta, panels);
    };

    // if we made the next panel too big
    if (maxsize !== 0 && panels[panelIndex+1].size > maxsize) {
      delta = panels[panelIndex+1].size - maxsize;

      if (panelIndex+1 === panels.length-1)
        resultDelta += this.resizePanel(panelIndex, delta, panels);
      else
        resultDelta += this.resizePanel(panelIndex+1, -delta, panels);
    };

    return resultDelta;
  },

  getPanelMinSize: function(panelIndex, panels) {
    if (panels[panelIndex].resize === "fixed") {
      if (!panels[panelIndex].fixedSize) {
        panels[panelIndex].fixedSize = panels[panelIndex].size;
      }
      return panels[panelIndex].fixedSize;
    }
    return 20;
  },

  getPanelMaxSize: function(panelIndex, panels) {
    if (panels[panelIndex].resize === "fixed") {
      if (!panels[panelIndex].fixedSize) {
        panels[panelIndex].fixedSize = panels[panelIndex].size;
      }
      return panels[panelIndex].fixedSize;
    }
    return 0;
  },

  getPanelGroupMinSize: function(spacing) {
    var size = 0;
    for (var i = 0; i < this.state.panels.length; i++) {
      size += this.getPanelMinSize(i, this.state.panels);
    }
    return size + ((this.state.panels.length-1) * spacing)
  },

  setPanelSize: function(panelIndex, size, callback) {

    size = this.props.direction === "column"? size.y : size.x;

    if (size !== this.state.panels[panelIndex].size){
      var tempPanels = this.state.panels;
      tempPanels[panelIndex].size = size;
      this.setState({panels:tempPanels});

      if (panelIndex > 0) {
        this.handleResize(panelIndex-1, {x:0, y:0});
      }
      else if (this.state.panels.length > 2) {
        this.handleResize(panelIndex+1, {x:0, y:0});
      }

      if (callback) {
        callback();
      }
    }
  },
})

var Panel = React.createClass({
  onResizeObjectLoad() {
    this.refs.resizeObject.contentDocument.defaultView.addEventListener(
    "resize", () => this.calculateStretchWidth());
  },

  componentDidMount: function() {
    if (this.props.resize === "stretch") {
      this.refs.resizeObject.addEventListener("load", () => this.onResizeObjectLoad());
      this.refs.resizeObject.data = "about:blank";
      // window.addEventListener('resize', this.calculateStretchWidth);
      this.calculateStretchWidth();
    }
  },
  componentWillUnmount: function() {
    // window.removeEventListener('resize', this.calculateStretchWidth);
  },

  onNextFrame: function(callback) {
    setTimeout(function () {
        window.requestAnimationFrame(callback)
    }, 0)
  },

  calculateStretchWidth: function() {
    if (this.props.onWindowResize !== null) {
      var rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      this.props.onWindowResize(
      // this.setPanelSize(
        this.props.panelID,
        {x:rect.width, y:rect.height},
        // recalcalculate again if the width is below minimum
        function() {this.onNextFrame(this.calculateStretchWidth)}.bind(this)
      );
    }
  },

  render: function() {
    var style = {
      resizeObject: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        // IE & Edge show a black line.
        opacity: 0,
      }
    }
    const resizeObject = this.props.resize === "stretch" ? <object style={style.resizeObject} ref="resizeObject" type="text/html"></object> : null;
    return (
      <div className="panelWrapper" style={this.props.style}>
        {resizeObject}
        {this.props.children}
      </div>
    )
  }
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
      <div className="divider" style={style.divider} onMouseDown={this.onMouseDown}>
        <div style={style.handle}></div>
      </div>
    );
  }
})

export default PanelGroup;
