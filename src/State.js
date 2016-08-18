import {observable} from "mobx";

const widgets = {
  CheeseUI: "CheeseUI",
  PoopUI: "PoopUI"
}

var State = observable({
  panels: [
    {
      key: 0,
      width: 256,
      size: "dynamic",
      windows: [
        {
          height: 228,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      key: 5,
      width: 150,
      size: "fixed",
      windows: [
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      key: 2,
      width: 256,
      size: "stretch",
      windows: [
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      key: 3,
      width: 256,
      size: "dynamic",
      windows: [
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
      ]
    },
    {
      key: 4,
      width: 256,
      size: "dynamic",
      windows: [
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
          widgets: [
            widgets.CheeseUI,
            widgets.PoopUI,
          ]
        },
        {
          height: 128,
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

    // save old width so re can report back how much this panel actually moved
    // after all the adjustments have been made
    var resultDelta = delta;

    // make the changes and deal with the consequences later
    this.panels[panelIndex].width += delta;
    this.panels[panelIndex+1].width -= delta;


    // Min and max for THIS panel
    minsize = this.getPanelMinWidth(panelIndex);
    maxsize = this.getPanelMaxWidth(panelIndex);

    // if we made this panel too small
    if (this.panels[panelIndex].width < minsize) {
      delta = minsize - this.panels[panelIndex].width;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, delta);
      else
        resultDelta += this.resizePanel(panelIndex-1, -delta);
    };

    // if we made this panel too big
    if (maxsize !== 0 && this.panels[panelIndex].width > maxsize) {
      delta = this.panels[panelIndex].width - maxsize;

      if (panelIndex === 0)
        resultDelta += this.resizePanel(panelIndex, -delta);
      else
        resultDelta += this.resizePanel(panelIndex-1, delta);
    };


    // Min and max for NEXT panel
    minsize = this.getPanelMinWidth(panelIndex+1);
    maxsize = this.getPanelMaxWidth(panelIndex+1);

    // if we made the next panel too small
    if (this.panels[panelIndex+1].width < minsize) {
      delta = minsize - this.panels[panelIndex+1].width;

      if (panelIndex+1 === this.panels.length-1)
        resultDelta += this.resizePanel(panelIndex, -delta);
      else
        resultDelta += this.resizePanel(panelIndex+1, delta);
    };

    // if we made the next panel too big
    if (maxsize !== 0 && this.panels[panelIndex+1].width > maxsize) {
      delta = this.panels[panelIndex+1].width - maxsize;

      if (panelIndex+1 === this.panels.length-1)
        resultDelta += this.resizePanel(panelIndex, delta);
      else
        resultDelta += this.resizePanel(panelIndex+1, -delta);
    };

    return resultDelta;
  },

  getPanelMinWidth(panelIndex) {
    if (this.panels[panelIndex].size === "fixed") {
      if (!this.panels[panelIndex].fixedWidth) {
        this.panels[panelIndex].fixedWidth = this.panels[panelIndex].width;
      }
      return this.panels[panelIndex].fixedWidth;
    }
    return 150;
  },

  getPanelMaxWidth(panelIndex) {
    if (this.panels[panelIndex].size === "fixed") {
      if (!this.panels[panelIndex].fixedWidth) {
        this.panels[panelIndex].fixedWidth = this.panels[panelIndex].width;
      }
      return this.panels[panelIndex].fixedWidth;
    }
    return 0;
  },

  getPanelGroupMinWidth(spacing) {
    var width = 0;
    for (var i = 0; i < this.panels.length; i++) {
      width += this.getPanelMinWidth(i);
    }
    return width + ((this.panels.length-1) * spacing)
  },

  setPanelSize(panelIndex, width, callback) {
    this.panels[panelIndex].width = width;
    this.resizePanel(panelIndex-1, 0, undefined, true);

    if (callback && width < this.getPanelMinWidth(panelIndex)) {
      callback();
    }
  },

  resizeWindow: function(panelIndex, windowIndex, delta) {
    this.panels[panelIndex].windows[windowIndex].height += delta;
    this.panels[panelIndex].windows[windowIndex+1].height -= delta;
  }
});

export default State;
