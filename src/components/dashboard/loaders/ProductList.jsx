import { React, useContext, useEffect, useState } from 'react';

import { AppContext } from '../../AppContextProvider';
import ContentLoader from 'react-content-loader';

const ListLoaderCol4 = () => (
  <div className="hidden lg:block">
    <ContentLoader
      className="m-auto"
      viewBox="0 0 1150 700"
      height={700}
      width={1150}
      style={{ width: '100%' }}
    >
      <rect x="40" y="20" rx="8" ry="8" width="250" height="250" />
      <rect x="40" y="250" rx="0" ry="0" width="250" height="18" />
      <rect x="40" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="310" y="20" rx="8" ry="8" width="250" height="250" />
      <rect x="310" y="250" rx="0" ry="0" width="250" height="18" />
      <rect x="310" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="580" y="20" rx="8" ry="8" width="250" height="250" />
      <rect x="580" y="250" rx="0" ry="0" width="250" height="18" />
      <rect x="580" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="850" y="20" rx="8" ry="8" width="250" height="250" />
      <rect x="850" y="250" rx="0" ry="0" width="250" height="18" />
      <rect x="850" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="40" y="340" rx="8" ry="8" width="250" height="250" />
      <rect x="40" y="570" rx="0" ry="0" width="250" height="18" />
      <rect x="40" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="310" y="340" rx="8" ry="8" width="250" height="250" />
      <rect x="310" y="570" rx="0" ry="0" width="250" height="18" />
      <rect x="310" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="580" y="340" rx="8" ry="8" width="250" height="250" />
      <rect x="580" y="570" rx="0" ry="0" width="250" height="18" />
      <rect x="580" y="595" rx="0" ry="0" width="120" height="20" />
      <rect x="850" y="340" rx="8" ry="8" width="250" height="250" />
      <rect x="850" y="570" rx="0" ry="0" width="250" height="18" />
      <rect x="850" y="595" rx="0" ry="0" width="120" height="20" />
    </ContentLoader>
  </div>
);

const ListLoaderCol2 = () => (
  <div className="hidden sm:block">
    <ContentLoader
      className="m-auto"
      speed={2}
      width={600}
      height={720}
      viewBox="0 0 600 720"
      backgroundColor="#dedede"
      foregroundColor="#ecebeb"
      style={{ width: '100%' }}
    >
      <rect x="36" y="17" rx="8" ry="8" width="250" height="250" />
      <rect x="36" y="247" rx="0" ry="0" width="250" height="18" />
      <rect x="36" y="272" rx="0" ry="0" width="120" height="20" />
      <rect x="306" y="17" rx="8" ry="8" width="250" height="250" />
      <rect x="306" y="247" rx="0" ry="0" width="250" height="18" />
      <rect x="306" y="272" rx="0" ry="0" width="120" height="20" />
      <rect x="850" y="20" rx="8" ry="8" width="250" height="250" />
      <rect x="850" y="250" rx="0" ry="0" width="250" height="18" />
      <rect x="850" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="36" y="337" rx="8" ry="8" width="250" height="250" />
      <rect x="36" y="567" rx="0" ry="0" width="250" height="18" />
      <rect x="36" y="592" rx="0" ry="0" width="120" height="20" />
      <rect x="306" y="337" rx="8" ry="8" width="250" height="250" />
      <rect x="306" y="567" rx="0" ry="0" width="250" height="18" />
      <rect x="306" y="592" rx="0" ry="0" width="120" height="20" />
      <rect x="850" y="340" rx="8" ry="8" width="250" height="250" />
      <rect x="850" y="570" rx="0" ry="0" width="250" height="18" />
      <rect x="850" y="595" rx="0" ry="0" width="120" height="20" />
    </ContentLoader>
  </div>
);

const ListLoaderCol1 = () => (
  <ContentLoader
    className="m-auto"
    speed={2}
    width={400}
    height={450}
    viewBox="0 0 400 450"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    style={{ width: '100%' }}
  >
    <rect x="18" y="19" rx="8" ry="8" width="358" height="358" />
    <rect x="36" y="247" rx="0" ry="0" width="250" height="18" />
    <rect x="19" y="394" rx="0" ry="0" width="200" height="20" />
    <rect x="850" y="20" rx="8" ry="8" width="250" height="250" />
    <rect x="850" y="250" rx="0" ry="0" width="250" height="18" />
    <rect x="850" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="850" y="340" rx="8" ry="8" width="250" height="250" />
    <rect x="850" y="570" rx="0" ry="0" width="250" height="18" />
    <rect x="850" y="595" rx="0" ry="0" width="120" height="20" />
  </ContentLoader>
);

// TODO(etagaca): Loader is pretty repetitive, needs to be refactored.
export default function ProductListLoader() {
  const { isLoading } = useContext(AppContext);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Check for window width to determine what loader to use.
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {windowWidth > 1024 && isLoading && <ListLoaderCol4 />}
      {windowWidth > 640 && isLoading && windowWidth < 1023 && (
        <ListLoaderCol2 />
      )}
      {windowWidth < 640 && isLoading && <ListLoaderCol1 />}
    </div>
  );
}
