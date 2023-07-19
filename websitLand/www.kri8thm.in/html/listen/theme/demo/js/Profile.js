function LoadProfile(){
    var data = JSON.parse(sessionStorage.getItem('User'));
    LoadProfileDetails(data)
}

function LoadProfileDetails(data){ 

    let FirstNameUser = document.getElementById("FirstNameUser")
    FirstNameUser.value = data.first
    let LastNameUser = document.getElementById("LastNameUser")
    LastNameUser.value = data.last
    let EmailUser = document.getElementById("EmailUser")
    EmailUser.value = data.email
    let SaveProfileDetails = document.getElementById("SaveProfileDetails")
    SaveProfileDetails.onclick = ()=>{
        UpdateUserDetails((item)=>{
            console.log(item)
        },document.getElementById("FirstNameUser").value,document.getElementById("LastNameUser").value,document.getElementById("EmailUser").value,data.id)
    }
    let ChangePasswordUser = document.getElementById("ChangePasswordUser")
    ChangePasswordUser.onclick = ()=>{
        // show new window for update password with button save
        SwalChangePassword(data)
        // create procedure for it
    }
}
function SwalChangePassword(data){
    Swal.fire({
        title: 'Change password',
        html: `<input type="password" id="OldPassowrd" class="swal2-input" placeholder="Old password">
        <input type="password" id="NewPassword" class="swal2-input" placeholder="New password">`,
        confirmButtonText: 'Save changes',
        focusConfirm: false,
        preConfirm: () => {
          const OldPassowrd = Swal.getPopup().querySelector('#OldPassowrd').value
          const NewPassword = Swal.getPopup().querySelector('#NewPassword').value
          if (!OldPassowrd || !NewPassword) {
            Swal.showValidationMessage(`Please enter login and password`)
          }
          return { OldPassowrd: OldPassowrd, NewPassword: NewPassword }
        }
      }).then((result) => {
        ChangePassowrdForUser((data)=>{
            console.log(data)
        },data.id,result.value.OldPassowrd,result.value.NewPassword)
      })
      
}