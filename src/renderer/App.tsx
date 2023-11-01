import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import './App.css';
import Webcam from 'react-webcam';
import React, { useCallback } from 'react';

// camera viewer
const CameraViewer = () => {
  let { deviceId } = useParams<{ deviceId: string }>();

  if (!deviceId || deviceId === '') {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl">No device selected</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Webcam
        audio={false}
        videoConstraints={{ deviceId: deviceId }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// main ui dashboard
const Hello = () => {
  // const [deviceId, setDeviceId] = React.useState({});
  const [devices, setDevices] = React.useState([]);
  const [speed, _] = React.useState(0.7812);
  const webcamRef = React.useRef(null);
  const [imgSrc, setImgSrc] = React.useState(null);

  const handleDevices = React.useCallback(
    (mediaDevices) =>
      // @ts-ignore
      setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
    [setDevices]
  );

  React.useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, [handleDevices]);

  // setInterval(() => {
  //   setSpeed(Math.random()*100);
  // }, 2500);

  const capture = useCallback(() => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef, setImgSrc]);

  return (
    <div>
      <div className="grid grid-cols-5 gap-3 h-screen">
        <div className="bg-blue-100">
          <hr />
          <h1 className="text-2xl">
            Speed: {speed.toString().slice(0, 2)} m/s^2
          </h1>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Toggle Claw
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={capture}
          >
            Take Photo
          </button>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Run Photo Analysis
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Run Diagnostics
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Run Calibration / PID
          </button>
        </div>
        {/* <div className="bg-red-100 col-span-4 flex flex-col items-stretch">
{devices.map((device: any, key) => (
      <div className="flex-grow w-full h-0 pb-[25%] relative" onClick={() => {
        window.open(`/#/cameraviewer/aefshaskjdhfkh`, '_blank')
      }} key={key}>
        <Webcam audio={false} videoConstraints={{ deviceId: device.deviceId }} className="absolute w-full h-full object-cover"/>
        <div className="absolute bottom-0">{device.label || `Device ${key + 1}`}</div>
      </div>
))}
</div> */}

        <div className="bg-red-100 col-span-4 flex flex-col items-stretch overflow-hidden">
          {devices.map((device: any, key) => (
            <div
              className="w-full flex-grow relative"
              style={{ minHeight: '0' }}
              onClick={() => {
                window.open(`/#/cameraviewer/${device.deviceId}`, '_blank');
              }}
              key={key}
            >
              <Webcam
                audio={false}
                videoConstraints={{ deviceId: device.deviceId }}
                className="absolute inset-0 w-full h-full object-contain"
                ref={webcamRef}
              />
              <div className="absolute bottom-0">
                {device.label || `Device ${key + 1}`}
              </div>
            </div>
          ))}
        </div>
        {imgSrc && (
          <div className="bg-green-100 col-span-4 flex flex-col items-stretch">
            <img src={imgSrc} />
          </div>
        )}
      </div>

      {/* <footer className="fixed inset-x-0 bottom-0 bg-black text-white">
    <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <img src="/path_to_your_logo.png" alt="Gay" className="h-8 w-auto" />
              <ul className="flex items-center ml-10 text-sm space-x-8">
                  <li><a href="#" className="hover:underline">Option 1</a></li>
                  <li><a href="#" className="hover:underline">Option 2</a></li>
                  <li><a href="#" className="hover:underline">Option 3</a></li>
                  <li><a href="#" className="hover:underline">Option 4</a></li>
              </ul>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:underline">Credits</a>
              <a href="#" className="hover:underline">Legal</a>
              <a href="#" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded">Option 5</a>
            </div>
        </div>
    </div>
</footer> */}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/cameraviewer/:deviceId" component={CameraViewer} />
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
