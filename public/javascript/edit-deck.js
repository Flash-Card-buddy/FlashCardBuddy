async function editFormHandler(event) {
  event.preventDefault();

  const deck = document.querySelector('input[name="deck-name"]').value.trim();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/deck/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      deck
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.edit-deck-form').addEventListener('submit', editFormHandler);
