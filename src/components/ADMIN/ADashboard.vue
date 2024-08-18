<template>
  <div>
    <h3>DASHBOARD</h3>
    <div class="row mb-3" style="margin: 10px">
      <!-- Chart Section -->
      <div class="col-lg-8 col-md-12 mb-3">
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
      <div class="col-lg-4 col-md-12">
        <div class="row">
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ stemStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>STEM</b> STUDENTS</span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ abmStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>ABM</b> STUDENTS</span>
              </center>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ hummsStudents }}</h4>
                <span class="label">TOTAL NUMBER fOF <br /><b>HUMMS</b> STUDENTS</span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ tvlictStudents }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>TVL-ICT</b> STUDENTS</span>
              </center>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ femaleUsers }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>FEMALE USERS</b></span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ maleUsers }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>MALE USERS</b></span>
              </center>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-6 mb-3">
            <div class="boxes">
              <center>
                <h4>{{ teacher }}</h4>
                <span class="label">TOTAL NUMBER OF <br /><b>TEACHERS</b></span>
              </center>
            </div>
          </div>
          <div class="col-6 mb-3">
            <div class="boxes" >
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
import BarChart from './adminbarchart.vue'; // Ensure correct path
import axios from 'axios';

export default {
  name: 'AdminDashboard',
  components: {
    BarChart,
  },
  data() {
    return {
      femaleUsers: 0,
      maleUsers: 0,
      teacher: 0,
      student: 0,
      stemStudents: 0,
      abmStudents: 0,
      hummsStudents: 0,
      tvlictStudents: 0,
      chartData: {
        labels: ['STEM', 'ABM', 'HUMMS', 'TVL ICT'],
        datasets: [
          {
            label: 'Number of Students',
            data: [0, 0, 0, 0],
            backgroundColor: [
              '#28a045', // Green for STEM
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
    // this.fetchUsersCounts();
    // this.fetchDataStrand();
  },
  methods: {
    async fetchUsersCounts() {
      try {
        const response = await axios.get('http://localhost:8000/api/user-counts');
        this.femaleUsers = response.data.femaleUsers;
        this.maleUsers = response.data.maleUsers;
        this.teacher = response.data.teacher;
        this.student = response.data.student;
      } catch (error) {
        console.error('Failed to fetch Users counts:', error);
      }
    },
    async fetchDataStrand() {
      try {
        const response = await axios.get('http://localhost:8000/api/countstrand', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const { total_stem, total_abm, total_humms, total_tvl } = response.data;

        this.stemStudents = total_stem;
        this.abmStudents = total_abm;
        this.hummsStudents = total_humms;
        this.tvlictStudents = total_tvl;

        // Update chart data
        this.chartData.datasets[0].data = [
          this.stemStudents,
          this.abmStudents,
          this.hummsStudents,
          this.tvlictStudents,
        ];
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
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
  padding: 20px; /* Adjust padding for smaller screens */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.chart-container {
  position: relative;
  height: 300px; /* Adjust height for smaller screens */
}

.boxes {
  border: 2px solid rgb(122, 122, 122);
  background-color: whitesmoke; /* Change background color to white */
  border-radius: 5px;
  height: 100px; /* Adjust height for smaller screens */
  padding: 5px;
  padding-top: 10px; /* Adjust padding for smaller screens */
}

.label {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 14px; /* Adjust font size for smaller screens */
  margin-top: 0;
}
</style>
