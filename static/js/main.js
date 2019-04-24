$(document).on('click', '#addJob', function(e) {
            swal({
              title: "Are you a user? ",
              type: "info",
              showConfirmButton: false,
              html:
              '<p>Please</p>' + '<br>' +
              '<a class="psign" href="/auth/signup">Sign Up</a>' +
              '<a href="/auth/login">Log in </a> '
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
                        return new Promise((resolve) => {
                          setTimeout(() => {
                            console.log('the result*************',text)
                            if (/\d/.test(text) || !text) {
                              swal.showValidationError('This skill is invalid ')
                            }
                            resolve()
                          }, 2000)
                        })
                      },
                      allowOutsideClick: false
                    }).then((result) => {
                      if (result.value) {
                        db.skill.findOrCreate(
                          {where: { name: result.value}
                        })
                        .then(()=>{
                             swal({
                               type: 'success',
                               title: 'Skill added'
                              })
                        }).catch(function(error) {
                          console.log(error)
                          res.status(400).render('404')
                        })

                      }

                    })
                });
