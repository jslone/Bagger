using UnityEngine;
using System.Collections;

public class LockCamWidth : MonoBehaviour {
	public float constantWidth;

	// Use this for initialization
	void Start () {
		camera.orthographicSize = constantWidth / camera.aspect * 2f;
	}
	
	// Update is called once per frame
	void Update () {
#if UNITY_EDITOR
		camera.orthographicSize = constantWidth / camera.aspect * 2f;
#endif
	}
}
