prediction_1="";
prediction_2="";

Webcam.set({
    width:350,height:300,image_format:'png',png_quality:90
});
camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version ',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/o1-2M1XM9/model.json',modelloaded);

function modelloaded(){
    console.log('model loaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_1="The first prediction is  "+prediction_1;
    speak_2="The second prediction is "+prediction_2;
    var utter=new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utter);
};
function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotresult);
    
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128578;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128577;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128578;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128577;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    }
}