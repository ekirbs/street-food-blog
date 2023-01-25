const editCommentFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length -1
  ];
  const title = document.querySelector(`input[name="title"]`).value;
  const post_body = document.querySelector(`textarea[name="post-body"]`).value;

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/profile');
  } else {
    alert('Failed to create new profile.');
  }
};

// const deleteCommentButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');
//     console.log(id);

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'DELETE',
//     });
//     console.log(response);
//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       // alert('Failed to delete profile.');
//       alert(response.statusText);
//     }
//   }
// };

document.querySelector('.edit-comment-form').addEventListener('submit', editCommentFormHandler);

// document.querySelector(".delete-comment-btn").addEventListener("click", deleteCommentButtonHandler);