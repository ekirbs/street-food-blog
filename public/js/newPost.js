const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
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

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
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

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostFormHandler);

document
  .querySelector('.post-list')
  .addEventListener('click', delPostButtonHandler);
