const registrationForm = document.getElementById('registration');
const errorDisplayEl = document.getElementById('errorDisplay');
const loginForm = document.getElementById('login');

registrationForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const username = this.elements['username'];
  const usernameVal = username.value.trim();
  const email = this.elements['email'];
  const emailVal = email.value.trim();
  const password = this.elements['password'];
  const passwordVal = password.value;

  if (!isValidUsername.call(username, usernameVal, users)) {
    username.focus();
    return false;
  }

  if (!isValidEmail.call(email, emailVal)) {
    email.focus();
    return false;
  }

  if (!isValidPassword.call(password, passwordVal, usernameVal)) {
    password.focus();
    return false;
  }

  if (passwordVal !== this.elements['passwordCheck'].value) {
    showErrorMsg('Both passwords must match.');
    this.elements['passwordCheck'].focus();
    return false;
  }

  if (!this.elements['terms'].checked) {
    showErrorMsg('The terms and conditions must be accepted.');
    return false;
  }

  // form is valid, proceed.
  users[usernameVal.toLowerCase()] = {
    username: usernameVal.toLowerCase(),
    email: emailVal.toLowerCase(),
    password: passwordVal,
  };

  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful, you can login now!');
  this.reset();
});

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users')) || {};
  const username = this.elements['username'];
  const usernameVal = username.value.trim();
  const password = this.elements['password'];
  const passwordVal = password.value;

  if (usernameVal.length < 1) {
    showErrorMsg('The username cannot be blank.');
    return false;
  }

  const user = users[usernameVal.toLowerCase()];

  if (!user) {
    showErrorMsg('The user does not exist!');
    return false;
  }

  if (passwordVal.length < 1) {
    showErrorMsg('The password cannot be blank.');
    return false;
  }
  if (user.password !== passwordVal) {
    showErrorMsg('The password is incorrect.');
  } else {
    // you are in.
    if (this.elements['persist'].checked) {
      alert('You are logged in, and you are remembered.');
    } else {
      alert('You are logged in.');
    }
    this.reset();
  }
});

function isValidPassword(passwordVal, username) {
  if (passwordVal.length < 12) {
    showErrorMsg('Passwords must be at least 12 characters long.');
    return false;
  }

  if (!(/[A-Z]{1,}/.test(passwordVal) && /[a-z]{1,}/.test(passwordVal))) {
    showErrorMsg(
      'Passwords must have at least one uppercase and one lowercase letter.'
    );
    return false;
  }

  if (!/[0-9]{1,}/.test(passwordVal)) {
    showErrorMsg('Passwords must contain at least one number.');
    return false;
  }

  if (!/[^A-Za-z0-9]/.test(passwordVal)) {
    showErrorMsg('Passwords must contain at least one special character.');
    return false;
  }

  if (/password/i.test(passwordVal)) {
    showErrorMsg(
      'Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).'
    );
    return false;
  }

  if (passwordVal.includes(username)) {
    showErrorMsg('Passwords cannot contain the username.');
    return false;
  }

  return true;
}

function isValidEmail(emailVal) {
  if (!emailVal) {
    showErrorMsg('The email must not be blank.');
    return false;
  }
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(emailVal)) {
    showErrorMsg('The email must be a valid email address.');
    return false;
  }
  if (emailVal.lastIndexOf('example.com') > 0) {
    showErrorMsg('The email must not be from the domain "example.com."');
    return false;
  }
  return true;
}

function isValidUsername(usernameVal, users) {
  const usernameReg = /(?:[^`!@#$%^&*\-_=+'\/.,]*[`!@#$%^&*\-_=+'\/.,]){2}/;
  if (usernameVal === '') {
    showErrorMsg('The username cannot be blank.');
    return false;
  }

  if (users[usernameVal]) {
    showErrorMsg('That username is already taken.');
    return false;
  }

  if (usernameVal.length < 4) {
    showErrorMsg('The username must be at least four characters long.');
    return false;
  }

  if (!hasUniqueChar(usernameVal)) {
    return showErrorMsg(
      'The username must contain at least two unique characters.'
    );
  }

  if (!/[^\s\&\*\@\#\$\(\)]/.test(usernameVal)) {
    showErrorMsg(
      'The username cannot contain any special characters or whitespace.'
    );
    return false;
  }

  return true;
}

function showErrorMsg(msg) {
  errorDisplayEl.textContent = msg;
  errorDisplayEl.classList.add('show');

  setTimeout(() => {
    errorDisplayEl.classList.remove('show');
  }, 3000);
}

// qbcd
function hasUniqueChar(str, uniqueNum = 2) {
  const unique = [];
  for (const c of str) {
    if (!unique.includes(c)) {
      unique.push(c);
    }
    if (unique.length >= uniqueNum) {
      return true;
    }
  }
  return false;
}
