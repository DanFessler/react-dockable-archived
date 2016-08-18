import requireDir from "webpack-requiredir";

var widgets = requireDir(require.context('./AppUI', true, /\.js$/));

export default widgets;
