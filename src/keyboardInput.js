import {observable} from "mobx";

var Input = observable({
  shiftkey: false,
})

//listen for keyboard events
window.onkeydown=function(event) {
	if (event.shiftKey) {Input.shiftkey = true}
}
window.onkeyup=function(event) {
	if (!event.shiftKey) {Input.shiftkey = false}
}

export default Input;
