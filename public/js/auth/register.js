window.addEventListener('load', () => {
  const registerForm = document.querySelector('.register-form');

  document.addEventListener('submit', (event) => {
    event.preventDefault();

    if (event.target.closest('.register-form')) {
      const formData = new FormData(registerForm);
      const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object

      fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(result => {
        if (result.success)
          return window.location = '/auth/login';

        alert(result.error);
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while registering');
      });
    };
  });
});
