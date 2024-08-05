<template>
  <div>
    <HomePageAdmin v-if="isAdmin" @logout="handleLogout" />
    <Teacher_homepage v-else-if="isTeacher" @logout="handleLogout" />
    <Student_homepage v-else-if="isStudent" @logout="handleLogout" />
    <div v-else class="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div class="card main-card">
        <div class="row w-100 h-100">
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <img src="./assets/newlogo.png" class="img-fluid logo" alt="Your Image">
          </div>
          <div class="col-lg-6 d-flex align-items-center justify-content-center">
            <div class="card login-card">
              <div class="card-body d-flex flex-column justify-content-center">
                <h3 class="card-title text-center">WISE-SHS</h3>
                <p class="text-center welcome-message">Welcome! Please login to your account.</p>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group position-relative">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" placeholder="Enter email" v-model="email" required>
                  </div>

                  <div class="form-group position-relative">
                    <label for="password">Password:</label>
                    <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" placeholder="Enter password" v-model="password" required>
                    <i :class="passwordFieldIcon" class="password-toggle position-absolute" @click="togglePassword"></i>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="form-check">
                      <input type="checkbox" class="form-check-input" id="rememberMe">
                      <label class="form-check-label" for="rememberMe">Remember Me</label>
                    </div>
                    <a href="#" class="forgot-password">Forgot Password?</a>
                  </div>

                  <div class="text-center">
                    <button type="submit" class="btn btn-primary btn-block btn-custom-width">Log In</button>
                  </div>
                </form>
              </div>
            </div>
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
html, body {
  height: 100%;
  background-color: #ffffff;
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}



.main-card {
  width: 100%;
  max-width: 1500px;
  height: 95%;
  max-height: 800px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #add8e6; /* Light blue background */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-card {
  width: 80%;
  height: 75%; /* Adjusted to occupy more space within the main card */
  max-width: 700px;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  padding: 30px; /* Increased padding for better spacing */
}

.card-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  max-width: 500px; /* Increased size of the logo */
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-custom-width {
  width: 100%; /* Made the button occupy the full width */
  max-width: 500px; /* Set a maximum width */
}

h3 {
  font-family: fantasy;
  font-size: 36px; /* Increased font size for better visibility */
  font-weight: 300;
  margin-bottom: 20px;
}

.welcome-message {
  font-family: 'Nunito', sans-serif ;
  font-size: 18px; /* Increased font size for better readability */
  font-weight: 300;
  margin-bottom: 30px; /* Increased space between the message and the form */
}

.form-group {
  margin-bottom: 20px; /* Increased space between form groups */
}

.password-toggle {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 70%;
  transform: translateY(-50%);
}

.forgot-password {
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.position-relative {
  position: relative;
}
</style>
