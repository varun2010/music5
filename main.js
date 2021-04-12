Peter="";
Harry="";
song="";
leftWristX="";
leftWristY="";
rightWrist="";
rightWristY="";
score_left="";
score_right="";
function preload(){
    Peter=loadSound("Peter Pan Song.mp3");
    Harry=loadSound("Harry Potter Theme Song.mp3");
}
function setup(){
    canvas=createCanvas(640,480);
    canvas.position(640,250);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}
function modelLoaded(){
    console.log("poseNet is Initialized");
}
function draw(){
    image(video,0,0,640,480);
    fill("cyan");
    stroke("springgreen");
    tf1=Peter.isPlaying();
    if(score_left>0.2){
        circle(leftWristX,leftWristY,20);
        Harry.stop();
        if(tf1==false){
            Peter.play();
            document.getElementById("name").innerHTML="Peter Pan Song";
        }
    }
    tf2=Harry.isPlaying();
    if(score_right>0.2){
        circle(rightWristX,rightWristY,20);
        Peter.stop();
        if(tf2==false){
            Harry.play();
            document.getElementById("name").innerHTML="Harry Potter Theme Song";
        }
    }
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_left=results[0].pose.keypoints[9].score;
        score_right=results[0].pose.keypoints[10].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristY=results[0].pose.rightWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
    }
}