var song = "";
l_wristX = 0;
l_wristY = 0;
r_wristX = 0;
r_wristY = 0;
score_lWrist = 0;

function preload() {
    song = loadSound("Invincible.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelloaded);
    poseNet.on('pose', poses);
}

function modelloaded() {
    console.log("Pose Net is ready");
}

function poses(results) {
    if (results.length > 0) {
        console.log(results);

        l_wristX = results[0].pose.leftWrist.x;
        l_wristY = results[0].pose.leftWrist.y;

        console.log("Left Wrist X = " + l_wristX);
        console.log("Left Wrist Y = " + l_wristY);

        r_wristX = results[0].pose.rightWrist.x;
        r_wristY = results[0].pose.rightWrist.y;

        console.log("Rght Wrist X = " + r_wristX);
        console.log("Right Wrist Y = " + r_wristY);

        score_lWrist = results[0].pose.keypoints[9].score;
        console.log("SCORE left Wrist = " + score_lWrist);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#57ff97');
    stroke('#57ff97');
    if (score_lWrist > 0.2) {
        circle(l_wristX, l_wristY, 15);

        var1 = floor(Number(l_wristY));
        volume = var1/500;
        document.getElementById("volume_val").innerHTML = "Volume = " + volume;
        song.setVolume(volume);    
    }
}

function music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}