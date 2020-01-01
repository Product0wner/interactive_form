// Set focus on first input field on page
$("input").first().focus();

// Initially hide the other-job section
$("#other-title").hide();

// Show job section if user clicked on "other"
var $value = $('#title').on('change', 
    function () {
        if(this.value != "other") {
            $("#other-title").hide(); 
        }else {
            $("#other-title").show();
        }
    }
  );

