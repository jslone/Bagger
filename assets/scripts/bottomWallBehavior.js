#pragma strict

var game : GameObject;

function OnTriggerEnter2D(obj) {
	audio.Play();
	game.SendMessage('GameOver');
}