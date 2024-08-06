<template>
    <div class="container">
      <h1>PENDING EXAM</h1>
      <div class="row">
        <div class="col-4 left">
          <div class="numbers-container">
            <div 
              v-for="number in numbers" 
              :key="number" 
              :class="['number-box', { 'active': number === selectedNumber }]"
              @click="selectNumber(number)"
            >
              {{ number }}
            </div>
          </div>
        </div>
        <div class="col-8 right">
          <div v-if="selectedNumber">
            <h2>Details for Number {{ selectedNumber }}</h2>
            <p>This is a placeholder for details related to the selected number.</p>
          </div>
          <div v-else>
            <p>Select a number to see details here.</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'PendingExam',
    data() {
      return {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8], // Example data, replace with actual data
        selectedNumber: null // To store the currently selected number
      };
    },
    methods: {
      selectNumber(number) {
        this.selectedNumber = number; // Set the selected number
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    margin: 20px;
  }
  
  .row {
    display: flex;
  }
  
  .col-4, .col-8 {
    padding: 10px;
  }
  
  .left {
    background-color: #f8f9fa; /* Light grey background for left column */
    border-right: 1px solid #3b1818; /* Light border to separate columns */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }
  
  .numbers-container {
    display: flex;
    flex-wrap: wrap; /* Allow numbers to wrap to the next line if needed */
    gap: 10px; /* Space between numbers */
  }
  
  .number-box {
    background-color: #ffffff; /* White background for each box */
    border: 1px solid #3b1818; /* Border color for the box */
    border-radius: 5px; /* Rounded corners */
    padding: 10px 15px; /* Padding inside the box */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem; /* Font size for the number */
    cursor: pointer; /* Pointer cursor on hover */
  }
  
  .number-box:hover {
    background-color: #e0e0e0; /* Light grey background on hover */
  }
  
  .number-box.active {
    background-color: #3887db94; /* Blue background for the active number */
    color: #ffffff; /* White text color for the active number */
  }
  
  .right {
    background-color: aqua; /* Aqua background for right column */
    padding: 20px; /* Padding inside the right column */
  }
  </style>
  