<template>
    <div class="p-chart">
      <canvas ref="canvas" :width="width" :height="height"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);
  
  export default {
    name: 'BarChart',
    props: {
      data: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: () => ({
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        }),
      },
      width: {
        type: Number,
        default: 400
      },
      height: {
        type: Number,
        default: 200
      }
    },
    mounted() {
      this.initChart();
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();
      }
    },
    methods: {
      initChart() {
        this.chart = new ChartJS(this.$refs.canvas, {
          type: 'bar',
          data: this.data,
          options: this.options
        });
      },
      refresh() {
        if (this.chart) {
          this.chart.data = this.data;
          this.chart.update();
        }
      }
    },
    watch: {
      data() {
        this.refresh();
      }
    }
  };
  </script>
  
  <style>
  .p-chart {
    position: relative;
  }
  </style>
  