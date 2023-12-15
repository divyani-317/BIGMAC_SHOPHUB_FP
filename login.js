function validateForm() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
  
    // Hardcoded credentials (in a real scenario, these should be stored securely on the server)
    var validUsername = 'user123';
    var validPassword = 'pass123';
  
    // Regular expressions for validation
    var usernameRegex = /^[a-zA-Z0-9_]+$/; // Alphanumeric and underscore
    var passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+]+$/; // Alphanumeric and some special characters

  
    if (!usernameRegex.test(username) || !passwordRegex.test(password)) {
      errorMessage.textContent = 'Invalid username or password format.';
      console.log('Invalid username or password format.');
    } else if (username !== validUsername || password !== validPassword) {
      errorMessage.textContent = 'Incorrect username or password.';
      console.log('Incorrect username or password.');
    } else {
      errorMessage.textContent = ''; // Clear error message
      alert('Login successful! Redirecting to homepage...');
      console.log('Login successful! Redirecting to homepage...');
      
      // Redirect to the homepage (replace 'homepage.html' with the actual homepage URL)
      window.location.href = 'home.html';
    }
  }
  