async function newFormHandler(event) {
  event.preventDefault();

  const deck = document.querySelector('input[name="deck-name"]').value;
  

  const response = await fetch(`/api/deck`, {
    method: 'POST',
    body: JSON.stringify({
      deck      
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