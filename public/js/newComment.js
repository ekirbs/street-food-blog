const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector("#comment-body").value.trim();

  if (comment_body) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create comment');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comment/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/comment');
    } else {
      alert('Failed to delete comment.');
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);
