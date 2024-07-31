<template>
  <div class="exam-page-layout">
    <div class="container-fluid">
      <div class="row">
        <!-- Drawer Section -->
        <div class="col-md-2 left-column">
          <div class="list-group-container">
            <router-link to="/teacherlistofsubject" class="list-group">
              <span class="icon-label">
                <i class="bi bi-arrow-left fs-4"></i> Back to List of Subjects
              </span>
            </router-link>
            <router-link v-for="(item, index) in items" :key="index" :to="item.path" class="list-group" :class="{ active: selectedItem === item.path }" @click="handleItemClick(item.path)">
              <span class="icon-label">
                <i :class="item.icon"></i> {{ item.label }}
              </span>
            </router-link>
            <div class="list-group logOut" @click="handleLogoutClick" style="margin-top: auto;">
              <span class="icon-label">
                <i class="bi bi-box-arrow-left fs-4"></i> LOG OUT
              </span>
            </div>
          </div>
        </div>

        <!-- Main Content Section -->
        <div class="col-md-10 right-column">
          <router-view></router-view>
          <div class="exam-page">
            <center>
              <h1>Exam Creation and Management</h1>
            </center>
            <div class="nothing-follows">----Nothing follows----</div>
            <center>
              <button class="add-quiz-btn" @click="showForm = true">Add Quiz or Exam</button>
            </center>

            <!-- Form Modal -->
            <div v-if="showForm" class="form-modal">
              <div class="modal-content">
                <div class="modal-header">
                  <div class="quarter-filter">
                    <label for="quarter">Quarter:</label>
                    <select id="quarter" v-model="selectedQuarter">
                      <option value="1st Quarter">1st Quarter</option>
                      <option value="2nd Quarter">2nd Quarter</option>
                      <option value="3rd Quarter">3rd Quarter</option>
                      <option value="4th Quarter">4th Quarter</option>
                    </select>
                  </div>
                </div>
                <div class="modal-body">
                  <div class="date-time-group">
                    <div class="form-group">
                      <label for="date">Date:</label>
                      <input type="date" id="date" v-model="selectedDate" />
                    </div>
                    <div class="form-group">
                      <label for="time">Time:</label>
                      <input type="time" id="time" v-model="selectedTime" />
                    </div>
                  </div>
                  <div class="centered-button">
                    <button class="create-exam-btn" @click="redirectToExamCreation">Create Exam</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddExaminations',
  data() {
    return {
      showForm: false,
      selectedQuarter: '',
      selectedDate: this.getCurrentDate(),
      selectedTime: this.getCurrentTime(),
      selectedItem: '',
      items: [
        { path: '/ListOfStudent', label: 'List of Students', icon: 'bi bi-speedometer2 fs-4' },
        { path: '/AddExam', label: 'Add Exam', icon: 'bi bi-file-earmark-text fs-4' },
        { path: '/Feedback', label: 'Feedback', icon: 'bi bi-chat-square-text fs-4' },
        { path: '/ItemAnalysis', label: 'Item Analysis', icon: 'bi bi-graph-up-arrow fs-4' },
        { path: '/PerformanceTracking', label: 'Performance Tracking', icon: 'bi bi-speedometer2 fs-4' }
      ],
    };
  },
  methods: {
    getCurrentDate() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
    getCurrentTime() {
      const today = new Date();
      const hh = String(today.getHours()).padStart(2, '0');
      const mm = String(today.getMinutes()).padStart(2, '0');
      const ss = String(today.getSeconds()).padStart(2, '0');
      return `${hh}:${mm}:${ss}`;
    },
    redirectToExamCreation() {
      this.$router.push({ path: '/CreatingExam' });
    },
    handleItemClick(path) {
      this.selectedItem = path;
    },
    handleLogoutClick() {
      console.log('Logging out...');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.exam-page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container-fluid {
  flex: 1;
}

.left-column {
  background-color: white;
  padding: 10px;
  border-right: 1px solid #ddd;
  height: 100vh;
  width: 250px;
}

.right-column {
  padding: 20px;
  background-color: white;
  flex: 1;
}

.list-group-container {
  height: 100%;
}

.list-group {
  color: #333;
  text-decoration: none;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 10px 0;
  padding: 10px;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.list-group.active,
.list-group:hover,
.logOut:hover {
  background-color: #50C878;
  color: white;
}

.icon-label {
  display: flex;
  align-items: center;
  width: 100%;
}

.icon-label i {
  margin-right: 10px;
}

.icon-label .label {
  flex: 1;
}

.exam-page {
  padding: 20px;
  background-color: #f8f9fa94;
  border: 1px solid #0b355e;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

.exam-page h1 {
  font-family: 'Lucida Sans Unicode', sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  background-color: #8fd6a4;
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.nothing-follows {
  font-family: 'Lucida Sans Unicode', sans-serif;
  font-size: 16px;
  color: #555;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}

.add-quiz-btn {
  background-color: #e5e9e6;
  color: rgb(30, 143, 75);
  font-family: 'Lucida Sans Unicode', sans-serif;
  font-size: 17px;
  font-weight: bold;
  padding: 10px 350px;
  border-style: double;
  border-radius: 8px;
  cursor: pointer;
}

.add-quiz-btn:hover {
  background-color: #e9f2ed;
}

.form-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  padding: 20px;
  width: 600px;
  border: 2px solid #0b355e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal-content {
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: flex-end; /* Align items to the upper right */
  align-items: center;
  margin-bottom: 20px;
}

.quarter-filter {
  margin-left: auto; /* Pushes the quarter filter to the upper right */
}

.modal-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-time-group {
  display: flex; /* Ensures date and time are horizontal */
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-family: 'Lucida Sans Unicode', sans-serif;
  font-size: 16px;
}
</style>
