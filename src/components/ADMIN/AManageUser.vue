<template>
  <div>
    <div class="container bg-light p-4 border rounded-bottom">
      <h4 class="text-center">Manage ALL Users</h4><br>
      <div class="row mb-4 justify-content-end align-items-center">
        <div class="col-md-4 d-flex align-items-center">
          <label for="userType" class="form-label me-2">SELECT USER TYPE:</label>
          <select v-model="selectedUserType" class="form-select" id="userType">
            <option v-for="type in userTypes" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" v-model="search" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>

      <table class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th scope="col" class="text-center">No.</th>
            <th scope="col" class="text-center">LRN</th>
            <th scope="col" class="text-center">Name</th>
            <th scope="col" class="text-center">Sex</th>
            <th scope="col" class="text-center">Email</th>
            <th scope="col" class="text-center">User Type</th>
            <th scope="col" class="text-center">Date Registered</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="item.lrn">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.lrn }}</td>
            <td class="text-center">{{ item.username }}</td>
            <td class="text-center">{{ item.sex }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.usertype }}</td>
            <td class="text-center">{{ item.dateregistered }}</td>
            <td class="text-center">
              <i class="bi bi-pencil-square custom-icon me-2" @click="openModal(item)"></i>
              <i class="bi bi-person-x-fill custom-icon" @click="removeUser(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit User</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="lname" class="form-label">Last Name:</label>
                  <input type="text" id="lname" v-model="currentUser.lastname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="fname" class="form-label">First Name:</label>
                  <input type="text" id="fname" v-model="currentUser.firstname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="mname" class="form-label">Middle Name:</label>
                  <input type="text" id="mname" v-model="currentUser.middlename" class="form-control" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-4">
                  <label for="id" class="form-label">ID / LRN Number:</label>
                  <input type="text" id="id" v-model="currentUser.lrn" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label d-block">Gender:</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="male" value="male" v-model="currentUser.gender">
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="female" value="female" v-model="currentUser.gender">
                    <label class="form-check-label" for="female">Female</label>
                  </div>
                </div>
                <div class="col-md-4">
                  <label for="date" class="form-label">Date Registration:</label>
                  <input type="date" id="date" v-model="currentUser.dateregistered" class="form-control" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="email" class="form-label">Email Address:</label>
                  <input type="email" id="email" v-model="currentUser.email" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label for="password" class="form-label">Password:</label>
                  <input type="password" id="password" v-model="currentUser.password" class="form-control" required>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
            <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageUser',
  data() {
    return {
      search: '',
      showModal: false,
      selectedUserType: '',
      userTypes: ['student', 'teacher'],
      serverItems: [],
      currentUser: {}  // Holds the user data being edited
    };
  },
  computed: {
    filteredItems() {
      return this.serverItems.filter(item => {
        return (
          (!this.selectedUserType || item.usertype === this.selectedUserType) &&
          (this.search === '' || item.username.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    async loadItems() {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8000/api/userResourceCollection', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.serverItems = response.data.map(user => ({
          lrn: user.idnumber,
          username: user.fname,
          sex: user.sex,
          email: user.email,
          usertype: user.usertype,
          dateregistered: user.created_at
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    openModal(item) {
      this.currentUser = { ...item }; // Populate the modal with user data
      this.showModal = true;
    },
    async removeUser(item) {
      try {
        const token = localStorage.getItem('userToken');
        await axios.delete(`http://localhost:8000/api/users/${item.lrn}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        this.serverItems = this.serverItems.filter(user => user.lrn !== item.lrn);
      } catch (error) {
        console.error('Error removing user:', error);
      }
    },
    async saveChanges() {
      try {
        const token = localStorage.getItem('userToken');
        if (this.currentUser.lrn) {
          await axios.put(`http://localhost:8000/api/users/${this.currentUser.lrn}`, this.currentUser, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        } else {
          await axios.post('http://localhost:8000/api/users', this.currentUser, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
        }
        this.loadItems(); // Reload the users after saving
        this.showModal = false;
      } catch (error) {
        console.error('Error saving changes:', error);
      }
    }
  },
  mounted() {
    this.loadItems(); // Load items when component is mounted
  }
};
</script>

<style scoped>
/* Your existing styles */
</style>
