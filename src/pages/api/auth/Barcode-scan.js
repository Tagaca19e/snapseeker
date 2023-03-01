import React, { useState, useEffect } from 'react';
import Quagga from 'quagga';

export function BarcodeReader() {
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    useEffect(() => {
        Quagga.init(
            {
                inputStream: {
                    name: 'Live',
                    type: 'LiveStream',
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: 'environment',
                    },
                },
                decoder: {
                    readers: ['ean_reader', 'upc_reader', 'code_128_reader'],
                },
            },
            (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                Quagga.start();
                setIsCameraOpen(true);
            }
        );

        return () => {
            Quagga.stop();
        };
    }, []);

    const handleScan = (data) => {
        alert(data);
    };

    const handleError = (err) => {
        console.error(err);
    };

    const toggleCamera = () => {
        if (isCameraOpen) {
            Quagga.stop();
        } else {
            Quagga.start();
        }
        setIsCameraOpen(!isCameraOpen);
    };

    return (
        <div>
            <button onClick={toggleCamera}>
                {isCameraOpen ? 'Close camera' : 'Open camera'}
            </button>
            {isCameraOpen ? (
                <div id="scanner-container">
                    <div id="interactive" className="viewport"></div>
                    <div className="controls">
                        <button onClick={toggleCamera}>Stop</button>
                    </div>
                </div>
            ) : (
                <div>Camera not available</div>
            )}
        </div>
    );
}

//export default BarcodeReader;
