// RGEX that is used for form validation & user tipps
let $userNameRGEX = /.*\S.*/;
let $userEmailRGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,3})$/;
let $creditCardRGEX = /^[0-9]{13,16}$/;
let $zipCodeRGEX = /^[0-9]{5}$/;
let $cvvCodeRGEX = /^[0-9]{3}$/;

// Cost variables for calculation of selected activites 
const $activties = document.querySelectorAll('input[type=checkbox]');
let costText = $("<div id='costText'> Your total cost:  </div>");
let costValue = $("<div id='costValue'></div>");
costValue.text(0);
$(".activities").after(costValue);
$(".activities").after(costText);
let totalCost = 0;
let selectedActivties = 0;

// Credit card is the default selection
$('.paypal').hide(); 
$('.bitcoin').hide();
$('#payment').val("credit card");

// set focus on first input field after page loads 
$("input").first().focus();

// initially hide the other-job section
$("#other-title").hide();

// initially hide the t-shirt color section
$("#colors-js-puns").hide();

// show job section if user clicked on "other"
let $selectedJobRole = $('#title').on('change', (e) => {
    if(e.target.value != "other") {
        $("#other-title").hide(); 
    }else {
        $("#other-title").show();
    }
});

// only make colors for selected design visible.
let $selectedDesign = $('#design').on('change',  (e) => {
    if (e.target.value === "js puns") {
        $("#colors-js-puns").show();
        $("#color").children().each(function(i,element) {
            $(element).show();
            if (element.value === "default") {
                $(element).hide();
            } else if (element.value === "tomato") {
                $(element).hide();
            } else if (element.value === "steelblue") {
                $(element).hide(); 
            } else if (element.value === "dimgrey") {
                $(element).hide(); 
            } 
        })    
    } else if (e.target.value === "heart js"){
        $("#colors-js-puns").show();
        $("#color").children().each(function(index,element) {
            $(element).show();
            if (element.value === "default") {
                $(element).hide();
            } else if (element.value === "cornflowerblue") {
                $(element).hide();
            } else if (element.value === "darkslategrey") {
                $(element).hide(); 
            }
            else if (element.value === "gold") {
                $(element).hide(); 
            }
        })
    } else {
        $("#colors-js-puns").hide();
    } 
})

// Choose an activity and hide the once that have conflicting times
document.querySelector('.activities').addEventListener('change', (e) => {
    let selectedElement = e.target;
    let selectedTime = selectedElement.getAttribute("data-day-and-time")
    let selectedCost = parseInt(selectedElement.getAttribute("data-cost"))

    if (selectedElement.checked === false) {
        totalCost -= selectedCost;
        selectedActivties--;
        costValue.text(totalCost);
        for(i = 0; i < $activties.length; i++) {
            if (selectedTime === $activties[i].getAttribute("data-day-and-time") && selectedElement != $activties[i] ) {
                $($activties[i]).prop('disabled', false);
            }
        }
    } else {
        totalCost+=selectedCost;
        selectedActivties++;
        costValue.text(totalCost);
        for(i = 0; i < $activties.length; i++) {
            if(selectedTime === $activties[i].getAttribute("data-day-and-time") && selectedElement != $activties[i] ) {
                if (selectedElement.checked) {
                    $($activties[i]).prop("disabled",true)
                }     
            }
        }
    }
});

// Only shot payment that has been selected
let $selectedPayment = $('#payment').on('change', 
    function () {
        if(this.value === "credit card") {
            console.log("credit card")
            $('.credit-card').show();
            $('.paypal').hide(); 
            $('.bitcoin').hide(); 
        } else if (this.value === "paypal") {
            console.log("paypall")
            $('.paypal').show();
            $('.credit-card').hide(); 
            $('.bitcoin').hide(); 
        } else if (this.value === "bitcoin") {
            console.log("bitcoin")
            $('.bitcoin').show();
            $('.credit-card').hide(); 
            $('.paypal').hide(); 
        } else if (this.value === "select method") {
            alert("you need to pick a payment method");
            $('#payment').val("credit card")
        }
    }
);

// Real time validation after key down for the input fields
$("#name").after('<p><span class="errorMessage" id="name_error">Please enter a name</span></p>');
$("#mail").after('<p><span class="errorMessage" id="email_error_empty">Dont leave this blank</span></p>')
$("#mail").after('<p><span class="errorMessage" id="email_error_format">Please enter a valid email</span></p>')
$("#cc-num").after('<p><span class ="errorMessage "id="cc-num_error">Please use a valid card (13-16 digits) </span></p>')
$("#zip").after('<p><span class="errorMessage" id="zip_error">Zip needs 5 digits </span></p>')
$("#cvv").after('<p><span class="errorMessage" id="cvv_error">CVV needs 3 digits </span></p>')
$(".activities").after('<p><span class="errorMessage" id="activity_error"> You need to select at least 1 activity </span></p>')

