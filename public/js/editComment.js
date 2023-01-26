const editCommentFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length -1
  ];

  const comment_body = document.querySelector(`textarea[name="comment-body"]`).value;

  await fetch(`/api/comments/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      comment_body,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  document.location.replace('/profile');
  
};

document.querySelector('.edit-comment-form').addEventListener('submit', editCommentFormHandler);