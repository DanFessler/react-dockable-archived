import {observable} from "mobx";

const widgets = {
  CheeseUI: "CheeseUI",
  PoopUI: "PoopUI",
  FloatUI: "FloatUI"
}

var State = observable({
  panels: [
    {
      size: 256,
      resize: "dynamic",
      expanded: true,
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
      size: 40,
      // minSize: 150,
      resize: "fixed",
      snap: [150],
      expanded: false,
      windows: [
        {
          size: 128,
          minSize: 200,

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
          float: true,
          widgets: [
            widgets.FloatUI
          ]
        },
      ]
    },
    {
      size: 256,
      resize: "stretch",
      expanded: true,
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
      expanded: true,
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
      expanded: true,
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
