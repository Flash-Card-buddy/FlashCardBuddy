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

document.querySelector('.edit-card-form').addEventListener('submit', editFormHandler);
