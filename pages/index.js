import Head from 'next/head';
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
      <Head>
        <title>3D App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
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
