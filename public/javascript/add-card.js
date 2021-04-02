async function saveCardHandler(event) {
  event.preventDefault();

  const card_front = document.querySelector('input[name="card-front"]').value;
  const card_back = document.querySelector('input[name="card-back"]').value;
  // const deck_id = document.querySelector('input[name="deck-id"]').value;
  
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


  //This is new code that will allow the cards to keep being made until they are done making them
  if (response.ok) {
    response.json()
    .then(data => { document.location.replace('/card/add/' + data.deck_id) })
    console.log(data)
  } else {
    alert(response.statusText);
  }


}

async function finishDeckHandler(event) {
  event.preventDefault();

  const card_front = document.querySelector('input[name="card-front"]').value;
  const card_back = document.querySelector('input[name="card-back"]').value;
  // const deck_id = document.querySelector('input[name="deck-id"]').value;
  
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


document.querySelector('#saveCard').addEventListener('click', saveCardHandler);


document.querySelector('#finishDeck').addEventListener('click', finishDeckHandler);