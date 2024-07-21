<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Sidebar -->
      <div :class="['subdrawer', {'d-none d-md-block': !showSidebar, 'd-block': showSidebar}]">
        <div class="list-group">
          <h5>1ST SEMESTER</h5>
          <a
            href="#"
            v-for="(subject, index) in subjects"
            :key="index"
            class="list-group-item list-group-item-action"
            @click="showSubjectDetails(subject)"
            :class="{ active: selectedSubject === subject }"
          >
            {{ subject.subjectName }}
          </a>
        </div>
      </div>

      <div :class="['col-md-9', {'col-12': !showSidebar}]">
        <!-- Toggle Button for Small Screens -->
        <button class="btn btn-primary d-md-none mb-3" @click="toggleSidebar">Toggle Sidebar</button>

        <!-- Main Content -->
        <div class="main-content">
          <div v-if="selectedSubject">
            <h1 class="mt-4">{{ selectedSubject.subjectName }}</h1>
            <div class="row">
              <div class="col-12 col-md-6">
                <div class="box">
                  <h4>{{ selectedSubject.passed }}</h4>
                  <p>PASSED</p>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <div class="box">
                  <h4>{{ selectedSubject.failed }}</h4>
                  <p>FAILED</p>
                </div>
              </div>
            </div>
            <div class="chart-container">
              <PieChart
                :passed="selectedSubject.passed"
                :failed="selectedSubject.failed"
              />
              <div class="text-center mt-3">
                <p>Total Number of Students: {{ selectedSubject.totalno }}</p>
              </div>
            </div>
          </div>
          <div v-else>
            <p class="text-muted mt-4">Select a subject to view details.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from './piechart.vue'

export default {
  name: 'Tvl11Page',
  components: {
    PieChart
  },
  data() {
    return {
      subjects: [
        {
          subjectName: 'Subject 1',
          teacher: 'Teacher A',
          semester: '1st Semester',
          passed: 30,
          failed: 5,
          totalno: 35,
        },
        {
          subjectName: 'Subject 2',
          teacher: 'Teacher B',
          semester: '2nd Semester',
          passed: 25,
          failed: 10,
          totalno: 35,
        },
        // Add more subjects as needed
      ],
      selectedSubject: null,
      showSidebar: true, // Default to true so sidebar is visible on all screens
    };
  },
  created() {
    // Set the default selected subject to the first one
    this.selectedSubject = this.subjects[0];
  },
  methods: {
    showSubjectDetails(subject) {
      console.log('Showing details for subject:', subject.subjectName);
      this.selectedSubject = subject;
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    }
  },
};
</script>

<style scoped>
.subdrawer {
  background-color: #f8f9fa; /* Light background for a clean look */
  padding: 10px;
  border-right: 1px solid #ddd;
  height: 100vh; /* Full height of the viewport */
  width: 250px; /* Fixed width for larger screens */
  left: 0;

  transition: width 0.3s ease; /* Smooth transition for resizing */
}

.subdrawer.d-none.d-md-block {
  display: none; /* Hide on medium screens and below */
}

.subdrawer.d-block {
  display: block; /* Show on small screens if toggled */
}

.list-group-item {
  margin-bottom: 5px; /* Adjust margin as per your design */
  border: 1px solid #ddd; /* Border style */
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding inside each list item */
  display: block; /* Ensures each item takes full width */
  font-weight: 500; /* Slightly bolder text for readability */
}

.list-group-item.active {
  background-color: #E0F4E5; /* School color theme */
  color: rgb(10, 5, 5);
  font-weight: bold; /* Bolder text for active item */
  border-color: white;
}

h1 {
  font-size: 2rem; /* Larger title font */
  font-weight: 700; /* Bolder font for title */
  color: #333; /* Darker color for formal look */
}

.card-body {
  font-size: 1rem; /* Standard font size for card content */
  color: #555; /* Darker color for text */
}

.text-muted {
  font-size: 1.1rem; /* Slightly larger muted text */
}

h5 {
  background-color: whitesmoke;
  text-align: center;
}

.chart-container {
  margin-top: 20px;
  width: 100%; /* Ensures the container takes full width */
}

.chart-container .pie-chart {
  width: 100% !important; /* Responsive width for the pie chart */
  max-width: 100%; /* Ensures the chart does not exceed the container's width */
  height: auto; /* Maintain aspect ratio */
}

.main-content {
 
  padding: 10px; /* Add padding to the main content */
  box-sizing: border-box; /* Include padding in element's total width and height */
  flex: 1; /* Take up the remaining space */
  display: flex; /* Use flexbox to center content */
  flex-direction: column; /* Align content vertically */
  transition: margin-left 0.3s ease; /* Smooth transition for content shifting */
}

.box {
  width: 100%; /* Make the box responsive */
  max-width: 300px; /* Optional: set a max-width to control the box size */
  height: 90px;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Optional: add shadow for better appearance */
  border-radius: 10px; /* Optional: rounded corners */
  margin: 0 auto; /* Center the box horizontally */
  text-align: center;
}
</style>
