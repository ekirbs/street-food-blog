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
      // document.location.replace('/profile');
      document.location.reload();
    } else {
      // alert('Failed to create comment');
      alert(response.statusText);
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // document.location.replace('/comment');
      document.location.reload();
    } else {
      // alert('Failed to delete comment.');
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.new-comment-form')
  .addEventListener('submit', newCommentFormHandler);
