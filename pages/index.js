import { useRef } from 'react';
import styled from 'styled-components';
import { useThreeScene } from '../utils/hooks';

const Scene = styled.div`
  height: 400px;
  width: 400px;
`;

function Home() {
  const mountPoint = useRef(null);

  useThreeScene(mountPoint);

  return (
    <>
      <header>
        <h1>It works</h1>
      </header>
      <main>
        <Scene ref={mountPoint} />
      </main>
    </>
  );
}

export default Home;
