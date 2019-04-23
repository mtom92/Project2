$(document).on('click', '#success', function(e) {
            swal({
              title: "Are you a user? ",
              type: "info",
              confirmButtonText: "Ok",
              html:
              '<p>Please</p>' + '<br>' +
              '<a class="psign" href="/auth/signup">Sign Up</a>' + 
              '<a href="/auth/login">Log in </a> '
            })
        });
