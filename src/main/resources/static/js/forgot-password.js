console.log("Forgot Password Loaded");


let verifiedEmail = null;


/* =========================
   LOADER
========================= */

function showLoader(message) {

    const loadingText =
        document.getElementById("loadingText");

    const loadingOverlay =
        document.getElementById("loadingOverlay");


    if (loadingText) {
        loadingText.innerText = message;
    }

    if (loadingOverlay) {
        loadingOverlay.classList.remove("d-none");
    }

}


function hideLoader() {

    const loadingOverlay =
        document.getElementById("loadingOverlay");


    if (loadingOverlay) {
        loadingOverlay.classList.add("d-none");
    }

}



/* =========================
   SEND OTP
========================= */


document
.getElementById("sendOtpBtn")
.addEventListener("click", function(){


    const username =
        document
        .getElementById("username")
        .value
        .trim();



    if(!username){

        showToast(
            "Enter Email Address",
            "error"
        );

        return;
    }



    const btn=this;


    btn.disabled=true;

    btn.innerHTML="⏳ Sending OTP...";


    showLoader(
        "Please wait, sending OTP..."
    );



    fetch("/api/auth/send-forgot-password-otp",{


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            username:username

        })


    })



    .then(async response=>{


        const text =
        await response.text();


        if(!response.ok){

            throw new Error(text);

        }


        return text;


    })



    .then(()=>{


        showToast(

            "OTP Sent Successfully",

            "success"

        );



        const otpSection =
        document.getElementById("otpSection");



        otpSection.style.display="block";



        document
        .getElementById("username")
        .readOnly=true;



        btn.style.display="none";



        document
        .getElementById("otp")
        .focus();



    })



    .catch(error=>{


        showToast(

            error.message,

            "error"

        );


        btn.disabled=false;


    })



    .finally(()=>{


        hideLoader();


        btn.innerHTML="📩 Send OTP";


    });



});





/* =========================
   VERIFY OTP
========================= */


document
.getElementById("verifyOtpBtn")
.addEventListener("click",function(){



    const username =
    document
    .getElementById("username")
    .value
    .trim();



    const otp =
    document
    .getElementById("otp")
    .value
    .trim();




    if(!otp){


        showToast(

            "Enter OTP",

            "error"

        );


        return;

    }



    if(otp.length !== 4){


        showToast(

            "OTP must be 4 digits",

            "error"

        );


        return;

    }




    const btn=this;



    btn.disabled=true;


    btn.innerHTML="⏳ Verifying...";



    showLoader(

        "Please wait, verifying OTP..."

    );




    fetch("/api/auth/verify-forgot-password-otp",{


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({

            username:username,

            otp:otp

        })


    })



    .then(async response=>{


        const text =
        await response.text();


        if(!response.ok){

            throw new Error(text);

        }


        return text;


    })



    .then(()=>{


        verifiedEmail=username;



        document
        .getElementById("otpSection")
        .style.display="none";



        const passwordSection =
        document.getElementById("passwordSection");



        passwordSection.style.display="block";



        showToast(

            "OTP Verified Successfully",

            "success"

        );



        document
        .getElementById("newPassword")
        .focus();



    })



    .catch(error=>{


        showToast(

            error.message,

            "error"

        );


        btn.disabled=false;



    })



    .finally(()=>{


        hideLoader();


        btn.innerHTML="✅ Verify OTP";


    });



});






/* =========================
   RESET PASSWORD
========================= */


document
.getElementById("resetPasswordBtn")
.addEventListener("click",function(){



    const password =
    document
    .getElementById("newPassword")
    .value
    .trim();




    if(!verifiedEmail){


        showToast(

            "Verify OTP First",

            "error"

        );


        return;

    }




    if(password.length < 6){


        showToast(

            "Password must be at least 6 characters",

            "error"

        );


        return;

    }




    const btn=this;


    btn.disabled=true;


    btn.innerHTML="⏳ Resetting...";



    showLoader(

        "Please wait, resetting password..."

    );




    fetch("/api/auth/reset-password",{


        method:"POST",


        headers:{

            "Content-Type":"application/json"

        },


        body:JSON.stringify({


            username:verifiedEmail,

            password:password


        })


    })



    .then(async response=>{


        const text =
        await response.text();



        if(!response.ok){

            throw new Error(text);

        }


        return text;


    })



    .then(()=>{


        showToast(

            "Password Reset Successful",

            "success"

        );



        setTimeout(()=>{


            window.location.href="/login";


        },2000);



    })



    .catch(error=>{


        showToast(

            error.message,

            "error"

        );


        btn.disabled=false;


    })



    .finally(()=>{


        hideLoader();


        btn.innerHTML="🔄 Reset Password";


    });



});





/* =========================
   OTP ONLY NUMBERS
========================= */


const otpInput =
document.getElementById("otp");



if(otpInput){


    otpInput.addEventListener(
    "input",
    function(){


        this.value =
        this.value.replace(
            /[^0-9]/g,
            ""
        );


    });


}