window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');
  const editForm = document.getElementById('edit-form');

  document.addEventListener('click', (event) => {
    if (event.target.closest('#toggle-upload-button'))
      uploadForm.classList.toggle('hidden');

    if (event.target.closest('.delete-button')) {
      const deleteButton = event.target.closest('.delete-button');
      event.preventDefault();

      const memeId = deleteButton.getAttribute('data-id');

      if (!confirm('Are you sure you want to delete this meme?')) return;

      fetch(`/memes/${memeId}`, { method: 'DELETE' })
        .then(response => {
          if (!response.ok)
            return alert('Failed to delete');

          deleteButton.closest('.meme').remove();
        })
        .catch(err => {
          console.error(err);
          alert('Error deleting meme');
        });
    }

    if (event.target.closest('.edit-button')) {
      const editButton = event.target.closest('.edit-button');
      event.preventDefault();

      // Get existing values
      const memeId = editButton.getAttribute('data-id');
      const title = editButton.getAttribute('data-title');
      const description = editButton.getAttribute('data-description');

      // Fill the edit form
      document.getElementById('edit-meme-id').value = memeId;
      document.getElementById('edit-title').value = title;
      document.getElementById('edit-description').value = description;

      // Show edit form
      editForm.classList.remove('hidden');
    }
  });

  document.addEventListener('submit', (event) => {
    if (event.target.closest('#upload-form')) {
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
    }

    if (event.target.closest('#edit-form')) {
      event.preventDefault();

      const memeId = document.getElementById('edit-meme-id').value;
      const title = document.getElementById('edit-title').value;
      const description = document.getElementById('edit-description').value;

      fetch(`/memes/${memeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description })
      })
        .then(response => response.json())
        .then(result => {
          if (result.success) return window.location.reload();
          alert(result.error);
        })
        .catch(err => {
          console.error(err);
          alert('An error occurred while updating meme');
        });
    }
  });
});
