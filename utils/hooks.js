import { useEffect, useState } from 'react';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  FBXLoader,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
// import FBXLoader from 'three-fbx-loader';

OBJLoader(THREE);

const OBJ = '/static/character.obj';

function useThreeScene(mountPoint) {
  const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState();
  const [scene, setScene] = useState();
  const [character, setCharacter] = useState();
  const [cube, setCube] = useState();
  const [loader, setLoader] = useState();
  const [frameId, setFrameId] = useState();

  const start = () => {
    if (frameId) {
      return;
    }
    const newFrame = window.requestAnimationFrame(animate);

    setFrameId(newFrame);
  };

  const stop = () => {
    window.cancelAnimationFrame(frameId);
  };

  const animate = () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // character.rotation.x += 0.01;
    // character.rotation.y += 0.01;
    const frameId = setFrameId(window.requestAnimationFrame(animate));

    renderScene();
  };

  const renderScene = () => {
    renderer.render(scene, camera);
  };

  useEffect(() => {
    const width = mountPoint.current.clientWidth;
    const height = mountPoint.current.clientHeight;

    // Add scene
    const newScene = new Scene();

    setScene(newScene);

    // Add camera
    const newCamera = new PerspectiveCamera(75, width / height, 0.1, 1000);

    newCamera.position.z = 4;
    setCamera(newCamera);

    // Add renderer
    const newRenderer = new WebGLRenderer({ antialias: true });

    newRenderer.setClearColor('#999');
    newRenderer.setSize(width, height);
    setRenderer(newRenderer);

    // Add cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: '#433F81' });
    const newCube = new Mesh(geometry, material);

    setCube(newCube);

    // Add loader for OBJ filetype
    const newLoader = new THREE.OBJLoader();
    // const newLoader = FBXLoader();

    setLoader(newLoader);
  }, [mountPoint]);

  useEffect(() => {
    // Add renderer
    if (!renderer) {
      return;
    }
    mountPoint.current.appendChild(renderer.domElement);

    // Add cube
    scene.add(cube);

    // Add character
    loader.load(OBJ, obj => {
      obj.translateY(-2);
      obj.scale.set(0.5, 0.5, 0.5);
      scene.add(obj);
    });

    // Start animation effect
    start();

    // Teardown animation effect
    return () => {
      stop();
      mountPoint.current.removeChild(renderer.domElement);
    };
  }, [cube, loader, renderer, scene]);
}

export { useThreeScene };
