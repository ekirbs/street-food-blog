const newPostFormHandler = async (event) => {
  event.preventDefault();

  // const title = document.querySelector(`input[name="title"]`).value.trim();
  // const post_body = document.querySelector(`textarea[name="post-body"]`).value.trim();

  const title = document.querySelector('#title').value.trim();
  const post_body = document.querySelector('#post-body').value.trim();

  if (title && post_body) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(title, post_body)
    console.log(response);
    if (response.ok) {
      document.location.replace('/profile'); // maybe try document.location.reload()
    } else {
      alert('Failed to create post.');
    }
  }
};

const delPostButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/post');
    } else {
      alert('Failed to delete post.');
    }
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostFormHandler);

document.querySelector('.delete-post-btn').addEventListener('click', delPostButtonHandler);