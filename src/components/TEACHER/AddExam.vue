<template>
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

    <!-- Popover Content -->
    <div v-if="showPopover" class="popover">
      <div class="popover-content">
        <p>Exam created for:</p>
        <ul>
          <li>Quarter: {{ selectedQuarter }}</li>
          <li>Date: {{ selectedDate }}</li>
          <li>Time: {{ selectedTime }}</li>
        </ul>
        <button class="close-popover-btn" @click="showPopover = false">Close</button>
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
      showPopover: false,
      selectedQuarter: '',
      selectedDate: this.getCurrentDate(),
      selectedTime: this.getCurrentTime(),
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
    createExam() {
      const message = `
        Exam created for ${this.selectedQuarter} on ${this.selectedDate} at ${this.selectedTime}
      `;
      alert(message.trim());
      this.showPopover = true; // mag show ung popover
      this.showForm = false; // i hide nya yung form modal
    },
    redirectToExamCreation() {
    
      this.$router.push('/CreateExam');
    },
  },
};
</script>

  <style scoped>
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
    font-weight: bold;
  }
  
  .form-group select,
  .form-group input {
    font-family: 'Lucida Sans Unicode', sans-serif;
    font-size: 16px;
    padding: 5px;
    margin-left: 10px;
  }
  
  .centered-button {
    text-align: center;
    margin-top: 20px; /* Adjust spacing */
  }
  
  .create-exam-btn {
    background-color: #2e8b57;
    color: white;
    font-family: 'Lucida Sans Unicode', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
  }
  
  .create-exam-btn:hover {
    background-color: #256e45;
  }
  
  /* Popover Styles */
  .popover {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 1000;
  }
  
  .popover-content {
    text-align: center;
  }
  
  .popover ul {
    list-style-type: none;
    padding: 0;
  }
  
  .close-popover-btn {
    background-color: #2e8b57;
    color: white;
    font-family: 'Lucida Sans Unicode', sans-serif;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  .close-popover-btn:hover {
    background-color: #256e45;
  }
  </style>
  