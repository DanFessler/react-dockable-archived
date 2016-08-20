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
});

export default State;
