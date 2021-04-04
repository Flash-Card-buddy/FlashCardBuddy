async function editFormHandler(event) {
  event.preventDefault();

  const front = document.querySelector('input[name="card-front"]').value.trim();
  const back = document.querySelector('input[name="card-back"]').value.trim();
  
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/card/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      front,
      back
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

async function newCardHandler(event) {
  event.preventDefault();

  const card_front = document.querySelector('input[name="card-front"]').value;
  const card_back = document.querySelector('input[name="card-back"]').value;
  
  
  const deck_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  const response = await fetch(`/api/cards`, {
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

document.querySelector('.new-card-form').addEventListener('submit', newCardHandler);

document.querySelector('.edit-card-form').addEventListener('submit', editFormHandler);