$('#name').on('keypress keydown keyup',function(){
    if(!$(this).val().match($userNameRGEX)) {
        $('#name_error').show();
        $("#name").css("border-bottom-color", "red")
    } else {
        $('#name_error').hide();
        $("#name").css("border-bottom-color", "green")
    }
});

$('#mail').on('keypress keydown keyup',function(){
    if ((!$(this).val().match($userNameRGEX)) && !$(this).val().match($userEmailRGEX)) {
        $('#email_error_format').hide();
        $('#email_error_empty').show();
        $("#mail").css("border-bottom-color", "red")
    } else if (!$(this).val().match($userEmailRGEX)) {
        $('#email_error_empty').hide();
        $('#email_error_format').show();
        $("#mail").css("border-bottom-color", "red")
    } else {
        $('#email_error_format').hide();
        $('#email_error_empty').hide();
        $("#mail").css("border-bottom-color", "green")
    }
});

$('#cc-num').on('keypress keydown keyup',function(){
    if (!$(this).val().match($creditCardRGEX)) {
        $('#cc-num_error').show();
        $("#cc-num").css("border-bottom-color", "red")
    } else {
        $('#cc-num_error').hide();
        $("#cc-num").css("border-bottom-color", "green")
    }
});

$('#zip').on('keypress keydown keyup',function(){
    if (!$(this).val().match($zipCodeRGEX)) {
        $('#zip_error').show();
        $("#zip").css("border-bottom-color", "red");
    } else {
        $('#zip_error').hide();
        $("#zip").css("border-bottom-color", "green");
    }
});
$('#cvv').on('keypress keydown keyup',function(){
    if (!$(this).val().match($cvvCodeRGEX)) {
        $('#cvv_error').show();
        $("#cvv").css("border-bottom-color", "red");
    } else {
        $('#cvv_error').hide();
        $("#cvv").css("border-bottom-color", "green");
    }
});

let nameValidation = () => {
    if(!$("#name").val().match($userNameRGEX)) {
        $("#name").css("border-bottom-color", "red")
        $("#name").first().focus();
        $('#name_error').show();
        return false
    } 
}

let emailBlancValidation = () => {
    if(!$("#mail").val().match($userEmailRGEX) && !$("#mail").val().match($userNameRGEX)) {
        $("#mail").css("border-bottom-color", "red");
        $("#mail").first().focus();
        $('#email_error_empty').show();
        return false
    } 
}

let emailFormValidation = () => {
    if(!$("#mail").val().match($userEmailRGEX)) {
        $("#mail").css("border-bottom-color", "red");
        $("#mail").first().focus();
        $('#email_error_format').show();
        return false
    } 
}

let activityValidator = () => {
    if (selectedActivties < 1){
        $("#activity_error").css("color", "red");
        $("#activity_error").show();
        return false
    } 
}

let ccNumValidator = () => {
    if( $('#payment').val() === "credit card" && !$("#cc-num").val().match($creditCardRGEX)) {
        $("#cc-num").css("border-bottom-color", "red");
        $("#cc-num").first().focus();
        $('#cc-num_error').show();
        return false
    }
}

let zipValidator = () => {
    if($('#payment').val() === "credit card" && !$("#zip").val().match($zipCodeRGEX)) {
        $("#zip").css("border-bottom-color", "red");
        $("#zip").first().focus();
        $('#zip_error').show();
        return false
    } 
}

let cvvValidator = () => {
    if($('#payment').val() === "credit card" && !$("#cvv").val().match($cvvCodeRGEX)) {
        alert("Nope, not gonna work, your CVV is invalid");
        $("#cvv").css("border-bottom-color", "red");
        $("#cvv").first().focus();
        $('#cvv_error').show();
        return false
    } 
}

// validation that checks inputs and only submits form when inputs are correct
let validateFormTest = (e) => {
    if(nameValidation()) {
        return false
    } else if(emailFormValidation()) {
        e.preventDefault();
    } else if (activityValidator()){
        e.preventDefault();
    } else if(ccNumValidator()) {
        e.preventDefault();
    } else if(zipValidator()) {
        e.preventDefault();
    } else if($('#payment').val() === "credit card" && !$("#cvv").val().match($cvvCodeRGEX)) {
        $("#cvv").css("border-bottom-color", "red");
        $("#cvv").first().focus();
        $('#cvv_error').show();
        return false
    } else {return true}
}
    





      

    

  









