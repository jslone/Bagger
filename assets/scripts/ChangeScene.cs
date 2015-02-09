using UnityEngine;
using System.Collections;

public class ChangeScene : MonoBehaviour {
	public Object prevScene;
	public Object scene;

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		if(Input.GetKeyDown(KeyCode.Escape)) {
			if(prevScene == null) {
				Application.Quit();
			} else {
				Application.LoadLevel(prevScene.name);
			}
		}
	}

	public void LoadLevel() {
		Application.LoadLevel(scene.name);
	}
}
