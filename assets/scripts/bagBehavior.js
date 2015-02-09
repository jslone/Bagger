#pragma strict

var speed : float;
var mainCamera : Camera;
var game : GameObject;
var layer : int;

function leftAlign() {
	var v = mainCamera.ScreenToWorldPoint(new Vector3(0,0,0));
	transform.position.x = v.x - 2.5;
}

function Start () {
	leftAlign();
	rigidbody2D.velocity.x = speed;
}

function Update () {
	var v = mainCamera.ScreenToWorldPoint(new Vector3(Screen.width,0,0));
	if(transform.position.x > v.x + 2.5) {
		leftAlign();
	}
}

function OnTriggerEnter2D(groc : Collider2D) {
	if(groc.tag == "Groceries") {
		game.SendMessage('Score',groc.gameObject);
		audio.Play();
	}
}