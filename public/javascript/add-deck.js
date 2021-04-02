async function newFormHandler(event) {
  event.preventDefault();

  const deck_name = document.querySelector('input[name="deck-name"]').value;
  

  const response = await fetch(`/api/deck`, {
    method: 'POST',
    body: JSON.stringify({
      deck_name     
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    response.json()
    .then(data => { document.location.replace('/card/add/' + data.id) })
    console.log(data)
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-deck-form').addEventListener('submit', newFormHandler);