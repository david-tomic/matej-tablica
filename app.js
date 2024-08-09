function generateMatrix() {
  console.log('generateMatrix function called'); // Debugging line

  // Get input values
  const numbersInput = document.getElementById('numbers').value;
  const targetSum = parseInt(document.getElementById('targetSum').value, 10);
  const rows = parseInt(document.getElementById('rows').value, 10);
  const cols = parseInt(document.getElementById('columns').value, 10);

  const numbers = numbersInput.split(',').map(Number);

  let matrix = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(0));
  let flatList = [];

  // Generate initial random list
  while (flatList.reduce((acc, val) => acc + val, 0) < targetSum) {
    flatList = flatList.concat(numbers);
  }

  flatList = flatList.slice(0, rows * cols); // Ensure correct number of elements

  // Shuffle the flatList array
  for (let i = flatList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatList[i], flatList[j]] = [flatList[j], flatList[i]];
  }

  // Fill matrix with values from shuffled list
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = flatList[i * cols + j];
    }
  }

  const matrixContainer = document.getElementById('matrixContainer');
  matrixContainer.innerHTML = '';
  const table = document.createElement('table');
  matrix.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  matrixContainer.appendChild(table);
}
