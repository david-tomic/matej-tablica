function generateMatrix() {
  console.log('generateMatrix function called'); // Debugging line

  // Get input values
  const numbersInput = document.getElementById('numbers').value;
  const targetSum = parseInt(document.getElementById('targetSum').value, 10);
  const rows = parseInt(document.getElementById('rows').value, 10);
  const cols = parseInt(document.getElementById('columns').value, 10);

  // Convert input values to an array of numbers
  const numbers = numbersInput.split(',').map(Number);

  // Calculate the total number of cells in the matrix
  const totalCells = rows * cols;

  // Generate an array with enough values to fill the matrix
  let flatList = [];
  let currentSum = 0;

  // Fill the list to reach or exceed the targetSum
  while (currentSum < targetSum) {
    flatList = flatList.concat(numbers);
    currentSum = flatList.reduce((acc, val) => acc + val, 0);
  }

  // Trim the flatList to match the targetSum exactly
  while (currentSum > targetSum) {
    flatList.pop();
    currentSum = flatList.reduce((acc, val) => acc + val, 0);
  }

  // Ensure we have enough values to fill the matrix
  if (flatList.length < totalCells) {
    const remainingCells = totalCells - flatList.length;
    flatList = flatList.concat(Array(remainingCells).fill(0)); // Fill remaining cells with 0
  }

  // Shuffle the flatList array
  for (let i = flatList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [flatList[i], flatList[j]] = [flatList[j], flatList[i]];
  }

  // Create the matrix with the specified number of rows and columns
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(flatList.slice(i * cols, (i + 1) * cols));
  }

  // Display the matrix
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
