<template>
  <div class="register-container">
    <h4 class="register-header">
      <center>Register New User</center>
    </h4>
    <div class="register-form">
      <div class="row mb-3">
        <div class="col-md-4">
          <label for="idnumber" class="form-label">ID / LRN Number:</label>
          <input v-model="formData.idnumber" type="text" id="idnumber" class="form-control" required>
        </div>

        <div class="col-md-4">
          <label for="usertype" class="form-label">User Type:</label>
          <select v-model="formData.usertype" id="usertype" class="form-control" required>
            <option v-for="(type, index) in userTypes" :key="index" :value="type.value">{{ type.label }}</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label d-block">Gender:</label>
          <div class="form-check form-check-inline">
            <input v-model="formData.sex" class="form-check-input" type="radio" name="sex" id="male" value="male" required>
            <label class="form-check-label" for="male">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input v-model="formData.sex" class="form-check-input" type="radio" name="sex" id="female" value="female" required>
            <label class="form-check-label" for="female">Female</label>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4">
          <label for="lname" class="form-label">Last Name:</label>
          <input v-model="formData.lname" type="text" id="lname" class="form-control" required>
        </div>

        <div class="col-md-4">
          <label for="fname" class="form-label">First Name:</label>
          <input v-model="formData.fname" type="text" id="fname" class="form-control" required>
        </div>

        <div class="col-md-4">
          <label for="mname" class="form-label">Middle Name:</label>
          <input v-model="formData.mname" type="text" id="mname" class="form-control" required>
        </div>
      </div>

      <!-- Conditional Row for Teacher -->
      <div v-if="formData.usertype === 'teacher'" class="row mb-3">
        <div class="col-md-6">
          <label for="email" class="form-label">Email Address:</label>
          <input v-model="formData.email" type="email" id="email" class="form-control" required>
        </div>
        <div class="col-md-6">
          <label for="password" class="form-label">Password:</label>
          <div class="input-group">
            <input v-model="formData.password" :type="passwordFieldType" id="password" class="form-control" required>
            <span class="input-group-text" @click="togglePasswordVisibility">
              <i :class="passwordIcon"></i>
            </span>
          </div>
        </div>
      </div>

      <!-- Conditional Row for Student -->
      <div v-if="formData.usertype === 'student'" class="row mb-3">
        <div class="col-md-6">
          <label for="email" class="form-label">Email Address:</label>
          <input v-model="formData.email" type="email" id="email" class="form-control" required>
        </div>
        <div class="col-md-6">
          <label for="Mobile_no" class="form-label">Mobile Number:</label>
          <input v-model="formData.Mobile_no" type="tel" id="Mobile_no" class="form-control" required>
        </div>
        <div class="col-md-6">
          <label for="password" class="form-label">Password:</label>
          <div class="input-group">
            <input v-model="formData.password" :type="passwordFieldType" id="password" class="form-control" required>
            <span class="input-group-text" @click="togglePasswordVisibility">
              <i :class="passwordIcon"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="text-center mt-4">
        <button type="button" class="btn" @click="addUser">
          <i class="bi bi-person-plus-fill"></i>
          <span class="ms-2"><b>Add User</b></span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="isModalVisible" class="modal fade show d-block" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">User Details</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p><strong>ID / LRN Number:</strong> {{ formData.idnumber }}</p>
            <p><strong>User Type:</strong> {{ formData.usertype }}</p>
            <p><strong>Gender:</strong> {{ formData.sex }}</p>
            <p><strong>Last Name:</strong> {{ formData.lname }}</p>
            <p><strong>First Name:</strong> {{ formData.fname }}</p>
            <p><strong>Middle Name:</strong> {{ formData.mname }}</p>
            <p><strong>Email:</strong> {{ formData.email }}</p>
            <p v-if="formData.usertype === 'student'"><strong>Mobile Number:</strong> {{ formData.Mobile_no }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn-primary" @click="saveUser">Register Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterUser',
  data() {
    return {
      formData: {
        idnumber: '',
        usertype: '',
        sex: '',
        lname: '',
        fname: '',
        mname: '',
        email: '',
        Mobile_no: '',
        password: ''
      },
      passwordFieldType: 'password',
      passwordIcon: 'bi bi-eye',
      userTypes: [
        { label: 'Teacher', value: 'teacher' },
        { label: 'Student', value: 'student' }
      ],
      isModalVisible: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
        this.passwordIcon = 'bi bi-eye-slash';
      } else {
        this.passwordFieldType = 'password';
        this.passwordIcon = 'bi bi-eye';
      }
    },
    addUser() {
      if (this.validateForm()) {
        this.isModalVisible = true;
      } else {
        alert('Please complete all required fields.');
      }
    },
    validateForm() {
      const requiredFields = ['idnumber', 'usertype', 'sex', 'lname', 'fname', 'mname', 'email', 'password'];
      for (const field of requiredFields) {
        if (!this.formData[field]) {
          return false;
        }
      }
      if (this.formData.usertype === 'student' && !this.formData.Mobile_no) {
        return false;
      }
      return true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async saveUser() {
      try {
        await axios.post('http://localhost:8000/api/register', this.formData);
        alert('User registered successfully');
        this.isModalVisible = false;
        // Reset form data
        this.formData = {
          idnumber: '',
          usertype: '',
          sex: '',
          lname: '',
          fname: '',
          mname: '',
          email: '',
          Mobile_no: '',
          password: ''
        };
      } catch (error) {
        alert('Error registering user: ' + error.message);
      }
    }
  }
};
</script>
   

<style scoped>
.register-container {
  padding: 20px;
  background-color: #f8f9fa94;
  border: 1px solid #0b355e;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

.register-header {
  background-color: #8FD6A4;
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;

  font-family: 'Georgia', serif;
}

.register-form {
  padding: 20px;
}

.form-label {
  font-family: 'Georgia', serif;
  color: #343a40;
}
.modal-content{
  padding: 20px;
  background-color: #f8f9fa;
  border: 2px solid #045d26;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
}

.form-control {
  border-radius: 5px;
  border: 2px solid #03721b;
}
.btn-secondary{
  background-color: #7a7f7c;
  border: 2px solid #030503;
  color: rgb(27, 12, 12);
  font-family: 'Georgia', serif;
  padding: 5px ;
  font-size: 18px;
  border-radius: 5px;
  width: 90px;
}
.btn-primary{
  background-color: #03953d;
  border: 2px solid #030503;
  color: rgb(27, 12, 12);
  font-family: 'Georgia', serif;
  padding: 5px ;
  font-size: 18px;
  border-radius: 5px;
  width: 180px;
}

.btn {
  background-color: #38A05D;
  border: 2px solid #03721b;
  color: rgb(5, 1, 1);
  font-family: 'Georgia', serif;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 30%;
}

.btn:hover {
  background-color: #2C8C4F;
  border-color: #02070c;
  color: white;
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