
import React, { useEffect, useRef } from "react";
import QRCodeLibrary from "qrcode";

interface QRCodeProps {
  url: string;
  size?: number;
  color?: string;
  backgroundColor?: string;
}

const QRCode: React.FC<QRCodeProps> = ({ 
  url, 
  size = 200,
  color = "#000000",
  backgroundColor = "#ffffff"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCodeLibrary.toCanvas(
        canvasRef.current,
        url,
        {
          width: size,
          margin: 2,
          color: {
            dark: color,
            light: backgroundColor
          }
        },
        (error) => {
          if (error) console.error("Error generating QR code:", error);
        }
      );
    }
  }, [url, size, color, backgroundColor]);

  return <canvas ref={canvasRef} />;
};

export default QRCode;
