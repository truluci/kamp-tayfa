// // Assuming the token is stored in localStorage after user login
// const token = localStorage.getItem('userToken');

// // Form submission event
// const form = document.querySelector('#meme-upload-form');
// form.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     // Get form data (you may need to collect form fields like meme image, title, etc.)
//     const formData = new FormData(form);

//     try {
//         // Send the request with Authorization header
//         const response = await fetch('https://localhost:3000/memes', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Include token in Authorization header
//             },
//             body: formData, // Attach form data (file and other fields)
//         });

//         const result = await response.json();

//         if (response.ok) {
//             console.log('Meme uploaded successfully', result);
//         } else {
//             console.error('Error uploading meme:', result);
//         }
//     } catch (error) {
//         console.error('Request failed:', error);
//     }
// });
