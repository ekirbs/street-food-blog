// const deletePostFormHandler = async (event) => {
//   event.preventDefault();

//   const id = window.location.toString().split("/")[
//     window.location.toString().split("/").length -1
//   ];

//   const response = await fetch(`/api/posts/${id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     document.location.replace("/profile");
//   } else {
//     alert(response.statusText);
//   };
// };

// document.querySelector(".delete-post-btn").addEventListener("click", deletePostFormHandler);

const deletePostButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      // alert('Failed to delete profile.');
      alert(response.statusText);
    }
  }
};

document.querySelector(".delete-post-btn").addEventListener("click", deletePostFormHandler);
