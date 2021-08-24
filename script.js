const q = document.getElementById('pokemon-types');

function filterByType() {
    console.log(q.value);
}
q.onchange = filterByType;