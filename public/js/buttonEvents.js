var deleteButton = document.querySelector('#deleteButton');
var editButton = document.getElementById('editButton');

function divShow (event) {
  editButton.style.display = 'none';
  document.getElementById('hiddenEdit').style.display = 'flex';
}
