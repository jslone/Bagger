using UnityEngine;
using System.Collections;

public class ChangeScene : MonoBehaviour {
	public string prevScene;
	public string scene;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKeyDown(KeyCode.Escape)) {
			if(prevScene.Length == 0) {
				Application.Quit();
			} else {
				Application.LoadLevel(prevScene);
			}
		}
	}

	public void LoadLevel() {
		Application.LoadLevel(scene);
	}
}
