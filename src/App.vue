<template>
  <div>
    <HomePageAdmin v-if="isAdmin" @logout="handleLogout" />
    <Teacher_homepage v-else-if="isTeacher" @logout="handleLogout" />
    <Student_homepage v-else-if="isStudent" @logout="handleLogout" />
    <div v-else class="container">
      <!-- Login -->
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-12 col-md-4 text-center mb-4">
          <img src="./assets/logongexam.png" style="width: 1000px;" class="img-fluid" alt="Your Image">
          <h4>WISE-SHS: Web-based Innovation System for Enhanced Examination in Senior High School</h4>
        </div>
        <div class="col-12 col-md-6">
          <div class="signup-card p-5 p-md-6">
            <center><h3>LOG IN</h3></center><br>
            <form @submit.prevent="handleSubmit">
              <div class="input-group mb-3" style="margin-bottom: 10px;">
                <div class="input-group-prepend">
                  <span class="input-group-text" style="background-color: transparent; border-right: 0;">
                    <i class="bi bi-envelope-fill fa-lg mr-2"></i>
                    <strong style="font-family: 'Arial', sans-serif;">EMAIL :</strong>
                  </span>
                </div>
                <input type="email" class="form-control" placeholder="Enter email" v-model="email" required>
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" style="background-color: transparent; border-right: 0;">
                    <i class="fas fa-lock fa-lg mr-2"></i>
                    <strong style="font-family: 'Arial', sans-serif;">PASSWORD :</strong>
                  </span>
                </div>
                <input :type="showPassword ? 'text' : 'password'" class="form-control" placeholder="Enter password" v-model="password" required>
                <span class="input-group-text password-toggle" id="password-addon-1" @click="togglePassword">
                  <i :class="passwordFieldIcon"></i>
                </span>
              </div><br>

              <center>
                <div class="col-6">
                  <button type="submit" class="btn btn-custom">
                    <i class="bi bi-arrow-right-circle-fill mr-2"></i>LOG IN
                  </button>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/router';

import HomePageAdmin from './components/ADMIN/homepageadmin.vue';
import Teacher_homepage from './components/TEACHER/teacherhomepage.vue';
import Student_homepage from './components/STUDENT/studenthomepage.vue';

export default {
  name: 'App',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isAdmin: false,
      isTeacher: false,
      isStudent: false,
      errorMessage: ''
    };
  },
  computed: {
    passwordFieldIcon() {
      return this.showPassword ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill';
    },
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: this.email,
          password: this.password
        });
        console.log(response.data);
  
        // Save the token and user type to local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usertype', response.data.usertype);

           // Save the current route to local storage
    localStorage.setItem('savedRoute', this.$route.fullPath);
        
        // Set state based on user type
        this.updateUserType(response.data.usertype);

        // Route based on user type
        if (response.data.usertype === 'admin') {
          router.push('/adminpage'); // Route to admin page
        } else if (response.data.usertype === 'teacher') {
          router.push('/teacher'); // Route to teacher page
        } else if (response.data.usertype === 'student') {
          router.push('/student'); // Route to student page
        } else {
          this.errorMessage = 'Invalid user type.';
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    },
    updateUserType(usertype) {
      this.isAdmin = usertype === 'admin';
      this.isTeacher = usertype === 'teacher';
      this.isStudent = usertype === 'student';
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleLogout() {
      localStorage.removeItem('token');
      localStorage.removeItem('usertype');
      localStorage.removeItem('savedRoute');
      this.isAdmin = false;
      this.isTeacher = false;
      this.isStudent = false;
      this.email = '';
      this.password = '';
      this.$router.push('/');
    },
  },
  components: {
    HomePageAdmin,
    Teacher_homepage,
    Student_homepage,
  },
  created() {
  const token = localStorage.getItem('token');
  const usertype = localStorage.getItem('usertype');
  const savedRoute = localStorage.getItem('savedRoute');

  if (token && usertype) {
    this.updateUserType(usertype);
    // Optionally, validate the token with the backend here
    // If validation fails, clear the token and redirect to login
    if (savedRoute) {
      this.$router.push(savedRoute);
    } else {
      this.$router.push('/'); // Fallback to a default route if no saved route
    }
  }
}
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.signup-card {
  border: 4px solid green;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
}

.btn-custom {
  background-color: #28a745;
  border-color: black;
  border-width: 3px;
  outline-color: #000;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  height: 44px;
  padding: 5px;
}

.btn-custom:hover {
  background-color: #218838;
}

h3 {
  font-family: fantasy;
  font-size: 30px;
  font-weight: 300;
}
h4 {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-weight: 300;
}

.password-toggle {
  cursor: pointer;
}
</style>
