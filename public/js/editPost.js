const editPostFormHandler = async (event) => {
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

const delPostButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // alert('Failed to delete profile.');
      alert(response.statusText);
    }
  }
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);

// document.querySelector('.profile-list').addEventListener('click', delPostButtonHandler);
document.querySelector(".delete-post-btn").addEventListener("click", deletePostFormHandler);
