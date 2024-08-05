<template>
    <div class="analysis-page">
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
            <h1>List of Students</h1>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ListOfTheStudentinSubjects',
    data() {
      return {
        selectedItem: '',
        items: [
          { path: '/ListOfStudent', label: 'List of Students', icon: 'bi bi-speedometer2 fs-4' },
          { path: '/AddExam', label: 'Add Exam', icon: 'bi bi-file-earmark-text fs-4' },
          { path: '/Feedback', label: 'Feedback', icon: 'bi bi-chat-square-text fs-4' },
          { path: '/ItemAnalysis', label: 'Item Analysis', icon: 'bi bi-graph-up-arrow fs-4' },
          { path: '/PerformanceTracking', label: 'Performance Tracking', icon: 'bi bi-speedometer2 fs-4' },
          { path: '/GenerateReport', label: 'Report Generating', icon: 'bi bi-speedometer2 fs-4' }
        ]
      };
    },
    methods: {
      handleLogoutClick() {
        // Logout logic here
      },
      handleItemClick(path) {
        this.selectedItem = path;
      }
    }
  };
  </script>
  
  <style scoped>
  .analysis-page {
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
  
  .analysis-page h1 {
    font-family: 'Arial', sans-serif;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  </style>
  