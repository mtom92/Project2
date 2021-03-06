$(document).on('click', '#jobButton', function(e) {
            swal({
              title: "Are you a user? ",
              type: "info",
              showConfirmButton: false,
              html:
              '<p>Please</p>' + '<br>' +
              '<a id="asign" href="/auth/signup">Sign Up</a>   ' +
              '   <a href="/auth/login">Log in </a> '
            })
        });

$(document).on('click', '#addSkill', function(e) {
                    swal({
                      title: 'Add skill',
                      input: 'text',
                      showCancelButton: true,
                      confirmButtonText: 'Submit',
                      showLoaderOnConfirm: true,
                      preConfirm: (text) => {
                        console.log((typeof text))
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            if (!text) {
                              swal.showValidationError('Write something')
                            }
                            resolve()
                          }, 2000)
                        })
                      },
                      allowOutsideClick: true
                    }).then((result) => {
                     if (result.value) {
                       $.ajax({
                          url: '/profile',
                          type: 'POST',
                          data: {
                             result: result
                                },
                          success : function(){
                            setTimeout(function(){ window.location.reload() }, 1500);

                          }
                          });

                     swal({
                       type: 'success',
                       title: 'Skill Added!',
                       showConfirmButton: false
                     })
                   }

            })
        });
