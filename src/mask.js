var text = document.getElementById("coutput-text");
var pred = [0, 1];
var face = null;
const detect = () => {
  // console.clear();
  console.log(face, pred);
  if (face === null) return;
  pred = model.predict(preprocess(face)).dataSync();
};

function preprocess(img) {
  //convert the image data to a tensor
  let tensor = tf.browser.fromPixels(img);
  //resize to 50 X 50
  const resized = tf.image.resizeBilinear(tensor, [224, 224]).toFloat();
  // Normalize the image
  const offset = tf.scalar(255.0);
  const normalized = tf.scalar(1.0).sub(resized.div(offset));
  //We add a dimension to get a batch shape
  const batched = normalized.expandDims(0);
  return batched;
}
var model = null;
async function loadModel() {
  model = await tf.loadLayersModel("./jsmodel/model.json");
}
const predictMask = async (coords, frame, size, ctx) => {
  if (model === null) await loadModel();
  for (let i = 0; i < coords.length; i++) {
    let rect = coords[i];
    let xRatio = videoWidth / size.width;
    let yRatio = videoHeight / size.height;

    face = frame.getImageData(
      rect.x * xRatio,
      rect.y * yRatio,
      rect.width * xRatio,
      rect.height * yRatio
    );

    ctx.lineWidth = 3;
    var mask = pred[0] > pred[1];
    text.style.color = mask ? "green" : "red";
    ctx.strokeStyle = mask ? "green" : "red";
    config.particles.color.value = mask ? "#0f0" : "#f00";
    particlesJS("particles-js", config);
    // console.log(config);
    var label = mask ? "Mask " : "No Mask  ";
    label =
      label + (Math.max(pred[0], pred[1]) * 100).toFixed(2).toString() + "%";
    // console.log(label);
    text.innerHTML = label;
    ctx.font = "10px Arial";

    // ctx.strokeText(label, 10, 20);
    ctx.strokeRect(
      rect.x * xRatio,
      rect.y * yRatio,
      rect.width * xRatio,
      rect.height * yRatio
    );
  }
  // const example = tf.fromPixels(webcamElement);  // for example
  // const prediction = model.predict(example);
};

const startPrediction = () => {
  setInterval(detect, 100);
};
