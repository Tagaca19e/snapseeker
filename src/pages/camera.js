import React from 'react';
import Webcam from 'react-webcam';

export default function Camera() {
  // TODO(etagaca): Add a button for mobile camera.
  // NOTE: Not yet implemented.
  const videoConstraints = {
    facingMode: { exact: 'environment' },
  };

  const webCamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webCamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    console.log(imageSrc);
    uploadFile(imageSrc);
  }, [webCamRef, setImgSrc]);

  const uploadFile = async (base64File) => {
    const file = await fetch(base64File).then((res) =>
      res.blob().then((blob) => {
        return new File([blob], 'test.jpg', { type: 'image/jpeg' });
      })
    );

    // Upload image to cloudflare R2 bucket using worker.
    // Cloudflare R2: https://developers.cloudflare.com/r2/
    // Cloudflare Workers: https://developers.cloudflare.com/workers/
    const res = await fetch(
      'https://snapseeker-image-uploader.etagaca.workers.dev/',
      {
        method: 'POST',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: file,
      }
    );
    const data = await res.text();
    if (res.status === 200) {
      console.log('data', data);
    } else {
      console.log('Something went wrong');
    }
  };

  return (
    <div>
      {/* Mobile Camera */}
      {/* <Webcam videoConstraints={videoConstraints} /> */}
      <Webcam ref={webCamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} />}
    </div>
  );
}
