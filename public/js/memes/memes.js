window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');
  const editForm = document.getElementById('edit-form');

  document.addEventListener('click', (event) => {
    if (event.target.closest('#toggle-upload-button'))
      uploadForm.classList.toggle('hidden');

    if (event.target.closest('.delete-button')) {
      const deleteButton = event.target.closest('.delete-button');
      event.preventDefault();

      const memeId = deleteButton.closest('.meme').getAttribute('data-id');

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
      const memeId = editButton.closest('.meme').getAttribute('data-id');
      const title = editButton.getAttribute('data-title');
      const description = editButton.getAttribute('data-description');

      // Fill the edit form
      document.getElementById('edit-meme-id').value = memeId;
      document.getElementById('edit-title').value = title;
      document.getElementById('edit-description').value = description;

      // Show edit form
      editForm.classList.remove('hidden');
      return
    }

    if (
      !event.target.closest('#upload-form') &&
      !event.target.closest('#toggle-upload-button')
    ) {
      uploadForm.classList.add('hidden');
    }

    if (!event.target.closest('#edit-form') && !event.target.closest('.edit-button')) {
      editForm.classList.add('hidden');
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
  
  document.addEventListener('scroll', (event) => {
    if (document.documentElement.scrollTop + document.documentElement.offsetHeight >= document.documentElement.scrollHeight ){
      const lastMemeId = document.querySelector('.meme:last-of-type').getAttribute('data-id');
      const search = document.querySelector('.search-input').value;

      fetch(`/memes/filter?lastMemeId=${lastMemeId}&search=${search}`)
        .then(response => response.json())
        .then(result => {
          if (!result.success) return alert('Failed to load more memes');

          for (const meme of result.memes) {
            const template = document.querySelector('.meme-template').content.cloneNode(true);
            const userId = document.querySelector('.hidden#user-id').getAttribute('data-user-id');
            
            template.querySelector('.meme').setAttribute('data-id', meme._id);
            template.querySelector('h2').innerText = meme.title;
            template.querySelector('img').src = meme.fileUrl;
            template.querySelector('img').alt = meme.title;
            template.querySelector('p').innerText = meme.description;
            if (userId === meme.owner) {
              const editButton = template.querySelector('.edit-button');
              editButton.setAttribute('data-title', meme.title);
              editButton.setAttribute('data-description', meme.description);
            } else {
              template.querySelector('.meme-actions').remove();
            }
            document.querySelector('.memes-container').appendChild(template);
          }
        })
        .catch(err => {
          console.error(err);
          alert('An error occurred while loading more memes');
        });
    }
  }, { passive: true });
});
