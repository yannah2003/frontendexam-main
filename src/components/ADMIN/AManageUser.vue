<template>
  <div>
    <div class="container-fluid">
      <h4 class="text-center">Manage ALL Users</h4><br>
      <div class="row mb-4 justify-content-end align-items-center">
        <div class="col-md-4 d-flex align-items-center">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
              Sort By: {{ sortDirection === 'asc' ? 'A -> Z' : 'Z -> A' }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <li><button class="dropdown-item" type="button" @click="sortItems('asc')">A -> Z</button></li>
              <li><button class="dropdown-item" type="button" @click="sortItems('desc')">Z -> A</button></li>
            </ul>
          </div>
        </div>
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
            <th scope="col" class="text-center">Date Modified</th>
            <th scope="col" class="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sortedFilteredItems" :key="item.idnumber">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.idnumber }}</td>
            <td class="text-center">{{ item.lname }}, {{ item.fname }} {{ item.mname }}</td>
            <td class="text-center">{{ item.sex }}</td>
            <td class="text-center">{{ item.email }}</td>
            <td class="text-center">{{ item.usertype }}</td>
            <td class="text-center">{{ formatDate(item.created_at) }}</td>
            <td class="text-center">{{ formatDate(item.updated_at) }}</td>
            <td class="text-center">
              <i class="bi bi-pencil-square custom-icon me-2" @click="openModal(item)"></i>
              <i class="bi bi-person-x-fill custom-icon" @click="removeUser(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block; background-color: rgba(0, 0, 0, 0.5);">
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
                  <input type="text" id="lname" v-model="currentUser.lname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="fname" class="form-label">First Name:</label>
                  <input type="text" id="fname" v-model="currentUser.fname" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label for="mname" class="form-label">Middle Name:</label>
                  <input type="text" id="mname" v-model="currentUser.mname" class="form-control" required>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-8">
                  <label for="id" class="form-label">ID / LRN Number:</label>
                  <input type="text" id="id" v-model="currentUser.idnumber" class="form-control" required>
                </div>
                <div class="col-md-4">
                  <label class="form-label d-block">Gender:</label>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="male" value="male" v-model="currentUser.sex">
                    <label class="form-check-label" for="male">Male</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="gender" id="female" value="female" v-model="currentUser.sex">
                    <label class="form-check-label" for="female">Female</label>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="email" class="form-label">Email Address:</label>
                  <input type="email" id="email" v-model="currentUser.email" class="form-control" required>
                </div>
                <div class="col-md-6 position-relative">
                  <label for="password" class="form-label">Password:</label>
                  <div class="input-group">
                    <input :type="showPassword ? 'text' : 'password'" id="password" v-model="currentUser.password" class="form-control" required>
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
            <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'ManageUser',
  data() {
    return {
      search: '',
      showModal: false,
      selectedUserType: '',
      showPassword: false,
      sortDirection: 'asc', // default sort direction
      userTypes: ['student', 'teacher'],
      serverItems: [],
      currentUser: {}  // Holds the user data being edited
    };
  },
  computed: {
    filteredItems() {
      return this.serverItems.filter(item => {
        const idnumberStr = item.idnumber ? item.idnumber.toString().toLowerCase() : '';
        const searchLower = this.search.toLowerCase();
        return (
          (!this.selectedUserType || item.usertype === this.selectedUserType) &&
          (idnumberStr.includes(searchLower) ||
          (item.username && item.username.toLowerCase().includes(searchLower)) ||
          (item.lname && item.lname.toLowerCase().includes(searchLower)) ||
          (item.fname && item.fname.toLowerCase().includes(searchLower)) ||
          (item.mname && item.mname.toLowerCase().includes(searchLower)))
        );
      });
    },
    sortedFilteredItems() {
      const sortedItems = [...this.filteredItems].sort((a, b) => {
        const comparison = a.lname.localeCompare(b.lname); //// a.lname.localeCompare(b.lname) compares the lname property of two items (a and b) for sorting.
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
      return sortedItems;
    }
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:8000/api/users')
        .then(response => {
          this.serverItems = response.data;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    openModal(user) {
      this.currentUser = { ...user };
      this.showModal = true;
    },
    saveChanges() {
      axios.put(`http://localhost:8000/api/user/${this.currentUser.id}`, this.currentUser)
        .then(() => {
          this.fetchData();
          this.showModal = false;
        })
        .catch(error => {
          console.error('Error saving changes:', error);
        });
    },
    removeUser(user) {
      axios.delete(`http://localhost:8000/api/users/${user.id}`)
        .then(() => {
          this.fetchData();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    formatDate(date) {
      return moment(date).format('YYYY/M/D [time] h:mm a');
    },
    sortItems(direction) {
      this.sortDirection = direction;
    }
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>
.container-fluid {

  padding: 20px;
}

h4 {
  background-color:#8FD6A4;
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
  margin-bottom: 20px;
}

.custom-icon {
  cursor: pointer;
  color: black;
  font-size: 25px;
}

.custom-icon:hover {
  color: rgb(18, 211, 173);
  font-size: 30px;
}

.form-select {
  width: 200px;
}

.modal-content {
  border: 2px solid #28a745; /* Green border */
  border-radius: 10px; /* Rounded corners */
}

.modal-header {
  background-color:#50C878; /* Green header background */
  color: #130404;
  border-bottom: 1px solid #ddd; /* Light border below header */
}

.modal-title {
  font-size: 1.25rem;
}

.modal-body {
  padding: 1.5rem; /* More padding for the body */
}

.modal-footer {
  display: flex;
  justify-content: space-between; /* Buttons on opposite ends */
  border-top: 1px solid #ddd; /* Light border above footer */
}

.form-control:focus {
  box-shadow: 0 0 5px rgba(72, 180, 97, 0.5); /* Green shadow */
  border-color: #28a745; /* Green border */
}

.btn-primary {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-primary:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #545b62;
}

.table-success {
  background-color: #d4edda; /* Light green background */
  color: #155724; /* Dark green text */
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.25); /* Light blue background */
}
</style>
