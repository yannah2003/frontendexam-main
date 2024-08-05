<template>
  <div class="teacher-list-of-subjects">
    <div class="header">
      <h2 class="title">List of Subjects Handled</h2>
      <div class="filter-dropdown">
        <select v-model="filterBySemester" class="form-select">
          <option value="">All</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
        </select>
      </div>
    </div>
    
    <div class="card-container">
      <div
        v-for="(subject, index) in filteredSubjects"
        :key="index"
        class="card subject-card"
        @click="redirectToSubjectPage(subject)"
      >
        <img :src="getSubjectImage(subject)" class="card-img-top" :alt="'Subject Image'">
        <div class="card-body">
          <h5 class="card-title">{{ subject.subjectname }}</h5>
          <p class="card-text">
            <strong>Strand:</strong> {{ subject.strand }}<br>
            <strong>Year Level:</strong> {{ subject.yearlevel }}<br>
            <strong>Semester:</strong> {{ subject.semester }}
          </p>
        </div>
      </div>
    </div>
    
    <button class="btn btn-success add-button" @click="goToAddSubject">
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TeacherListOfSubjects',
  data() {
    return {
      subjects: [],
      filterBySemester: '',
      default_images: [
        'https://i.pinimg.com/564x/bc/51/fa/bc51faa5a418b185856aa1cc567873e7.jpg',
        'https://i.pinimg.com/564x/11/14/52/1114521a287ea358ea02ecf638fbbc0a.jpg',
        'https://i.pinimg.com/564x/a1/6c/64/a16c64a0e98668626b75cfa5e54871ed.jpg',
        'https://i.pinimg.com/564x/b4/58/8c/b4588c4f939b52fca8c3dfa622dc8725.jpg'
      ],
    };
  },
  computed: {
    filteredSubjects() {
      if (this.filterBySemester) {
        return this.subjects.filter(subject => subject.semester === this.filterBySemester);
      } else {
        return this.subjects;
      }
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

        // Ensure consistent image assignment for subjects without user-uploaded images
        this.subjects.forEach(subject => {
          if (!subject.up_img) {
            // Assign a consistent default image
            const image = this.getDefaultImage(subject.id);
            subject.up_img = image; // Assign default image
          }
        });

        // Store subjects in local storage
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
      } catch (error) {
        console.error('Error fetching subjects:', error.response?.data?.message || error.message);
      }
    },
    goToAddSubject() {
      this.$router.push('/teacheraddsubject');
    },
    redirectToSubjectPage(subject) {
      if (subject.id) {
        this.$router.push({ name: 'SubjectPage', params: { subjectId: subject.id } });
      } else {
        console.error('Subject ID is missing:', subject);
      }
    },
    getSubjectImage(subject) {
      return subject.up_img || this.default_images[0];
    },
    getDefaultImage(subjectId) {
      // Generate a consistent image index based on subject ID
      const index = this.hashCode(subjectId) % this.default_images.length;
      return this.default_images[index];
    },
    hashCode(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32bit integer
      }
      return Math.abs(hash); // Ensure positive index
    },
  },
  created() {
    this.fetchSubjects();
  },
};
</script>

<style scoped>
.teacher-list-of-subjects {
  max-width: 1200px; /* Increase max-width for wider container */
  background-color: white;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
}

.header {
  display: flex;
  justify-content: center; /* Center the header horizontally */
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px; /* Add space above the header */
}

.title {
  background-color: #8FD6A4;
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
}

.filter-dropdown {
  margin-left: 20px; /* Adjust spacing */
}

.filter-dropdown select {
  width: 150px; /* Adjust width as needed */
}

.add-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: rgb(0, 145, 7);
  border: none;
  color: white;
}

.add-button:hover {
  background-color: rgb(0, 125, 0);
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center cards horizontally */
  gap: 10px;
}

.subject-card {
  flex: 1 1 calc(25% - 10px);
  min-width: 150px;
  max-width: 18rem;
  cursor: pointer;
  background-color: #f8f9fa94; /* Card background color */
  border: 1px solid #0b355e; /* Card border */
  border-radius: 8px; /* Card border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Card box shadow */
}

.card-img-top {
  border-top-left-radius: 8px; /* Rounded corners for top-left */
  border-top-right-radius: 8px; /* Rounded corners for top-right */
  max-width: 100%;
  height: auto;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px; /* Adjust padding */
}

.card-title {
  font-size: 1.25rem; /* Card title font size */
  margin-bottom: 0.5rem; /* Adjust margin bottom */
}

.card-text {
  text-align: center;
  color: #343a40; /* Card text color */
}
</style>
