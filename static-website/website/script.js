document.getElementById('increment-btn').addEventListener('click', function() {
  let counter = document.getElementById('counter');
  counter.textContent = parseInt(counter.textContent) + 1;
});
