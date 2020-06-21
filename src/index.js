

// var faceNet = cv.dnn.readNet("../face-mask-detector/face_detector/deploy.prototxt", "../face-mask-detector/face_detector/res10_300x300_ssd_iter_140000.caffemodel")
async function loadModels() {
    var proto = 'MobileNetSSD_deploy.prototxt';
    var weights = 'MobileNetSSD_deploy.caffemodel';
    let netDet = null
    await utils.createFileFromUrl(proto, proto,async () =>
    {
        
      await utils.createFileFromUrl(weights, weights, () =>
        {
            
            netDet=cv.readNetFromCaffe(proto,  weights);
            console.log('Transfer completed.');
            
        });
    });
    return netDet;
    }

function drawImge(){
    // netDet = loadModels()
    var video = document.querySelector("#webCamera");
    var canvas = document.querySelector("#videoCanvas");
    var ctx = canvas.getContext('2d');

   // canvas.toBlob(function(blob) {
     //   console.log(blob)

       // const prediction = model.predict(example);
        // var newImg = document.createElement('img')
        // var url = URL.createObjectURL(blob);
      
        // newImg.onload = function() {
        //   // no longer need to read the blob so it's revoked
        //   URL.revokeObjectURL(url);
        // };
      
        // newImg.src = url;
        // document.body.appendChild(newImg);
      //});
      
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;


    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    var faceArea = 300;
    var pX=canvas.width/2 - faceArea/2;
    var pY=canvas.height/2 - faceArea/2;

    ctx.rect(pX,pY,faceArea,faceArea);
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";    
    ctx.stroke();

    // create a canvas that will present the output image
    // const outputImage = document.createElement('canvas');

    // // set it to the same size as the image
    // outputImage.width = outputWidth;
    // outputImage.height = outputHeight;
    
    // // draw our image at position 0, 0 on the canvas
    // const ctx = outputImage.getContext('2d');
    // ctx.drawImage(inputImage, 0, 0);

    // // show both the image and the canvas
    // document.body.appendChild(inputImage);
    // document.body.appendChild(outputImage);
        

    // do all your work here
    
    // let src = cv.imread('videoCanvas');
    // let dst = new cv.Mat();
    // let dsize = new cv.Size(300, 300);
    // // You can try more different parameters
    // // cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);


    // var blob = cv.blobFromImage(src, 1, {width: 192, height: 144}, [104, 117, 123, 0], false, false);
    // netDet.setInput(blob);
    // var out = netDet.forward();
    // var faces = [];
    // for (var i = 0, n = out.data32F.length; i < n; i += 7) {
    //   var confidence = out.data32F[i + 2];
    //   var left = out.data32F[i + 3] * img.cols;
    //   var top = out.data32F[i + 4] * img.rows;
    //   var right = out.data32F[i + 5] * img.cols;
    //   var bottom = out.data32F[i + 6] * img.rows;
    //   left = Math.min(Math.max(0, left), img.cols - 1);
    //   right = Math.min(Math.max(0, right), img.cols - 1);
    //   bottom = Math.min(Math.max(0, bottom), img.rows - 1);
    //   top = Math.min(Math.max(0, top), img.rows - 1);
    //   if (confidence > 0.5 && left < right && top < bottom) {
    //     faces.push({x: left, y: top, width: right - left, height: bottom - top})
    //   }
    // }
    // blob.delete();
    // out.delete();
    // console.log(faces);
    // cv.imshow('outputCanvas', dst);

    
    src.delete(); dst.delete();

    setTimeout(drawImge , 100);
}

