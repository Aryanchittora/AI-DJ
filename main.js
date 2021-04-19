var song = "";
l_wristX = 0;
l_wristY = 0;
r_wristX = 0;
r_wristY = 0;
score_lWrist = 0;
score_rWrist = 0;

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
        score_rWrist = results[0].pose.keypoints[10].score;
        console.log("SCORE left Wrist = " + score_lWrist);
        console.log("SCORE Right Wrist = " + score_rWrist);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    
    fill('#57ff97');
    stroke('#57ff97');
    
    if (score_lWrist > 0.02) {
        circle(l_wristX, l_wristY, 15);

        var1 = floor(Number(l_wristY));
        volume = var1/500;
        document.getElementById("volume_val").innerHTML = "Volume = " + volume;
        song.setVolume(volume);    
    }

    if (score_rWrist > 0.02) {
        circle(r_wristX, r_wristY, 15);
        
        if (r_wristY > 0 && r_wristY <= 200) {
            document.getElementById("speed_val").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if (r_wristY > 200 && r_wrist <= 300) {
            document.getElementById("speed_val").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if (r_wristY > 300 && r_wrist <= 400) {
            document.getElementById("speed_val").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if (r_wristY > 400 && r_wrist <= 500) {
            document.getElementById("speed_val").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
    }
}

function music() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}