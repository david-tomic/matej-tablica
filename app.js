function generateMatrix() {
  console.log('generateMatrix function called'); // Debugging line

  // Get input values
  const numbersInput = document.getElementById('numbers').value;
  const targetSum = parseInt(document.getElementById('targetSum').value, 10);
  const rows = parseInt(document.getElementById('rows').value, 10);

  // Convert input values to an array of numbers
  const numbers = numbersInput.split(',').map(Number);

  // Function to get a random combination of numbers to reach the target sum
  function getRandomCombination(target, nums) {
    let combination = [];
    let sum = 0;

    // Continue adding random numbers until we reach or exceed the target sum
    while (sum < target) {
      const num = nums[Math.floor(Math.random() * nums.length)];
      if (sum + num <= target) {
        combination.push(num);
        sum += num;
      }
    }

    return combination;
  }

  // Get a random combination that sums up to the targetSum
  let combination = getRandomCombination(targetSum, numbers);

  // Calculate the number of columns based on the number of rows and total items needed
  const totalCells = rows * Math.ceil(combination.length / rows);
  const cols = Math.ceil(combination.length / rows);

  // Ensure the matrix has enough cells
  if (combination.length < totalCells) {
    combination = combination.concat(
      Array(totalCells - combination.length).fill(0)
    ); // Fill remaining cells with 0
  } else {
    combination = combination.slice(0, totalCells); // Trim if necessary
  }

  // Shuffle the combination array
  for (let i = combination.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combination[i], combination[j]] = [combination[j], combination[i]];
  }

  // Create the matrix with the determined number of rows and columns
  let matrix = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(combination.slice(i * cols, (i + 1) * cols));
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
