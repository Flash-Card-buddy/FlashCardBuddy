async function newFormHandler(event) {
  event.preventDefault();

  const front = document.querySelector('input[name="card-front"]').value;
  const back = document.querySelector('input[name="card-back"]').value;
  

  const response = await fetch(`/api/card`, {
    method: 'POST',
    body: JSON.stringify({
      front,
      back      
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