<template>
  <div class="subject-container">
    <h4 class="subject-header">
      <center>Add New Subject</center>
    </h4>
    <div class="subject-form">
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="subjectname" class="form-label">Subject Name:</label>
          <input v-model="formData.subjectname" type="text" id="subjectname" class="form-control" required>
        </div>

        <div class="col-md-4">
          <label for="yearlevel" class="form-label">Year Level:</label>
          <select v-model="formData.yearlevel" id="yearlevel" class="form-control" required>
            <option value="Grade 11">Grade 11</option>
            <option value="Grade 12">Grade 12</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="strand" class="form-label">Strand:</label>
          <select v-model="formData.strand" id="strand" class="form-control" required>
            <option value="STEM">STEM</option>
            <option value="TVL-ICT">TVL-ICT</option>
            <option value="HUMMS">HUMMS</option>
            <option value="ABM">ABM</option>
          </select>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4">
          <label for="semester" class="form-label">Semester:</label>
          <select v-model="formData.semester" id="semester" class="form-control" required>
            <option value="1st Quarter">1st Quarter</option>
            <option value="2nd Quarter">2nd Quarter</option>
            <option value="3rd Quarter">3rd Quarter</option>
            <option value="4th Quarter">4th Quarter</option>
          </select>
        </div>

        <div class="col-md-4">
          <label for="gen_code" class="form-label">Subject Code:</label>
          <div class="input-group">
            <input v-model="formData.gen_code" type="text" id="gen_code" class="form-control" readonly>
            <button type="button" class="btn btn-secondary" @click="generateSubjectCode">Generate Code</button>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button type="button" class="btn" @click="addSubject">
          <i class="bi bi-file-earmark-plus"></i>
          <span class="ms-2"><b>Add Subject</b></span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Subject Details</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>Subject Name:</strong> {{ formData.subjectname }}</p>
            <p><strong>Year Level:</strong> {{ formData.yearlevel }}</p>
            <p><strong>Strand:</strong> {{ formData.strand }}</p>
            <p><strong>Semester:</strong> {{ formData.semester }}</p>
            <p><strong>Subject Code:</strong> {{ formData.gen_code }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn-primary" @click="saveSubject">Add Subject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherAddSubject',
  data() {
    return {
      formData: {
        subjectname: '',
        yearlevel: '',
        strand: '',
        semester: '',
        gen_code: ''
      },
      isModalVisible: false,
    };
  },
  methods: {
    addSubject() {
      if (this.validateForm()) {
        this.isModalVisible = true;
      } else {
        alert('Please complete all required fields.');
      }
    },
    validateForm() {
      const requiredFields = ['subjectname', 'yearlevel', 'strand', 'semester', 'gen_code'];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          return false;
        }
      }
      return true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    generateSubjectCode() {
      // Generate a random subject code with 1 number and 6 letters
      const letters = Math.random().toString(36).substring(2, 8).toUpperCase();
      const number = Math.floor(Math.random() * 10);
      this.formData.gen_code = `${number}${letters}`;
    },
    async saveSubject() {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:8000/api/store3', this.formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        alert('Subject added successfully');
        this.isModalVisible = false;
        // Reset form data
        this.formData = {
          subjectname: '',
          yearlevel: '',
          strand: '',
          semester: '',
          gen_code: ''
        };
      } catch (error) {
        alert('Error adding subject: ' + (error.response.data.message || error.message));
      }
    }
  }
};
</script>

<style scoped>
.subject-container {
  padding: 20px;
  background-color: #f8f9fa94;
  border: 1px solid #769abd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

.subject-header {
  background-color: #3e7081;;
  color: rgb(238, 242, 246);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
}

.subject-form {
  padding: 20px;
}

.form-label {
  font-family: 'Georgia', serif;
  color: #343a40;
}

.modal-content {
  padding: 20px;
  background-color: #f8f9fa;
  border: 2px solid #add8e6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-control {
  border-radius: 5px;
  border: 2px solid #add8e6;
}

.input-group .btn {
  border-radius: 0 5px 5px 0;
  border: 2px solid #add8e6;
  font-family: 'Georgia', serif;
}

.btn-secondary {
  background-color: #7a7f7c;
  border: 2px solid #030503;
  color: rgb(27, 12, 12);
  padding: 5px;
  font-size: 18px;
  width: auto;
}

.btn-primary {
  background-color: #add8e6;;
  border: 2px solid #030503;
  color: rgb(27, 12, 12);
  padding: 5px;
  font-size: 18px;
  width: auto;
}

.btn {
  background-color: #add8e6;
  border: 2px solid #add8e6;
  color: rgb(5, 1, 1);
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
 
}

.btn:hover {
  background-color: #add8e6;
  border-color: #02070c;
  color: rgb(25, 54, 96);
}

.text-center {
  text-align: center;
}

.modal.show.d-block {
  display: block;
}

.modal-backdrop {
  display: none;
}
</style>
