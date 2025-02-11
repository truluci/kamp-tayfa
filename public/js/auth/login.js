window.addEventListener('load', () => {
  const loginForm = document.querySelector('.login-form');
    
  document.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(event.target.closest('#login-form'));
    console.log(event.target);

    if (event.target.closest('.login-form')) {
      const formData = new FormData(loginForm);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object
  
      fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location = '/memes';
        } else {
          alert(result.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while logging in');
      });
    }
  });
});