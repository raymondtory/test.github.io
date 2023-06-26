$("#memberContainer .memberNav a").eq(1).click(()=>{
    $("#overlay").addClass('showOverlay')
})
$("#closeLogin").click(()=>{
    $("#overlay").removeClass('showOverlay')
})

//focus
$(".loginInfoInput input").on({
    "focus":function(){
        $(this).parents(".InputDiv").css(
            {
                "border": "1px solid rgba(29, 252, 178)",
                "box-shadow": "0 0 2px 2px rgba(29, 252, 178)"
            }
        )
    },
    "blur":function(){
        $(this).parents(".InputDiv").css({
            "border": "1px gray solid",
            "box-shadow": "none"
        })
    },"keyup":function(){
        let loginInfoItem = $(this).parents(".loginInfoItem")
        let errorText = loginInfoItem.find(".errorText");
        let errorStatus = errorText.css('visibility');
        if(errorStatus=='visible'){
            errorText.css('visibility','hidden');
        }
    }
    
    
})
$(".InputDiv").click(function(){
    $(this).find("input").focus();
})

//重新輸入後讓紅字消失
let errorStr = $(".errorText").css('visibility');
console.log(errorStr);

