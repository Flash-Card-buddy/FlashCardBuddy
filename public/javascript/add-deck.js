async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="deck-title"]').value;  

  const response = await fetch(`/api/posts`, {
    method: 'deck',
    body: JSON.stringify({
      title,
      text: ""
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-deck-form').addEventListener('submit', newFormHandler);