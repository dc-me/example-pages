const loginForm = document.getElementById('login');

loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const usernameVal = validateUsername(this.elements['username']);
  const passwordVal = validatePassword(this.elements['password']);

  if (usernameVal && passwordVal) {
    // form is valid.
    const yes = confirm(
      "Hooray, you've made it, You will be redirected to the logged in page."
    );
    if (yes) {
      location.href = './pages/sba307.html';
    }

    console.log(usernameVal, passwordVal);
  }
});

function validateUsername(username) {
  const usernameVal = username.value.trim();
  if (usernameVal.length < 4) {
    return showErrMsg('Username is required and is at least 4 character long.');
  } else if (!/(^[a-zA-z]{1,}[a-zA-Z0-9]*)$/.test(usernameVal)) {
    return showErrMsg(
      'Username must start with letter and can only contain letters and numbers.'
    );
  }
  return usernameVal;
}

function validatePassword(password) {
  const passwordVal = password.value.trim();
  if (passwordVal.length < 4) {
    return showErrMsg('Password is required and is at least 4 character long.');
  }
  return passwordVal;
}

function showErrMsg(msg) {
  const errMsgEl = loginForm.querySelector('.err-msg');
  errMsgEl.textContent = msg;
  errMsgEl.classList.add('show');
  setTimeout(() => {
    errMsgEl.classList.remove('show');
  }, 4000);
  return false;
}
