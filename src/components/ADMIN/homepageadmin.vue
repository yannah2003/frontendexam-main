<template>
  <div v-if="isVisible">
    <nav class="navbar navbar-expand-lg">
      <div class="d-flex align-items-center">
        <i class="bi bi-list-task fs-2" style="margin-left: 40px; margin-right: 20px;" @click="toggleDrawer"></i>
        <h2 class="logo me-2">WISE - SHS</h2>
      </div>
      <div class="d-flex align-items-center ms-auto">
        <h4 class="mb-0 me-3">WELCOME ADMIN!</h4>
        <div @click="togglePopover" style="cursor: pointer; position: relative;">
          <i class="bi bi-person-lock" style="font-size: 40px; margin-right: 20px;"></i>
          <div v-if="isPopoverVisible" class="popover show" role="tooltip">
            <div class="popover-arrow"></div>
            <div v-if="isLoggedIn">
              <div v-if="userProfile">
                <div class="popover-body">
                  ID number: {{ userProfile.idnumber }}
                  NAME : {{ userProfile.lname }}
                  <br />
                </div>
                <button class="btn btn-danger btn-sm mt-2" @click="handlelogout">Log Out</button>
              </div>
              <div v-else>
                <p>Loading user profile...</p>
              </div>
              <div v-if="error">
                <p>Error fetching user profile: {{ error }}</p>
              </div>
            </div>
            <div v-else>
              <p>User not logged in.</p>
              <!-- You might redirect to the login page or display a login form here -->
            </div>
          </div>
        </div>
      </div>
    </nav>
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
        
        <!-- Manage User Dropdown -->
        <div class="list-group dropdown" @click="toggleDropdown('manageUser')">
          <span class="icon-label dropdown-toggle" style="cursor: pointer;">
            <i class="bi bi-people-fill fs-4"></i> Manage User
          </span>
          <ul v-if="isDropdownVisible.manageUser" class="dropdown-menu show">
            <li><router-link to="/allusers" class="dropdown-item" @click="handleItemClick('/allusers')">All Users</router-link></li>
            <li><router-link to="/manage_teachers" class="dropdown-item" @click="handleItemClick('/manage_teachers')">Manage Teachers</router-link></li>
            <li><router-link to="/manage_students" class="dropdown-item" @click="handleItemClick('/manage_students')">Manage Students</router-link></li>
          </ul>
        </div>

        <!-- Strand Dropdown -->
        <div class="list-group dropdown" @click="toggleDropdown('strand')">
          <span class="icon-label dropdown-toggle" style="cursor: pointer;">
            <i class="bi bi-grid-fill fs-4"></i> Strand & Section
          </span>
          <ul v-if="isDropdownVisible.strand" class="dropdown-menu show">
            <li><router-link to="/strand-section/abm11" class="dropdown-item" @click="handleItemClick('/strand-section/abm11')">ABM 11</router-link></li>
            <li><router-link to="/strand-section/abm12" class="dropdown-item" @click="handleItemClick('/strand-section/abm12')">ABM 12</router-link></li>
            <li><router-link to="/strand-section/humms11" class="dropdown-item" @click="handleItemClick('/strand-section/humms11')">HUMMS 11</router-link></li>
            <li><router-link to="/strand-section/humms12" class="dropdown-item" @click="handleItemClick('/strand-section/humms12')">HUMMS 12</router-link></li>
            <li><router-link to="/strand-section/stem11" class="dropdown-item" @click="handleItemClick('/strand-section/stem11')">STEM 11</router-link></li>
            <li><router-link to="/strand-section/stem12" class="dropdown-item" @click="handleItemClick('/strand-section/stem12')">STEM 12</router-link></li>
            <li><router-link to="/strand-section/tvl11" class="dropdown-item" @click="handleItemClick('/strand-section/tvl11')">TVL 11</router-link></li>
            <li><router-link to="/strand-section/tvl12" class="dropdown-item" @click="handleItemClick('/strand-section/tvl12')">TVL 12</router-link></li>
          </ul>
        </div>

        <div class="list-group logOut" @click="handlelogout" style="margin-top: 280px;">
          <span class="icon-label">
            <i class="bi bi-box-arrow-left fs-4"></i> LOG OUT
          </span>
        </div>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePageAdmin',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLoggedIn: false,
      userProfile: null,
      drawerVisible: true,
      isPopoverVisible: false,
      isDropdownVisible: {
        manageUser: false,
        strand: false,
      },
      selectedItem: localStorage.getItem('selectedItem') || '/adashboard',
      items: [
        { path: '/adashboard', label: 'Dashboard', icon: 'bi bi-bar-chart-fill fs-4' },
        { path: '/aregister', label: 'Register Users', icon: 'bi bi-person-plus-fill fs-4' },
      ],
    };
  },
  created() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.fetchUserProfile();
    }
    if (this.$route.path !== this.selectedItem) {
      this.$router.push(this.selectedItem);
    }
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
        this.userProfile = response.data.data;
      } catch (error) {
        this.error = error.response && error.response.data.message ? error.response.data.message : 'Failed to fetch user profile';
      }
    },
    async handleLogout() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        localStorage.removeItem('token');
        localStorage.removeItem('selectedItem');
        this.isLoggedIn = false;
        this.userProfile = null;
        this.$emit('logout');
        this.$router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    toggleDrawer() {
      this.drawerVisible = !this.drawerVisible;
    },
    togglePopover() {
      this.isPopoverVisible = !this.isPopoverVisible;
    },
    toggleDropdown(section) {
      this.isDropdownVisible[section] = !this.isDropdownVisible[section];
    },
    handleItemClick(path) {
      this.selectedItem = path;
      localStorage.setItem('selectedItem', path);
      this.drawerVisible = false;
      this.isDropdownVisible.manageUser = false;
      this.isDropdownVisible.strand = false;
      this.$router.push(path);
    },
    handleContentClick() {
      if (this.drawerVisible) {
        this.drawerVisible = false;
      }
      this.isPopoverVisible = false;
      this.isDropdownVisible.manageUser = false;
      this.isDropdownVisible.strand = false;
    },
  },
  beforeMount() {
    this.$router.push('/adashboard');
    this.selectedItem = '/adashboard';
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




