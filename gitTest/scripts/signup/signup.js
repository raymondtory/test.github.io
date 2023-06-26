$("small").hide();
        $(".correctDiv i").css("color","white");

        let agree = false;
        $("#agreePolicyCotainer p").click(function(){
            if(agree){
                $("#agreePolicy").prop("checked", false)

            }else{
                $("#agreePolicy").prop("checked", true)
            }
            agree=!agree;
        })
        //focus
        $(".signupInfoInput input").on({
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
            }
        })
        $(".InputDiv").click(function(){
            $(this).find("input").focus();
        })
        //Allow Submit 
        function submitAvailable(){
            let allowPolicyIsChecked = $("#agreePolicy").prop("checked");
            let validCorrectIcon = 0;
            let errorTag = $("small").length;
            //綠勾
            $(".correctDiv").each(function(){
            if($(this).is(":visible") == true){
                validCorrectIcon+=1
            }
            })
            //紅字
            $("small").each(function(){
                if($(this).is(":visible") == false){
                    errorTag-=1
                }
            })

            if(validCorrectIcon==5 &&allowPolicyIsChecked==true &&errorTag===0)
            {
                $("#btnSignup").prop("disabled",false)
                $("#btnSignup").addClass("available")
            }else{
                $("#btnSignup").attr("disabled",true)
                $("#btnSignup").removeClass("available")
            }
        };

        //字串中間、前後不可有空白
        function spaceCheck(str,errorMessage){
            let arr = new Array();
            arr = str.split(" ");

            if(arr.length>1 || str.length !==str.trim().length)
            {
                if(errorMessage==""){
                    errorMessage +="不能包含空白"
                }else{
                    errorMessage +="、不能包含空白"
                }
            }
            return errorMessage
        }
        //欄位不能為空
        function emptyCheck(str,errorMessage){
            let strLength = str.length;
            if(strLength ==0){
                if(errorMessage==""){
                    errorMessage +="欄位不能空白"
                }else{
                    errorMessage +="、欄位不能空白"
                }
            }
            return errorMessage
        }
        function validInfo(testStr,regex8digits=false,combination=false,regexSpecial=false){
            let errorMessage = "" ;
            //空欄位檢查
            errorMessage = emptyCheck(testStr,errorMessage);
            if(errorMessage!=""){
                return errorMessage;
            }
            //空白字元檢查
            errorMessage = spaceCheck(testStr,errorMessage);
            if(errorMessage!=""){
                return errorMessage;
            }

            //最少字元檢查
            if(regex8digits==true){
                var passwordregex8digits = new RegExp("^(?=.{8,})");  //最少八個位元
                let digitsResult = passwordregex8digits.test(testStr);
                //八個位元
                if(digitsResult!=true){
                    if(errorMessage==""){
                        errorMessage +="長度最少八個位元"
                    }else{
                        errorMessage +="、長度最少八個位元"
                    }
                }
            }

            //英文數字組合檢查
            if(combination==true){
                var passwordregexUppercase = new RegExp("^(?=.*[A-Z])");   //大寫英文
                var passwordregexLowercase = new RegExp("^(?=.*[a-z])");   //小寫英文
                var passwordregexNumber = new RegExp("^(?=.*[0-9])");    //數字

                let uppercaseResult = passwordregexUppercase.test(testStr);
                let lowercaseResult = passwordregexLowercase.test(testStr);
                let numberResult = passwordregexNumber.test(testStr);
                //必須是英文與數字的組合
                if(!(numberResult ==true&&(lowercaseResult==true||uppercaseResult==true))){
                    if(errorMessage==""){
                        errorMessage +="必須是英文與數字的組合"
                    }else{
                        errorMessage +="、必須是英文與數字的組合"
                    }
                }
            }

            //特殊字元檢查
            if(regexSpecial==true){
                var passwordRegexSpecial = new RegExp("^(?=.*[!@#$%^&*])");   //特殊字元
                let specialResult = passwordRegexSpecial.test(testStr);
                //不可包含特殊字元
                if(specialResult ==true){
                    if(errorMessage==""){
                        errorMessage +="不可包含特殊字元"
                    }else{
                        errorMessage +="、不可包含特殊字元"
                    }
                }
            }
            return errorMessage;
        }
        //Name(不可包含特殊字元)
        $("#userName").on("keyup blur",function(){
            let nameTestResult = validInfo($(this).val(),regex8digits=false,combination=false,regexSpecial=true)
            /*----------------------前端驗證----------------------*/

            let inputParent = $(this).parents(".signupInfoItem");

            if(nameTestResult!=""){
                inputParent.find($("small")).html(nameTestResult)
                inputParent.find($("small")).show();
                inputParent.find($(".correctDiv i")).css("color","white");
            }else{
                inputParent.find($("small")).html("");
                inputParent.find($("small")).hide();
                inputParent.find($(".correctDiv i")).css("color","#86e17a");
            }
            submitAvailable()

        })
        
        //Password(最少8個位元、英文與數字的組合、不可包含特殊字元)
        $("#userPassword").on("keyup blur",function(){
            let passwordTestResult = validInfo($(this).val(),regex8digits=true,combination=true,regexSpecial=true)
            /*----------------------前端驗證----------------------*/
            let inputParent = $(this).parents(".signupInfoItem");

            if(passwordTestResult!=""){
                inputParent.find($("small")).html(passwordTestResult)
                inputParent.find($("small")).show();
                inputParent.find($(".correctDiv i")).css("color","white");
            }else{
                inputParent.find($("small")).html("");
                inputParent.find($("small")).hide();
                inputParent.find($(".correctDiv i")).css("color","#86e17a");
            }
            //Check PasswordAgain Again
            let enteredPasswordAgain = $("#userPasswordAgain").val();

            if(enteredPasswordAgain!=""){
                let passwordAgainParent = $("#userPasswordAgain").parents(".signupInfoItem");

                if(enteredPasswordAgain !==$(this).val()){
                    passwordAgainParent.find($("small")).html("密碼不相符")
                    passwordAgainParent.find($("small")).show();
                    passwordAgainParent.find($(".correctDiv i")).css("color","white");
                }else{
                    passwordAgainParent.find($("small")).html("");
                    passwordAgainParent.find($("small")).hide();
                    passwordAgainParent.find($(".correctDiv i")).css("color","#86e17a");
                }
            }
            submitAvailable()
        })
        
        //PasswordAgain
        $("#userPasswordAgain").on("keyup blur",function(){
            let enteredPassword = $("#userPassword").val();
            let testedPassword = $("#userPasswordAgain").val();

            let passwordAgainTestResult = validInfo(testedPassword,regex8digits=false,combination=false,regexSpecial=false)
            let inputParent = $(this).parents(".signupInfoItem");

            if(enteredPassword !==testedPassword||passwordAgainTestResult!=""){
                inputParent.find($("small")).html("密碼不相符")
                inputParent.find($("small")).show();
                inputParent.find($(".correctDiv i")).css("color","white");
            }else{
                inputParent.find($("small")).html("");
                inputParent.find($("small")).hide();
                inputParent.find($(".correctDiv i")).css("color","#86e17a");
            }
            submitAvailable()
        })
        //Phone
        $("#userPhone").on("keyup blur",function(){
            let testedPhone = $("#userPhone").val();
            const cellphoneRegex = /^09\d{2}(\d{6}|-\d{3}-\d{3})$/;
            const phoneRegex =/^\(?\d{2}\)?[\s\-]?\d{4}\-?\d{4}$/;
            
            

            let cellphonetestResult = cellphoneRegex.test(testedPhone);
            let phonetestResult = phoneRegex.test(testedPhone);
            /*----------------------前端驗證----------------------*/

            let inputParent = $(this).parents(".signupInfoItem");

            if(!cellphonetestResult&&!phonetestResult) {
                inputParent.find($("small")).html("連絡電話格式錯誤")
                inputParent.find($("small")).show();
                inputParent.find($(".correctDiv i")).css("color","white");
            } else {
                inputParent.find($("small")).html("");
                inputParent.find($("small")).hide();
                inputParent.find($(".correctDiv i")).css("color","#86e17a"); 
            }        
            submitAvailable()

        })
        //Email
        $("#userEmail").on("keyup blur",function(){
            let testedEmail = $("#userEmail").val();
            const emailRegex = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/;
            let emailTestResult = emailRegex.test(testedEmail);
            /*----------------------前端驗證----------------------*/

            let inputParent = $(this).parents(".signupInfoItem");
            
            if(!emailTestResult){
                inputParent.find($("small")).html("電子郵件格式錯誤")
                inputParent.find($("small")).show();
                inputParent.find($(".correctDiv i")).css("color","white");
            }else{
                inputParent.find($("small")).html("");
                inputParent.find($("small")).hide();
                inputParent.find($(".correctDiv i")).css("color","#86e17a");
            }
            submitAvailable();

        })        

        
        //AgreePolicy
        $("#agreePolicy").change(function(){
            submitAvailable()
        })