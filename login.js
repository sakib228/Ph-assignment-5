// console.log("Login page loaded");

// 1. Add event listener to the login form
document.getElementById('login_btn').addEventListener('click', function () {
  const userNameInput = document.getElementById('User_name');
  const inputValue = userNameInput.value;
  console.log(inputValue);
  const userPasswordInput = document.getElementById('User_password');
  const passwordValue = userPasswordInput.value;
  console.log(passwordValue);

  if (inputValue === 'admin' && passwordValue === 'admin123') {
    alert('Login successful!');
    window.location.assign('./Ph-assignment-5/home.html');
  } else {
    alert('Invalid username or password.');
    return;
  }
});

// 2.get Elements by id of 2 inputs
// 3.check condition to login
