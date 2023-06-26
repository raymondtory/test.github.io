$("#topNav li").last().click(()=>{
    let visibilityState = $("#memberContainer").css("visibility")
    if(visibilityState =='hidden'){
        $("#memberContainer").css('visibility','visible')
    }else{
        $("#memberContainer").css('visibility','hidden')
    }
})