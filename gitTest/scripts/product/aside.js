$("#category li p").click(function(){
    let mainUl = $(this).parents("ul");
    let mainLi = $(this).parent("li");
    let siblingUl = mainUl.siblings();

    let subCateDisplayAttr = mainLi.find("#subCategory").css("display")
    
    if(subCateDisplayAttr =="block"){
        mainLi.find("#subCategory").toggle();
        mainLi.find("#subCategory li").removeClass("selected");
        $(this).removeClass("selected");

        mainLi.removeClass("selected");

    }else{
        mainLi.find("#subCategory").toggle();
        $(this).addClass("selected")

        siblingUl.find("p").removeClass("selected");
        siblingUl.find("#subCategory").hide();
        siblingUl.find("#subCategory li").removeClass("selected");
    }
})
$("#subCategory li").click(function(){
    $(this).addClass("selected")
    $(this).siblings().removeClass("selected")
})