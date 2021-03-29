async function newFormHandler(event) {
  event.preventDefault();

  const card_front = document.querySelector('input[name="card-front"]').value;
  const card_back = document.querySelector('input[name="card-back"]').value;
  // const deck_id = document.querySelector('input[name="deck-id"]').value;
  
  const deck_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  console.log(typeof deck_id)
  console.log(deck_id)
  console.log(window.location)
  
  const response = await fetch(`/api/card`, {
    method: 'POST',
    body: JSON.stringify({
      card_front,
      card_back,
      deck_id     
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