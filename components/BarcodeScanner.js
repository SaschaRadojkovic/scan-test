"use client";
import { Inter } from "@next/font/google";
import Scanner from "@/components/scanner";
import { useLayoutEffect, useRef, useState } from "react";
import useWindowDimensions from "./WindowDimensions";

const inter = Inter({ subsets: ["latin"] });

export default function BarcodeScanner() {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState([]);
  const { width, height } = useWindowDimensions();
  const scannerRef = useRef(null);

  function onDetected(result) {
    console.log(result);
    setResults([...results, result]);
    setScanning(false);
  }
  useLayoutEffect(() => {
    setScanning(true);
  }, []);

  return (
    <>
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? "Stop" : "Start"}
      </button>
      <ul className="results">
        {results.map(
          (result) =>
            result.codeResult && (
              <li key={result.codeResult.code}>{result.codeResult.code}</li>
            )
        )}
      </ul>
      <div suppressHydrationWarning={true}>
        {typeof window && (
          <div
            ref={scannerRef}
            style={{ position: "relative", border: "3px solid red" }}
          >
            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
            <canvas
              className="drawingBuffer"
              style={{
                position: "absolute",
                top: "0px",
                // left: '0px',
                height: "100%",
                // width: '100%',
                border: "3px solid green",
              }}
              width="640"
              height="480"
            />
            {scanning ? (
              <Scanner
                constraints={{ width, height: height / 2 }}
                scannerRef={scannerRef}
                onDetected={onDetected}
              />
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
