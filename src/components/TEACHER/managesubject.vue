<template>
  <div class="container bg-light p-4 border rounded-bottom mt-4 mx-auto">
    <div class="title-container text-center">
      <h2>Manage Subjects</h2>
    </div>

    <div class="row mb-4 justify-content-end align-items-center">
      <div class="col-md-4 d-flex align-items-center">
        <label for="yearLevel" class="form-label me-2">Filter by Year Level:</label>
        <select v-model="selectedYearLevel" class="form-select" id="yearLevel">
          <option value="">All</option>
          <option v-for="level in yearLevels" :key="level" :value="level">{{ level }}</option>
        </select>
      </div>
      <div class="col-md-4">
        <div class="input-group">
          <span class="input-group-text">
            <i class="bi bi-search"></i>
          </span>
          <input type="text" v-model="search" class="form-control" placeholder="Search subjects" />
        </div>
      </div>
    </div>

    <table class="table table-bordered table-hover">
      <thead class="table-success">
        <tr>
          <th scope="col" class="text-center">No.</th>
          <th scope="col" class="text-center">Subject Name</th>
          <th scope="col" class="text-center">Year Level</th>
          <th scope="col" class="text-center">Strand</th>
          <th scope="col" class="text-center">Semester</th>
          <th scope="col" class="text-center">Generated Code</th>
          <th scope="col" class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(subject, index) in filteredSubjects" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ subject.subjectname }}</td>
          <td class="text-center">{{ subject.yearlevel }}</td>
          <td class="text-center">{{ subject.strand }}</td>
          <td class="text-center">{{ subject.semester }}</td>
          <td class="text-center">{{ subject.gen_code }}</td>
          <td class="text-center">
            <i class="bi bi-pencil-square custom-icon me-2" @click="editSubject(index)"></i>
            <i class="bi bi-person-x-fill custom-icon" @click="deleteSubject(subject.id, index)"></i>
          </td>
        </tr>
      </tbody>
    </table>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageSubjects',
  data() {
    return {
      subjects: [],
      search: '',
      selectedYearLevel: '',
      yearLevels: ['Grade 11', 'Grade 12'], // Example year levels
    };
  },
  computed: {
    filteredSubjects() {
      return this.subjects.filter(subject => {
        return (
          (!this.selectedYearLevel || subject.yearlevel === this.selectedYearLevel) &&
          (this.search === '' || subject.subjectname.toLowerCase().includes(this.search.toLowerCase()))
        );
      });
    },
  },
  methods: {
    async fetchSubjects() {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:8000/api/subjects', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.subjects = response.data.data;
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
      } catch (error) {
        console.error('Error fetching subjects:', error.response?.data?.message || error.message);
      }
    },
    
    editSubject(index) {
      const subject = this.subjects[index];
      this.$router.push({ path: '/teacheraddsubject', query: { subject: JSON.stringify(subject), index } });
    },
    async deleteSubject(subjectId, index) {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:8000/api/subjects/${subjectId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.subjects.splice(index, 1);
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
      } catch (error) {
        console.error('Error deleting subject:', error.response?.data?.message || error.message);
      }
    },
  },
  created() {
    this.fetchSubjects();
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
  max-width: 1200px;
}

h2 {
  background-color: #8fd6a4;
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

.input-group-text {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  color: #495057;
}

.table img {
  object-fit: cover;
}

.add-button {
  margin-top: 20px;
}
</style>
