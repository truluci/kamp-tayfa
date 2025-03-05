window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');

  document.addEventListener('click', event => {
    if (event.target.closest('#toggle-upload-button'))
      uploadForm.classList.toggle('hidden');
  });

  document.addEventListener('submit', (event) => {
    if (!event.target.closest('#upload-form')) return;
    
    event.preventDefault();

    const formData = new FormData(uploadForm);

    fetch('/memes', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(result => {
        if (result.success) 
          return window.location.reload();

        alert(result.error);
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while adding meme');
      });
  });
});
