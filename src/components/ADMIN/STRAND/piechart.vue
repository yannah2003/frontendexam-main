<template>
    <div>
      <Pie :data="chartData" :options="chartOptions"></Pie>
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  export default {
    name: 'PieChart',
    components: {
      Pie
    },
    props: {
      passed: {
        type: Number,
        required: true
      },
      failed: {
        type: Number,
        required: true
      }
    },
    computed: {
      chartData() {
        return {
          labels: ['Passed', 'Failed'],
          datasets: [
            {
              backgroundColor: ['#4caf50', '#f44336'],
              data: [this.passed, this.failed]
            }
          ]
        }
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  