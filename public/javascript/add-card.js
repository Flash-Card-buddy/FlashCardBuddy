async function newFormHandler(event) {
  event.preventDefault();

  const card_front = document.querySelector('input[name="card-front"]').value;
  const card_back = document.querySelector('input[name="card-back"]').value;
  // const deck_id = document.querySelector('input[name="deck-id"]').value;
  

  const response = await fetch(`/api/card`, {
    method: 'POST',
    body: JSON.stringify({
      card_front,
      card_back,
      // deck_id     
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

document.querySelector('.new-card-form').addEventListener('submit', newFormHandler);