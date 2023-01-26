const editUserFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length -1
  ];
  // const id = event.target.getAttribute('data-id');

  const username = document.querySelector('#username').value.trim();
  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && email && password) {
    await fetch(`/api/users/:id`, {
       method: 'PUT',
       body: JSON.stringify({
         username,
         email,
         password,
       }),
       headers: {
         'Content-Type': 'application/json',
       },
     });
  
  document.location.replace('/profile');
  }
};

// const editUserFormHandler = async (event) => {
//   event.preventDefault();

//   let username = document.querySelector('#username').value.trim();
//   let email = document.querySelector('#email').value.trim();
//   let password = document.querySelector("#password").value.trim();

//   if (username && email && password) {
//     const response = await fetch(`/api/users`, {
//       method: 'POST',
//       body: JSON.stringify({
//         username,
//         email,
//         password,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create new profile.');
//     }
//   }
// };

const delUserButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/profile/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete profile.');
    }
  }
};

document.querySelector('.edit-profile-form').addEventListener('submit', editUserFormHandler);

document.querySelector('.profile-list').addEventListener('click', delUserButtonHandler);
