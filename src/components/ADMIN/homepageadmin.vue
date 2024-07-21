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
        <div class="list-group dropdown">
          <span class="icon-label dropdown-toggle" @click="toggleDropdown('strand')">
            <i class="bi bi-grid-fill fs-4"></i> Strand & Section
          </span>
          <ul v-if="isDropdownVisible.strand" class="dropdown-menu show">
            <li 
              :class="['dropdown-submenu', { 'active': selectedStrand === 'humss' }]"
              @mouseenter="showSubDropdown('humss')"
              @mouseleave="hideSubDropdown('humss')"
            >
              <span class="dropdown-item dropdown-toggle">HUMSS</span>
              <ul v-if="isSubDropdownVisible.humss" class="dropdown-menu">
                <li :class="{ 'active': selectedItem === '/strand-section/humss/grade11' }">
                  <router-link to="/strand-section/humss/grade11" class="dropdown-item" @click="handleItemClick('/strand-section/humss/grade11')">Grade 11</router-link>
                </li>
                <li :class="{ 'active': selectedItem === '/strand-section/humss/grade12' }">
                  <router-link to="/strand-section/humss/grade12" class="dropdown-item" @click="handleItemClick('/strand-section/humss/grade12')">Grade 12</router-link>
                </li>
              </ul>
            </li>
            <li 
              :class="['dropdown-submenu', { 'active': selectedStrand === 'stem' }]"
              @mouseenter="showSubDropdown('stem')"
              @mouseleave="hideSubDropdown('stem')"
            >
              <span class="dropdown-item dropdown-toggle">STEM</span>
              <ul v-if="isSubDropdownVisible.stem" class="dropdown-menu">
                <li :class="{ 'active': selectedItem === '/strand-section/stem/grade11' }">
                  <router-link to="/strand-section/stem/grade11" class="dropdown-item" @click="handleItemClick('/strand-section/stem/grade11')">Grade 11</router-link>
                </li>
                <li :class="{ 'active': selectedItem === '/strand-section/stem/grade12' }">
                  <router-link to="/strand-section/stem/grade12" class="dropdown-item" @click="handleItemClick('/strand-section/stem/grade12')">Grade 12</router-link>
                </li>
              </ul>
            </li>
            <li 
              :class="['dropdown-submenu', { 'active': selectedStrand === 'abm' }]"
              @mouseenter="showSubDropdown('abm')"
              @mouseleave="hideSubDropdown('abm')"
            >
              <span class="dropdown-item dropdown-toggle">ABM</span>
              <ul v-if="isSubDropdownVisible.abm" class="dropdown-menu">
                <li :class="{ 'active': selectedItem === '/strand-section/abm/grade11' }">
                  <router-link to="/strand-section/abm/grade11" class="dropdown-item" @click="handleItemClick('/strand-section/abm/grade11')">Grade 11</router-link>
                </li>
                <li :class="{ 'active': selectedItem === '/strand-section/abm/grade12' }">
                  <router-link to="/strand-section/abm/grade12" class="dropdown-item" @click="handleItemClick('/strand-section/abm/grade12')">Grade 12</router-link>
                </li>
              </ul>
            </li>
            <li 
              :class="['dropdown-submenu', { 'active': selectedStrand === 'tvl' }]"
              @mouseenter="showSubDropdown('tvl')"
              @mouseleave="hideSubDropdown('tvl')"
            >
              <span class="dropdown-item dropdown-toggle">TVL</span>
              <ul v-if="isSubDropdownVisible.tvl" class="dropdown-menu">
                <li :class="{ 'active': selectedItem === '/strand-section/tvl1' }">
                  <router-link to="/strand-section/tvl11" class="dropdown-item" @click="handleItemClick('/strand-section/tvl11')">Grade 11</router-link>
                </li>
                <li :class="{ 'active': selectedItem === '/strand-section/tvl12' }">
                  <router-link to="/strand-section/tvl12" class="dropdown-item" @click="handleItemClick('/strand-section/tvl12')">Grade 12</router-link>
                </li>
              </ul>
            </li>
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
      drawerVisible: false,
      isPopoverVisible: false,
      isDropdownVisible: {
        manageUser: false,
        strand: false,
      },
      isSubDropdownVisible: {
        humss: false,
        stem: false,
        abm: false,
        tvl: false,
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
    // Ensure the selected item matches the current route
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
    async handlelogout() {
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
        this.userProfile = null;
        this.$emit('logout');
        this.$router.push('/login'); // Redirect to login page after logout
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
      localStorage.setItem('selectedItem', path); // Save selected item in local storage
      this.selectedStrand = path.split('/') [2] || '',
      this.drawerVisible = false;
      this.isDropdownVisible.manageUser = false;
      this.isDropdownVisible.strand = false;
      this.$router.push(path); // Ensure router navigates to the selected item
    },
    handleContentClick() {
      if (this.drawerVisible) {
        this.drawerVisible = false;
      }
      this.isPopoverVisible = false;
      this.isDropdownVisible.manageUser = false;
      this.isDropdownVisible.strand = false;
    },
    showSubDropdown(strand) {
      this.isSubDropdownVisible[strand] = true;
    },
    hideSubDropdown(strand) {
      this.isSubDropdownVisible[strand] = false;
    },
  },
  beforeMount() {
    this.$router.push('/adashboard');
    this.selectedItem = '/adashboard';
    this.selectedStrand = '';
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

.navbar {
  background-color: #50C878;
}

.drawer {
  height: 100vh;
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
.label{

  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: bold;
}

.drawer .list-group.active,
.drawer .list-group:hover,
.drawer .logOut:hover {
  background-color: #50C878;
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
  padding: 10px;
  width: 200px;
  top: 50px;
  left: -210px; /* Positioning to the left of the profile icon */
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.popover.show {
  opacity: 1;
  transform: translateX(0);
}

.popover-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: white transparent transparent transparent;
  top: 50%;
  right: 100%; /* Position the arrow on the left side */
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

.dropdown-submenu {
  position: relative;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-top: -6px;
  border-radius: 0.25rem;
}

.dropdown-submenu:hover .dropdown-menu {
  display: block;
}

.dropdown-menu .dropdown-item {
  padding: 0.25rem 1.5rem;
  font-size: 1rem;
  color: #212529;
  text-decoration: none;
  display: block;
  white-space: nowrap;
}

.dropdown-menu .dropdown-item:hover {
  background-color: rgba(0, 145, 7, 0.1);
}

/* Highlight active strand */
.dropdown-submenu.active > .dropdown-item {
  background-color: #50C878;
  color: white;
}

.dropdown-menu .dropdown-item.active {
  background-color: #50C878;
  color: white;
}


</style>
