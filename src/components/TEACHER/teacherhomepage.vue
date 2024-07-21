<template>
  <div v-if="isVisible">
    <nav class="navbar navbar-expand-lg">
      <div class="d-flex align-items-center">
        <i class="bi bi-list-task fs-2" style="margin-left: 40px; margin-right: 20px;" @click="toggleDrawer"></i>
        <h2 class="logo me-2">WISE - SHS</h2>
      </div>
      <div class="d-flex align-items-center ms-auto">
        <h4 class="mb-0 me-3">WELCOME TEACHER!</h4>
        <div @click="togglePopover" style="cursor: pointer; position: relative;">
          <i class="bi bi-person-lock" style="font-size: 40px; margin-right: 20px;"></i>
          <div v-if="isPopoverVisible" class="popover show" role="tooltip">
            <div class="popover-arrow"></div>
            <div class="popover-body">
              <strong>Username:</strong> admin@gmail.com
              <br />
              <button class="btn btn-danger btn-sm mt-2" @click="handleLogoutClick">Log Out</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="d-flex">
      <div :class="['drawer', drawerVisible ? 'd-block' : 'd-none']">
        <router-link v-for="(item, index) in items" :key="index" :to="item.path" class="list-group" :class="{ active: selectedItem === item.path }" @click="handleItemClick(item.path)">
          <span class="icon-label">
            <i :class="item.icon"></i> {{ item.label }}
          </span>
        </router-link>
        <div class="list-group logOut" @click="handleLogoutClick" style="margin-top: 280px;">
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
  name: 'Teacher_homepage',
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
        { path: '/teacherdashboard', label: 'Dashboard', icon: 'bi bi-bar-chart-fill fs-4' },
        { path: '/teacheraddsubject', label: 'Add Subjects', icon: 'bi bi-file-earmark-plus-fill fs-4' },
        { path: '/teacherlistofsubject', label: 'List of Subjects', icon: 'bi bi-file-earmark-fill fs-4' },
        { path: '/managesubject', label: 'Manage Subject Details', icon: 'bi bi-gear-fill fs-4' },
        { path: '/subjectspage', label: 'Subject Page', icon: 'bi bi-book-fill fs-4' }
      ],
      classes: JSON.parse(localStorage.getItem('classes')) || [],
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
    addClass(classItem) {
      this.classes.push(classItem);
      localStorage.setItem('classes', JSON.stringify(this.classes));
    },
  },
  beforeMount() {
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
  left: -210px;
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
  right: 100%;
  transform: translateY(-50%);
}
</style>
