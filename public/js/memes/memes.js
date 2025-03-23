window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');

  document.addEventListener('click', (event) => {
    if (event.target.closest('#toggle-upload-button'))
      uploadForm.classList.toggle('hidden');

    // Handle Delete Button Click
    const deleteButton = event.target.closest('.delete-button');
    if (deleteButton) {
      event.preventDefault();

      const memeId = deleteButton.getAttribute('data-id');

      if (!confirm('Are you sure you want to delete this meme?')) return;

      fetch(`/memes/${memeId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok) throw new Error('Failed to delete');
          deleteButton.closest('.meme').remove(); // Remove from UI
        })
        .catch(err => {
          console.error(err);
          alert('Error deleting meme');
        });
    }
  });

  document.addEventListener('submit', (event) => {
    if (!event.target.closest('#upload-form')) return;
    
    event.preventDefault();
    const formData = new FormData(uploadForm);

    fetch('/memes', { method: 'POST', body: formData })
      .then(response => response.json())
      .then(result => {
        if (result.success) return window.location.reload();
        alert(result.error);
      })
      .catch(err => {
        console.error(err);
        alert('An error occurred while adding meme');
      });
  });
});
