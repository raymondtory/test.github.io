let slideWidth=900;
let slidedNodeIndex = 0;
const sliderNodeLastIndex = $("#sliderDots li").last().index();

setInterval(()=>{
    if(slidedNodeIndex==sliderNodeLastIndex){
        $("#sliderDots li").eq(0).trigger("mouseenter");
    }else{
        $("#sliderRight").trigger("click");
    }
},2000)

$("#sliderDots li").eq(0).css("background","#fff")

$("#sliderDots li").mouseenter(function(){
    let index=$(this).index();
    slidedNodeIndex = index;
    let slideMove=0-slideWidth*index;
    $("#sliderImg").css("left", slideMove)
    $(this).css("background","#fff")
    .siblings().css("background", "none")
    slideBtnControl();
})  

$("#sliderLeft").hide();


$("#sliderRight").click(function(){
    slidedNodeIndex+=1
    let slideMove=0-slideWidth*slidedNodeIndex;
    $("#sliderImg").css("left", slideMove)

    $("#sliderDots li").eq(slidedNodeIndex).css("background","#fff")
    .siblings().css("background", "none")
    slideBtnControl();
})

$("#sliderLeft").click(function(){
    slidedNodeIndex-=1
    let slideMove=0-slideWidth*slidedNodeIndex;
    $("#sliderImg").css("left", slideMove)

    $("#sliderDots li").eq(slidedNodeIndex).css("background","#fff")
    .siblings().css("background", "none")
    slideBtnControl();
})

function slideBtnControl(){
    if(slidedNodeIndex ==0){
    $("#sliderLeft").hide();
    $("#sliderRight").show();
    }else if(slidedNodeIndex ==sliderNodeLastIndex){
        $("#sliderRight").hide();
        $("#sliderLeft").show();

    }else{
        $("#sliderLeft").show();
        $("#sliderRight").show();
    }
}