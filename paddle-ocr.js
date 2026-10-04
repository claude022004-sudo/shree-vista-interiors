// PaddleOCR.js is loaded in the visitor's browser. No plan image is sent to an OCR API.
import { PaddleOCR } from './vendor/paddleocr.mjs';

let engine;

async function getEngine() {
  if (!engine) {
    engine = PaddleOCR.create({
      lang: 'en',
      ocrVersion: 'PP-OCRv5',
      ortOptions: { backend: 'wasm' }
    });
  }
  return engine;
}

function pointXY(point) {
  if (Array.isArray(point)) {
    if (Array.isArray(point[0])) return pointXY(point[0]);
    return { x: Number(point[0]) || 0, y: Number(point[1]) || 0 };
  }
  return { x: Number(point && point.x) || 0, y: Number(point && point.y) || 0 };
}

function centre(item) {
  let points = item.poly || item.points || item.vertices || [];
  if (Array.isArray(points[0]) && Array.isArray(points[0][0])) points = points[0];
  if (!points.length) return { x: 0, y: 0 };
  const total = points.map(pointXY).reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y }), { x: 0, y: 0 });
  return { x: total.x / points.length, y: total.y / points.length };
}

window.paddleExtract = async function paddleExtract(source) {
  const ocr = await getEngine();
  const result = await ocr.predict(source);
  const items = (result && result[0] && result[0].items ? result[0].items : [])
    .filter(item => item.text && Number(item.score || 0) >= 0.2)
    .map(item => ({ ...item, centre: centre(item) }));

  // Keep nearby words on the same visual line together. OCR engine text order is not
  // reliable on rotated floor plans, while the polygons preserve the page layout.
  items.sort((a, b) => Math.abs(a.centre.y - b.centre.y) < 18
    ? a.centre.x - b.centre.x
    : a.centre.y - b.centre.y);
  return items;
};
