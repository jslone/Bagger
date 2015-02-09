#pragma strict

var mainCam : Camera;
var spawn : GameObject;
var startTime : float;
var spawnTime : float;
var touchRadius : float;
var touchPower : float;
var leftWall : BoxCollider2D;
var rightWall : BoxCollider2D;
var bottomWall : BoxCollider2D;
var playAgainTexture : Texture;
var quitTexture : Texture;
var score : int;
var gameRunning : boolean;
var gameCount : int;
var UIGameOver : GameObject;
var UIScoreText : UI.Text;
var UIGameOverScoreText : UI.Text;

function Start () {
	var size3 = mainCam.ScreenToWorldPoint(new Vector3(0,2.0*Screen.height,0));
	var size2 = new Vector2(10,size3.y);
	leftWall.size = size2;
	rightWall.size = size2;
	
	size3 = mainCam.ScreenToWorldPoint(new Vector3(2.0*Screen.width,0,0));
	size2 = new Vector2(size3.x,10);
	bottomWall.size = size2;
	
	var posLeft3 = mainCam.ScreenToWorldPoint(new Vector3(0,Screen.height/2,0));
	var posRight3 = mainCam.ScreenToWorldPoint(new Vector3(Screen.width,Screen.height/2,0));
	var posBottom3 = mainCam.ScreenToWorldPoint(new Vector3(0,0,0));
	
	var posLeft2 = new Vector2(posLeft3.x - 5,posLeft3.y);
	var posRight2 = new Vector2(posRight3.x + 5,posRight3.y);
	var posBottom2 = new Vector2(0,posBottom3.y - 10.12);
	
	leftWall.center = posLeft2;
	rightWall.center = posRight2;
	bottomWall.center = posBottom2;
	
	audio.Play();
	gameCount = -1;
	startGame();
}

function startGame() {
	gameRunning = true;
	gameCount++;
	score = 0;
	spawnGroceries();
}

function spawnGroceries() {
	var spawnX = [0,0];
	spawnX[0] = mainCam.ScreenToWorldPoint(new Vector3(0,0,0)).x;
	spawnX[1] = mainCam.ScreenToWorldPoint(new Vector3(Screen.width,0,0)).x;
	var spawnY = 2.56;
	
	var currGameCount = gameCount;
	yield WaitForSeconds (startTime);
	while(gameRunning && currGameCount == gameCount) {
		var spawnPosition = new Vector3(spawnX[Random.Range(0,spawnX.Length)],spawnY,0);
		var spawnRotation = Quaternion.identity;
		var groc = Instantiate(spawn,spawnPosition,spawnRotation);
		
		yield WaitForSeconds (spawnTime);
	}
}
/*
function OnGUI() {
	guiText.text = 'Score: ' + score;
	if(!gameRunning) {
		var text : String;
		if(score > PlayerPrefs.GetInt('highScore')) {
			PlayerPrefs.SetInt('highScore',score);
			text = 'New High Score: ' + score;
		}
		else {
			text = 'Score: ' + score;
		}
		GUI.Box(Rect(0,0,Screen.width,Screen.height),GUIContent.none);
		
		var width : int = Screen.width/2;
		var yPos : int = Screen.height/2 - 20;
		if(GUI.Button(Rect(width/2,yPos,width,width/2),playAgainTexture,GUIStyle.none) && uiActive) {
			var leftOvers : GameObject[] = GameObject.FindGameObjectsWithTag('Groceries');
			for(var groc in leftOvers) {
				Destroy(groc);
			}
			startGame();
		}
		if(GUI.Button(Rect(width/2,yPos + width/2 + 20,width,width/2),quitTexture,GUIStyle.none) && uiActive) {
			Application.LoadLevel('menu');
		}
	}
}
*/

function Score(obj) {
	if(gameRunning) {
		Destroy(obj);
		score++;
		UIScoreText.text = "Score: " + score;
	}
	
}

function GameOver() {
	if(gameRunning) {
		gameRunning = false;
		var highScore = PlayerPrefs.GetInt("highScore");
		if(score > highScore) {
			PlayerPrefs.SetInt("highScore",score);
			UIGameOverScoreText.text = "New High Score: " + score;
		} else {
			UIGameOverScoreText.text = "Score: " + score + "\nHigh Score: " + highScore;
		}
		yield WaitForSeconds(0.5);
		UIGameOver.SetActive(true);
	}
}

function Update() {
	if(Input.GetKeyDown(KeyCode.Escape)) {
		Application.LoadLevel('menu');
	}
	if(Input.GetMouseButton(0)) {
		var pos = mainCam.ScreenToWorldPoint(Input.mousePosition);
		var colliders = Physics2D.OverlapCircleAll(pos,touchRadius);
		for(var col : Collider2D in colliders) {
			if(col.rigidbody2D) {
					var dir : Vector2 = col.gameObject.transform.position - pos;
					var wearoff = 1 / (touchRadius + col.bounds.size.x);
					col.rigidbody2D.AddForce(dir * touchPower * wearoff,ForceMode2D.Impulse);
			}
		}
	}
}