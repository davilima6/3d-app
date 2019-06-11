import { useEffect, useState } from 'react';
import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';

function useThreeScene(mountPoint) {
  const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState();
  const [scene, setScene] = useState();
  const [cube, setCube] = useState();
  const [frameId, setFrameId] = useState();

  const start = () => {
    debugger;
    if (frameId) {
      return;
    }
    const newFrame = requestAnimationFrame(animate);

    setFrameId(newFrame);
  };

  const stop = () => {
    cancelAnimationFrame(frameId);
  };

  const animate = () => {
    debugger;
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    setFrameId(requestAnimationFrame(animate));
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

    newRenderer.setClearColor('#000');
    newRenderer.setSize(width, height);
    setRenderer(newRenderer);

    // Add cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: '#433F81' });
    const newCube = new Mesh(geometry, material);

    setCube(newCube);
  }, [mountPoint]);

  useEffect(() => {
    // Add renderer
    if (!renderer) {
      return;
    }
    mountPoint.current.appendChild(renderer.domElement);

    // Add cube
    scene.add(cube);

    // Start animation effect
    start();

    // Teardown animation effect
    return () => {
      stop();
      mountPoint.current.removeChild(renderer.domElement);
    };
  }, [cube, renderer, scene]);
}

export { useThreeScene };
