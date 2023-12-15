document.addEventListener('DOMContentLoaded', function () {
    var registerForm = document.getElementById('registerForm');
    var progressBar = document.getElementById('progressBar');
  
    registerForm.addEventListener('input', function () {
      updateProgressBar();
    });
  
    var genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(function (input) {
      input.addEventListener('change', function () {
        updateProgressBar();
      });
    });
  
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (document.getElementById('confirm').checked) {
        var formData = getFormData();
  
        // In a real-world scenario, you would open the IndexedDB connection and add data here
        openIndexedDB(formData);
  
        alert('Registration successful!');
        clearForm();
        updateProgressBar(); // Reset progress bar after form submission
      } else {
        alert('Please confirm that the data entered is not fictitious.');
      }
    });
  });
  
  function getFormData() {
    return {
      email: document.getElementById('email').value,
      personalURL: document.getElementById('personalURL').value,
      dob: document.getElementById('dob').value,
      gender: document.querySelector('input[name="gender"]:checked').value,
      comments: document.getElementById('comments').value,
    };
  }
  
  function clearForm() {
    document.getElementById('registerForm').reset();
  }
  
  function updateProgressBar() {
    var form = document.getElementById('registerForm');
    var progressBar = document.getElementById('progressBar');
    var progressValue = calculateProgress(form);
  
    progressBar.style.width = progressValue + '%';
  }
  
  function calculateProgress(form) {
    var totalFields = form.elements.length;
    var filledFields = 0;
  
    for (var i = 0; i < form.elements.length; i++) {
      if (form.elements[i].type !== 'button' && form.elements[i].value !== '') {
        filledFields++;
      }
    }
  
    return (filledFields / totalFields) * 100;
  }
  
  function openIndexedDB(formData) {
    var request = indexedDB.open('UserDatabase', 1);
  
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
  
      // Create an object store named 'users'
      var objectStore = db.createObjectStore('users', { keyPath: 'email' });
  
      // Create an index to search users by email
      objectStore.createIndex('email', 'email', { unique: true });
    };
  
    request.onsuccess = function (event) {
      var db = event.target.result;
      var transaction = db.transaction(['users'], 'readwrite');
      var objectStore = transaction.objectStore('users');
  
      // Add the form data to the 'users' object store
      var addRequest = objectStore.add(formData);
  
      addRequest.onsuccess = function () {
        console.log('Data added to IndexedDB successfully');
      };
  
      addRequest.onerror = function () {
        console.error('Error adding data to IndexedDB');
      };
  
      transaction.oncomplete = function () {
        db.close();
      };
    };
  
    request.onerror = function (event) {
      console.error('Error opening IndexedDB', event.target.errorCode);
    };
  }
  