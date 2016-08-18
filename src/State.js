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
      minWidth: 150,
      maxWidth: 150,
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

  resizePanel: function(panelIndex, delta, initialIndex, recurseMode) {

    // Default minimum size of panel
    var minsize = 128; var maxsize = 256;

    // make the changes and deal with the consequences later
    this.panels[panelIndex].width += delta;
    this.panels[panelIndex+1].width -= delta;


    // Min and max for THIS panel
    minsize = this.getPanelMinWidth(panelIndex);
    maxsize = this.getPanelMaxWidth(panelIndex);

    // if we made this panel too small
    if (this.panels[panelIndex].width < minsize) {
      delta = minsize - this.panels[panelIndex].width;
      console.log("poop1");

      if (panelIndex === 0)
        this.resizePanel(panelIndex, delta, initialIndex, recurseMode);
      else
        this.resizePanel(panelIndex-1, -delta, initialIndex, recurseMode);
    };

    // if we made this panel too big
    if (maxsize !== 0 && this.panels[panelIndex].width > maxsize) {
      delta = this.panels[panelIndex].width - maxsize;
      console.log("poop2");

      if (panelIndex === 0)
        this.resizePanel(panelIndex, -delta, initialIndex, recurseMode);
      else
        this.resizePanel(panelIndex-1, delta, initialIndex, recurseMode);
    };


    // Min and max for NEXT panel
    minsize = this.getPanelMinWidth(panelIndex+1);
    maxsize = this.getPanelMaxWidth(panelIndex+1);

    // if we made the next panel too small
    if (this.panels[panelIndex+1].width < minsize) {
      delta = minsize - this.panels[panelIndex+1].width;
      console.log("poop3");

      if (panelIndex+1 === this.panels.length-1)
        this.resizePanel(panelIndex, -delta, initialIndex, recurseMode);
      else
        this.resizePanel(panelIndex+1, delta, initialIndex, recurseMode);
    };

    // if we made the next panel too big
    if (maxsize !== 0 && this.panels[panelIndex+1].width > maxsize) {
      delta = this.panels[panelIndex+1].width - maxsize;
      console.log("poop4");

      if (panelIndex+1 === this.panels.length-1)
        this.resizePanel(panelIndex, delta, initialIndex, recurseMode);
      else
        this.resizePanel(panelIndex+1, -delta, initialIndex, recurseMode);
    };


    // if we've recursed our way back to where we started, exit
    if (initialIndex !== undefined) {
      if (!recurseMode && panelIndex === (recurseMode? 0 : initialIndex)) return
    }
    else { initialIndex = panelIndex; }
  },

  getPanelMinWidth(panelIndex) {
    return this.panels[panelIndex].minWidth? this.panels[panelIndex].minWidth : 150;
  },

  getPanelMaxWidth(panelIndex) {
    return this.panels[panelIndex].maxWidth? this.panels[panelIndex].maxWidth : 0;
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

    if (callback) callback();
  },

  resizeWindow: function(panelIndex, windowIndex, delta) {
    this.panels[panelIndex].windows[windowIndex].height += delta;
    this.panels[panelIndex].windows[windowIndex+1].height -= delta;
  }
});

export default State;
