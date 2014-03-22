`import ui.TextView as TextView;`

exports = Class GC.Application, () ->

	this.initUI = () ->
		textview = new TextView(
			superview: this.view,
			layout: "box",
			text: "Hello, world!",
			color: "white"
		)

	this.launchUI = () ->
