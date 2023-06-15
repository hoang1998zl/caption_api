

function Users() {
    email: '';
    password: '';
    name: '';
    gender: true;
    phone: '';
}

function postUser() {
    var users = new Users();
    users.email = document.getElementById('email').value;
    users.password = document.getElementById('password').value;
    users.name = document.getElementById('fullname').value;
    users.phone = document.getElementById('phone').value;

    if (document.getElementById('male').checked == true) {
        users.gender = true;
    } else if (document.getElementById('female').checked == true) {
        users.gender = false;
    }
    console.log(
        `
        ${users.email} <br/>
        ${users.password} <br/>
        ${users.name} <br/>
        ${users.phone} <br/>  
        ${users.gender} 
      `
    );

    var promise = new axios({
        url: 'https://shop.cyberlearn.vn/api/Users/signup',
        method: 'POST',
        data: users,
    });
    promise.then(function (result) {
        console.log(result);
    }).catch(function (error) {
        console.log("Thất bại" + error);
    });
}