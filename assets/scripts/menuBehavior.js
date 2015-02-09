#pragma strict

var startTexture : Texture;
var creditsTexture : Texture;

function Update () {
	if(Input.GetKeyDown(KeyCode.Escape)) {
		Application.Quit();
	}
}

function OnGUI() {
	var width : int = Screen.width/2;
	var yPos : int = Screen.height/2 + 40;
	if(GUI.Button(Rect(width/2,yPos,width,width/2),startTexture,GUIStyle.none)) {
		Application.LoadLevel('game');
	}
	if(GUI.Button(Rect(width/2,yPos + width/2 + 20,width,width/2),creditsTexture,GUIStyle.none)) {
		Application.LoadLevel('credits');
	}
}