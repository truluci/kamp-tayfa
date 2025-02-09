document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-upload-button');
    const uploadForm = document.getElementById('upload-form');
  
    toggleButton.addEventListener('click', () => {
      if (uploadForm.classList.contains('hidden')) {
        uploadForm.classList.remove('hidden');
      } else {
        uploadForm.classList.add('hidden');
      }
    });
  });
  
  