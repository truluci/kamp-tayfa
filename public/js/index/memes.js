window.addEventListener('load', () => {
  const uploadForm = document.getElementById('upload-form');

  document.addEventListener('click', event => {
    if (event.target.closest('#toggle-upload-button')) {
      uploadForm.classList.toggle('hidden');
    };
  });
});
