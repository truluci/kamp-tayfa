window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');

  document.addEventListener('click', event => {
    if (event.target.closest('#toggle-upload-button')) {
      uploadForm.classList.toggle('hidden');
    };
  });

  document.addEventListener('submit', (event) => {
    if (!event.target.closest('#upload-form')) return;

    event.preventDefault();

    const formData = new FormData(uploadForm);
    const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object

    fetch('/memes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          window.location.reload();
        } else {
          alert(result.error);
        }
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while adding meme');
      });
  });
});
