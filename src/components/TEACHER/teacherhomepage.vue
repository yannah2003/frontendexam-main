<template>
  <div v-if="isVisible">
    <nav class="navbar navbar-expand-lg">
      <div class="d-flex align-items-center">
        <i class="bi bi-list-task fs-2" style="margin-left: 40px; margin-right: 20px;" @click="toggleDrawer"></i>
        <h2 class="logo me-2">WISE - SHS</h2>
      </div>
      <div class="d-flex align-items-center ms-auto">
        <h4 class="mb-0 me-3">WELCOME {{userProfile.fname}} !</h4>
        <div @click="togglePopover" style="cursor: pointer; position: relative;">
          <i class="bi bi-person-fill" style="font-size: 40px; margin-right: 40px;"></i>
          <div v-if="isPopoverVisible" class="popover show" role="tooltip">
            <div class="popover-arrow"></div>
            <div class="popover-body">     
                <span> {{ userProfile.idnumber }}</span>              
                <span>{{ userProfile.lname }}, {{ userProfile.fname }} {{ userProfile.mname }}</span> 
                <span>{{ userProfile.teacherPosition }}</span>    
                <button class="btn btn-success btn-sm mt-2" @click="showModal = true">My Profile</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">My Profile</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <div class="col-md-3">
                  <label for="id" class="form-label">ID Number:</label>
                  <input type="text" id="id" v-model="userProfile.idnumber" class="form-control" required>
                </div>
                <div class="col-md-3">
                  <label class="form-label d-block">Gender:</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="male" value="male" v-model="userProfile.sex">
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="female" value="female" v-model="userProfile.sex">
                    <label class="form-check-label" for="female">Female</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label for="teacherPosition" class="form-label">Position:</label>
                  <select v-model="userProfile.teacher_Position" id="teacher_Position" class="form-select">
                    <option v-for="(position, index) in teacherPositions" :key="index" :value="position.value">{{ position.label }}</option>
                  </select>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="lname" class="form-label">Last Name:</label>
                  <input type="text" id="lname" v-model="userProfile.lname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="fname" class="form-label">First Name:</label>
                  <input type="text" id="fname" v-model="userProfile.fname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="mname" class="form-label">Middle Name:</label>
                  <input type="text" id="mname" v-model="userProfile.mname" class="form-control" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="email" class="form-label">Email Address:</label>
                  <input type="email" id="email" v-model="userProfile.email" class="form-control" required>
                </div>
                <div class="col-md-6 position-relative">
                  <label for="password" class="form-label">Password:</label>
                  <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="userProfile.password" class="form-control" required>
                    <button type="button" class="btn btn-outline-secondary" @click="togglePasswordVisibility">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary" @click="updateProfile">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="d-flex">
      <div :class="['drawer', drawerVisible ? 'd-block' : 'd-none']">
        <router-link
          v-for="(item, index) in items"
          :key="index"
          :to="item.path"
          class="list-group"
          :class="{ active: selectedItem === item.path }"
          @click="handleItemClick(item.path)"
        >
          <span class="icon-label">
            <i :class="item.icon"></i>
            <span class="label">{{ item.label }}</span>
          </span>
        </router-link>
        <div class="list-group logOut" @click="handleLogoutClick" style="margin-top: 200px;">
          <span class="icon-label">
            <i class="bi bi-box-arrow-left fs-4"></i> LOG OUT
          </span>
        </div>
      </div>
      <div class="content" @click="handleContentClick">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherHomePage',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawerVisible: true,
      isPopoverVisible: false,
      isDropdownVisible: false,
      showPassword: false,  // Track password visibility state
      showModal: false,
      selectedItem: '',
      userProfile: {
        idnumber: '',
        lname: '',
        fname: '',
        mname: '',
        teacher_Position: '',
        sex: '',
        email: '',
        password: ''
      },
      teacherPositions: [
        { value: 'Head Teacher', label: 'Head Teacher' },
        { value: 'Assistant Teacher', label: 'Assistant Teacher' },
        { value: 'Subject Teacher', label: 'Subject Teacher' },
        // Add more positions as needed
      ],
      items: [
        { path: '/teacherdashboard', label: 'Dashboard', icon: 'bi bi-bar-chart-fill fs-4' },
        { path: '/teacheraddsubject', label: 'Add Subjects', icon: 'bi bi-file-earmark-plus-fill fs-4' },
        { path: '/teacherlistofsubject', label: 'List of Subjects', icon: 'bi bi-file-earmark-fill fs-4' },
        { path: '/managesubject', label: 'Manage Subject Details', icon: 'bi bi-gear-fill fs-4' },
       
      ],
    };
  },
  methods: {
    checkLoginStatus() {
      const token = localStorage.getItem('token');
      this.isLoggedIn = !!token;
    },
    async fetchUserProfile() {
      try {
        const response = await axios.get('http://localhost:8000/api/userprofile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.userProfile = response.data.data || { idnumber: '', lname: '' }; // Ensure fallback in case of missing data
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        this.userProfile = { idnumber: '', lname: '' }; // Fallback if fetch fails
      }
    },
    async handleLogoutClick() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data.message);
        localStorage.removeItem('token');
        localStorage.removeItem('selectedItem'); // Clear selected item on logout
        this.isLoggedIn = false;
        this.userProfile = { idnumber: '', lname: '' }; // Clear user profile on logout
        this.$emit('logout');
        this.$router.push('/login'); // Redirect to login page after logout
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async updateProfile() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. User is not authenticated.');
          alert('Authentication required. Please log in.');
          return;
        }

     
        const payload = {
          user_id: this.userProfile.id,
          teacher_Position: this.userProfile.teacher_Position,
        
        };

        console.log('Sending payload:', payload); 

        const response = await axios.post('http://localhost:8000/api/store', payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        alert('You successfully set your position', response.data);
        this.showModal = false; 

        // Clear any previous error messages
        this.errorMessage = '';

      } catch (error) {
        // Log full error response for debugging
        console.error('Failed to update profile:', error.response ? error.response.data : error.message);

        // Extract error message
        const errorMessage = error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : 'An unexpected error occurred. Please try again.';

        // Handle and display specific error messages
        if (errorMessage.includes('The user id has already been taken')) {
          alert('You already set your position. NOTE: You can only set it once');
        } else if (errorMessage.includes('The teacher position field is required')) {
          alert('The teacher position field is required. Please select a position.');
        } else {
          alert('Failed to update profile: ' + errorMessage);
        }
      }
    },
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    },
    togglePopover() {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    handleItemClick(path) {
      this.selectedItem = path;
      this.drawerVisible = false;
      this.isDropdownVisible = false;
    },
    handleContentClick() {
      if (this.drawerVisible) {
        this.drawerVisible = false;
      }
      this.isPopoverVisible = false;
      this.isDropdownVisible = false;
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
  mounted() {
    this.fetchUserProfile(); // Fetch user profile when component is mounted
    this.$router.push('/teacherdashboard');
    this.selectedItem = '/teacherdashboard';
  },
};
</script>


<style scoped>
.logo {
  font-family: 'Segoe UI Black', sans-serif;
  color: white;
  text-shadow: 1px 1px 2px black;
  font-size: 40px;
}
.modal-content {
  border: 2px solid #add8e6; /* Green border */
  border-radius: 10px; /* Rounded corners */
}

.modal-header {
  background-color:#add8e6; /* Green header background */
  color: #130404; /* White text color */
  border-bottom: 1px solid #ddd; /* Light border below header */
}

.modal-title {
  font-size: 1.25rem; /* Larger font size for the title */
  font-weight: bold;
}


.modal-dialog.modal-md {
  max-width: 50%;
}

.navbar {
  background-color: #add8e6;;
}

.drawer {
  height: auto;
  width: 250px;
  padding: 10px;
  background-color: white;
  border-right: 1px solid #ddd;
}

.drawer .list-group {
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

.drawer .list-group.active,
.drawer .list-group:hover,
.drawer .logOut:hover {
  background-color: #4893ac;
  color: white;
}

.drawer .icon-label {
  display: flex;
  align-items: center;
  width: 100%;
}

.drawer .icon-label i {
  margin-right: 10px;
}

.drawer .icon-label .label {
  flex: 1;
}

.content {
  flex-grow: 1;
  min-height: 100vh;
  width: 100%;
  background-color: white;
}

.popover {
  position: absolute;
  z-index: 1050;
  display: block;
  font-family: Arial, sans-serif;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  width: 250px;
  top: 50px; /* Adjust this value based on where you want it to appear */
  left: -170px; /* Adjust this value to position it relative to the profile icon */
  opacity: 0;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-size: 16px;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.popover.show {
  opacity: 1;
  transform: translateX(0);
}

.popover-body {
  display: flex;
  flex-direction: column;
}

.field-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px; /* Adjust as needed */
}

.field-container i {
  margin-left: 10px; /* Adjust spacing as needed */
  cursor: pointer;
}

.popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
  top: 50%;
  right: 100%; /* Position the arrow on the left side of the popover */
  transform: translateY(-50%);
}

.dropdown-menu {
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 0.25rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.175);
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  display: block;
}

.dropdown-item {
  padding: 0.25rem 1.5rem;
  font-size: 1rem;
  color: #212529;
  text-decoration: none;
  display: block;
  clear: both;
  font-weight: 400;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.dropdown-item:hover {
  background-color: rgba(0, 145, 7, 0.1);
}

.container {
  margin-left: 0;
}

.container2 {
  margin-right: 0;
}
</style>




