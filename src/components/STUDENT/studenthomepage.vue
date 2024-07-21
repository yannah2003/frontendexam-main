<template>
  <div v-if="isVisible">
    <nav class="navbar navbar-expand-lg">
      <div class="d-flex align-items-center">
        <i class="bi bi-list-task fs-2" style="margin-left: 40px; margin-right: 20px;" @click="toggleDrawer"></i>
        <h2 class="logo me-2">WISE - SHS</h2>
      </div>
      <div class="d-flex align-items-center ms-auto">
        <h4 class="mb-0 me-3">WELCOME STUDENT !</h4>
        <div @click="togglePopover" style="cursor: pointer; position: relative;">
          <i class="bi bi-person-fill" style="font-size: 40px; margin-right: 20px;"></i>
          <div v-if="isPopoverVisible" class="popover show" role="tooltip">
            <div class="popover-arrow"></div>
            <div class="popover-body">
              <strong>Username:</strong> student@gmail.com
              <br />
              <button class="btn btn-danger btn-sm mt-2" @click="handleLogoutClick">Log Out</button>
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
export default {
  name: 'Student_homepage',
  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      drawerVisible: false,
      isPopoverVisible: false,
      isDropdownVisible: false,
      selectedItem: '',
      items: [
        { path: '/sdashboard', label: 'Dashboard', icon: 'bi bi-bar-chart-fill fs-4' },
        { path: '/saddsubject', label: 'Add Subjects', icon: 'bi bi-file-earmark-plus-fill fs-4' },
        { path: '/spending', label: 'Pending Exams', icon: 'bi bi-hourglass-split fs-4' },
        { path: '/sfinished', label: 'Finished Exams', icon: 'bi bi-check-circle-fill fs-4' },
        { path: '/sperformance', label: 'My Performance', icon: 'bi bi-bar-chart-line-fill fs-4' },
      ],
    };
  },
  methods: {
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
    handleLogoutClick() {
      this.$emit('logout');
    },
  },
  beforeMount() {
    this.$router.push('/sdashboard');
    this.selectedItem = '/sdashboard';
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
</style>
