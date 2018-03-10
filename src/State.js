import {observable} from "mobx";

const widgets = {
  TestPanelUI: "TestPanelUI",
  CanvasUI: "CanvasUI",
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
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
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
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
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
            widgets.TestPanelUI,
            widgets.CanvasUI,
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
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
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
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
        {
          size: 128,
          widgets: [
            widgets.TestPanelUI,
            widgets.CanvasUI,
          ]
        },
      ]
    }
  ],
});

export default State;
