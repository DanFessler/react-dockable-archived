import {observable} from "mobx";

const widgets = {
  CheeseUI: "CheeseUI",
  PoopUI: "PoopUI"
}

var State = observable({
  panels: [
    {
      size: 256,
      resize: "dynamic",
      windows: [
        {
          size: 228,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      size: 150,
      resize: "fixed",
      windows: [
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      size: 256,
      resize: "stretch",
      windows: [
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      size: 256,
      resize: "dynamic",
      windows: [
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      size: 256,
      resize: "dynamic",
      windows: [
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    }
  ],

  insertColumn: function(i, position) {
    if (this.panels.length < 8) {
      this.panels.splice(i, 0, {
        key: this.panels.length,
        animate: true,
        width: "200px",
        state: "docked",
        display: "expanded",
        windows: [
          {widgets: [
            widgets.PoopUI,
          ]},
          {widgets: [
            widgets.CheeseUI,
          ]},
          {widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]},
        ]
      });
    }
  },

  resizePanel: function(panelIndex, delta) {

    // Default minimum size of panel
    var minsize = 128; var maxsize = 256;

    // track the progressive delta so we can report back how much this panel
    // actually moved after all the adjustments have been made
    var resultDelta = delta;

    // make the changes and deal with the consequences later
    this.panels[panelIndex].size += delta;
    this.panels[panelIndex+1].size -= delta;


    // Min and max for THIS panel
    minsize = this.getPanelMinSize(panelIndex);
    maxsize = this.getPanelMaxSize(panelIndex);

    // if we made this panel too small
    if (this.panels[panelIndex].size < minsize) {
      delta = minsize - this.panels[panelIndex].size;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, delta);
      else
        resultDelta += this.resizePanel(panelIndex-1, -delta);
    };

    // if we made this panel too big
    if (maxsize !== 0 && this.panels[panelIndex].size > maxsize) {
      delta = this.panels[panelIndex].size - maxsize;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, -delta);
      else
        resultDelta += this.resizePanel(panelIndex-1, delta);
    };


    // Min and max for NEXT panel
    minsize = this.getPanelMinSize(panelIndex+1);
    maxsize = this.getPanelMaxSize(panelIndex+1);

    // if we made the next panel too small
    if (this.panels[panelIndex+1].size < minsize) {
      delta = minsize - this.panels[panelIndex+1].size;

      if (panelIndex+1 === this.panels.length-1)
        resultDelta += this.resizePanel(panelIndex, -delta);
      else
        resultDelta += this.resizePanel(panelIndex+1, delta);
    };

    // if we made the next panel too big
    if (maxsize !== 0 && this.panels[panelIndex+1].size > maxsize) {
      delta = this.panels[panelIndex+1].size - maxsize;

      if (panelIndex+1 === this.panels.length-1)
        resultDelta += this.resizePanel(panelIndex, delta);
      else
        resultDelta += this.resizePanel(panelIndex+1, -delta);
    };

    return resultDelta;
  },

  getPanelMinSize(panelIndex) {
    if (this.panels[panelIndex].resize === "fixed") {
      if (!this.panels[panelIndex].fixedSize) {
        this.panels[panelIndex].fixedSize = this.panels[panelIndex].size;
      }
      return this.panels[panelIndex].fixedSize;
    }
    return 150;
  },

  getPanelMaxSize(panelIndex) {
    if (this.panels[panelIndex].resize === "fixed") {
      if (!this.panels[panelIndex].fixedSize) {
        this.panels[panelIndex].fixedSize = this.panels[panelIndex].size;
      }
      return this.panels[panelIndex].fixedSize;
    }
    return 0;
  },

  getPanelGroupMinSize(spacing) {
    var size = 0;
    for (var i = 0; i < this.panels.length; i++) {
      size += this.getPanelMinSize(i);
    }
    return size + ((this.panels.length-1) * spacing)
  },

  setPanelSize(panelIndex, size, callback) {
    this.panels[panelIndex].size = size;
    this.resizePanel(panelIndex-1, 0, undefined, true);

    if (callback && size < this.getPanelMinSize(panelIndex)) {
      callback();
    }
  },

  resizeWindow: function(panelIndex, windowIndex, delta) {
    this.panels[panelIndex].windows[windowIndex].height += delta;
    this.panels[panelIndex].windows[windowIndex+1].height -= delta;
  }
});

export default State;
