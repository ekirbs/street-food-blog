const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post_body = document.querySelector("#post-body").value.trim();

  if (title && post_body) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        title,
        post_body,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create post.");
    }
  }
};

const delPostButtonHandler = async (event) => {

  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });
    console.log(response);
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".new-post-form").addEventListener("submit", newPostFormHandler);

document.querySelectorAll('.delete-post-btn').forEach(button => {
  button.addEventListener('click', delPostButtonHandler);
});