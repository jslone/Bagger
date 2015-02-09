#pragma strict

var grocs : Sprite[];
var minSpawnSpeed : float;
var maxSpawnSpeed : float;

function Start () {
	var x = Random.Range(0,grocs.Length);
	GetComponent(SpriteRenderer).sprite = grocs[x];
	rigidbody2D.velocity.x = (transform.position.x < 0 ? 1 : -1)*Random.Range(minSpawnSpeed,maxSpawnSpeed);

}