const newCommentFormHandler = async (event) => {
  event.preventDefault();

  // const comment_body = document.querySelector("#comment-body").value.trim();
  const comment_body = document.querySelector('textarea[name="comment-body"]').value.trim();
  console.log(comment_body);

  if (comment_body) {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        comment_body,
        post_id: window.location.toString().split("/").length -1,        
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);

    if (response.ok) {
      // document.location.replace('/profile');
      // document.location.reload();
    } else {
      // alert('Failed to create comment');
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
      // document.location.replace('/comment');
      document.location.reload();
    } else {
      // alert('Failed to delete comment.');
      alert(response.statusText);
    }
  }
};

document.querySelector(".new-comment-form").addEventListener("submit", newCommentFormHandler);
// document.querySelector(".delete-comment-btn").addEventListener("click", delCommentBtnHandler);