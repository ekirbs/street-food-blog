const newCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment_body = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = document.querySelector('#add-comment-text-area').getAttribute('data-post-id');

  if (comment_body) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment_body,
        post_id: post_id,        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const delCommentBtnHandler = async (event) => {
  
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#comment-button").addEventListener("click", newCommentFormHandler);

document.querySelectorAll('.delete-comment-btn').forEach(button => {
  button.addEventListener('click', delCommentBtnHandler);
});