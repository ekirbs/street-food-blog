const newCommentFormHandler = async (event) => {
  event.preventDefault();


  const comment_body = document.querySelector('textarea[name="comment-body"]').value.trim();
  const post_id = document.querySelector('#add-comment-text-area').getAttribute('data-post-id')
  // console.log(comment_body);
  // console.log(post_id);

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
    // console.log(response);

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

const delCommentBtnHandler = async (event) => {
  // console.log("delete comment button pressed.");
  // console.log(event);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    // console.log(id);
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    // console.log(response);
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