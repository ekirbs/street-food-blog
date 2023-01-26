const editPostFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length -1
  ];
  // const id = event.target.getAttribute('data-id');

  const title = document.querySelector(`input[name="post-title"]`).value;
  const post_body = document.querySelector(`textarea[name="post-body"]`).value;

  await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      post_body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  document.location.replace('/dashboard');
  
};

document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);