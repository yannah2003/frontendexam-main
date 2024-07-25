<template>
  <div>
    <h3>DASHBOARD</h3>
    <div class="row mb-3" style="margin: 10px">
      <!-- Chart Section -->
      <div class="col-lg-8 col-md-12">
        <div class="graph">
          <h5>TOTAL NUMBER OF SENIOR HIGH SCHOOL STUDENTS: {{ totalStudents }}</h5>
          <b-card class="graph-card">
            <div class="chart-container">
              <BarChart :data="chartData" :options="chartOptions" />
            </div>
          </b-card>
        </div>
      </div>
      <!-- Statistics Section -->
      <div class="col-lg-4 col-md-12 count">
        <div class="row">
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ stemStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>STEM</b> STUDENTS</span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ abmStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>ABM</b> STUDENTS</span>
              </center>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ hummsStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>HUMMS</b> STUDENTS</span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ tvlictStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>TVL-ICT</b> STUDENTS</span>
              </center>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ femaleUsers }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>FEMALE USERS</b></span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ maleUsers }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>MALE USERS</b></span>
              </center>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ teacher }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>TEACHERS</b></span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="box">
              <center>
                <h4>{{ student }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>STUDENTS</b></span>
              </center>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'AdminDashboard',
  components: {
    BarChart: Bar,
  },
  data() {
    return {
      femaleUsers: 0,
      maleUsers: 0,
      teacher: 0,
      student: 0,
      stemStudents: 50,
      abmStudents: 30,
      hummsStudents: 150,
      tvlictStudents: 130,
      chartData: {
        labels: ['STEM', 'ABM', 'HUMMS', 'TVL ICT'],
        datasets: [
          {
            label: 'Number of Students',
            data: [50, 30, 150, 130],
            backgroundColor: [
              '#28a745', // Green for STEM
              '#007bff', // Blue for ABM
              '#ffc107', // Yellow for HUMMS
              '#dc3545', // Red for TVL ICT
            ],
          },
        ],
      },
      chartOptions: {
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
      },
    };
  },
  computed: {
    totalStudents() {
      return this.stemStudents + this.abmStudents + this.hummsStudents + this.tvlictStudents;
    },
  },
  mounted() {
    this.fetchUsersCounts();
  },
  methods: {
    async fetchUsersCounts() {
      try {
        const response = await axios.get('http://localhost:8000/api/user-counts');
        this.femaleUsers = response.data.femaleUsers; ///name sa laravel pinsasa
        this.maleUsers = response.data.maleUsers;///name sa laravel pinsasa
        this.teacher = response.data.teacher;///name sa laravel pinsasa
        this.student = response.data.student;///name sa laravel pinsasa
      } catch (error) {
        console.error('Failed to fetch Users counts:', error);
      }
    },
  },
};
</script>



<style>
h3 {
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
  margin: 20px;
}

.graph {
  border: 2px solid whitesmoke;
  padding: 40px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.chart-container {
  position: relative;
  height: 400px; /* Adjust this height as needed */
}

.box {
  border: 2px solid darkgreen;
  background-color: #50c878;
  border-radius: 10px;
  height: 130px;
  padding: 10px;
  padding-top: 20px;
}

.label {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 15px;
  margin-top: 0;
}
</style>