<template>
  <div>
    <div class="container bg-light p-4 border rounded-bottom">
      <h4 class="text-center">Manage Users TEACHERS</h4><br>
      <div class="row mb-4 justify-content-end align-items-center">
        <!-- Dropdown for Position Filtering -->
        <div class="col-md-4 d-flex align-items-center">
          <label for="userPosition" class="form-label me-2">SELECT POSITION:</label>
          <select v-model="selectedPosition" class="form-select" id="userPosition">
            <option v-for="position in positions" :key="position" :value="position">{{ position }}</option>
          </select>
        </div>
        <!-- Search Input -->
        <div class="col-md-4">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input type="text" v-model="search" class="form-control" placeholder="Search" />
          </div>
        </div>
      </div>

      <!-- Table -->
      <table class="table table-bordered table-hover">
        <thead class="table-success">
          <tr>
            <th scope="col" class="text-center">No.</th>
            <th scope="col" class="text-center">LRN</th>
            <th scope="col" class="text-center">Name</th>
            <th scope="col" class="text-center">Sex</th>
            <th scope="col" class="text-center">Email</th>
            <th scope="col" class="text-center">Position</th>
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
            <td class="text-center">{{ item.position }}</td>
            <td class="text-center">{{ item.dateregistered }}</td>
            <td class="text-center">
              <i class="bi bi-pencil-square custom-icon me-2" @click="openModal(item)"></i>
              <i class="bi bi-person-x-fill custom-icon" @click="removeUser(item)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
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
                <div class="col-md-6">
                  <label for="id" class="form-label">ID / LRN Number:</label>
                  <input type="text" id="id" v-model="currentUser.lrn" class="form-control" required>
                </div>
                <div class="col-md-6">
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
              
                
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="position" class="form-label">Position:</label>
                  <input type="text" id="position" v-model="currentUser.position" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label for="date" class="form-label">Date Registration:</label>
                  <input type="text" id="date" v-model="currentUser.dateregistered" class="form-control" required>
                </div>
                
              </div>
            
              <div class="row mb-3">
                <div class="col-md-6">
                  <label for="email" class="form-label">Email Address:</label>
                  <input type="email" id="email" v-model="currentUser.email" class="form-control" required>
                </div>
                <div class="col-md-6">
                  <label for="password" class="form-label">Password:</label>
                  <input type="text" id="password" class="form-control" required>
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
const users = [
  { lrn: '12345', username: 'user1', sex: 'male', email: 'user1@example.com', position: 'Teacher 2', dateregistered: '2023-01-01', lastname: 'Doe', firstname: 'John', middlename: '', gender: 'male' },
  { lrn: '67890', username: 'user2', sex: 'female', email: 'user2@example.com', position: 'Teacher 3', dateregistered: '2023-02-01', lastname: 'Smith', firstname: 'Jane', middlename: '', gender: 'female' },
];

export default {
  name: 'ManageUserTeachers',
  data() {
    return {
      search: '',
      showModal: false,
      selectedPosition: '',
      positions: ['All Positions', 'Teacher 1', 'Teacher 2', 'Teacher 3'],
      serverItems: [],
      currentUser: {}  // Holds the user data being edited
    };
  },
  computed: {
    filteredItems() {
      return this.serverItems.filter(item => {
        return (
          (this.selectedPosition === '' || this.selectedPosition === 'All Positions' || item.position === this.selectedPosition) &&
          (this.search === '' || item.username.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    loadItems() {
      setTimeout(() => {
        this.serverItems = users;
      }, 500);
    },
    openModal(item) {
      this.currentUser = { ...item }; // Populate the modal with user data
      this.showModal = true;
    },
    removeUser(item) {
      console.log('Remove user:', item);
      // Add remove functionality here
    },
    saveChanges() {
      console.log('Save changes:', this.currentUser);
      // Add save functionality here
      this.showModal = false;
    }
  },
  mounted() {
    this.loadItems();
  },
};
</script>

<style scoped>
.container {
  margin-top: 10px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 20px;
}

h4 {
  background-color: #8FD6A4;
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
  color: #130404; /* White text color */
  border-bottom: 1px solid #ddd; /* Light border below header */
}

.modal-title {
  font-size: 1.25rem; /* Larger font size for the title */
  font-weight: bold;
}

.btn-close {
  filter: invert(1); /* White close button icon */
}

.modal-body {
  background-color: #f8f9fa; /* Light grey background for form */
}

.input-group-text {
  background-color: #e9ecef; /* Light grey background for input labels */
  border: 1px solid #ced4da; /* Light border around input labels */
  color: #495057; /* Dark grey text color */
}

.form-control {
  border-radius: 5px; /* Rounded corners for input fields */
  border: 1px solid #ced4da; /* Light border around input fields */
}

.form-control:focus {
  border-color: #28a745; /* Green border on focus */
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25); /* Green shadow on focus */
}

.modal-footer {
  border-top: 1px solid #ddd; /* Light border above footer */
}

.btn-secondary {
  background-color: #6c757d; /* Grey background for secondary button */
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268; /* Darker grey on hover */
}

.btn-primary {
  background-color: #28a745; /* Green background for primary button */
  border: none;
}

.btn-primary:hover {
  background-color: #218838; /* Darker green on hover */
}
</style>
