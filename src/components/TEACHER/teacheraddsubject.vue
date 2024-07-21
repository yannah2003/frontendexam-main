<template>
  <div class="subject-container">
    <h4 class="subject-header">
      <center>{{ isEditing ? 'Edit Subject' : 'Add Subject' }}</center>
    </h4>
    <div class="subject-form">
      <form @submit.prevent="addSubject" class="row mb-3">
        <div class="col-md-6">
          <label for="subjectName" class="form-label">Subject Name:</label>
          <input type="text" id="subjectName" v-model="subjectName" class="form-control" required>
        </div>
        <div class="col-md-6">
          <label for="yearLevel" class="form-label">Year Level:</label>
          <select id="yearLevel" v-model="yearLevel" class="form-control" required>
            <option value="" disabled>Select Year Level</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="strand" class="form-label">Strand:</label>
          <select id="strand" v-model="strand" class="form-control" required>
            <option value="" disabled>Select Strand</option>
            <option value="ICT">ICT</option>
            <option value="STEM">STEM</option>
            <option value="HUMSS">HUMSS</option>
            <option value="ABM">ABM</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="semester" class="form-label">Semester:</label>
          <select id="semester" v-model="semester" class="form-control" required>
            <option value="" disabled>Select Semester</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="subjectCode" class="form-label">Generated Code:</label>
          <div class="input-group">
            <input type="text" id="subjectCode" v-model="subjectCode" class="form-control" readonly>
            <button type="button" class="btn-generate" @click="generateCode">Generate Code</button>
          </div>
        </div>
        <div class="col-md-6">
          <label for="subjectImage" class="form-label">Upload Image:</label>
          <input type="file" id="subjectImage" class="form-control" @change="handleImageUpload">
        </div>
        <div class="text-center mt-4">
          <button type="submit" class="btn">
            <i class="bi bi-plus-circle"></i>
            <span class="ms-2"><b>{{ isEditing ? 'Update Subject' : 'Add Subject' }}</b></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TeacherAddSubject',
  data() {
    return {
      isEditing: false,
      subjectIndex: null,
      subjectName: '',
      yearLevel: '',
      strand: '',
      semester: '',
      subjectCode: '',
      subjectImage: null,
    };
  },
  methods: {
    addSubject() {
      const newSubject = {
        subjectName: this.subjectName,
        yearLevel: this.yearLevel,
        strand: this.strand,
        semester: this.semester,
        code: this.subjectCode,
        image: this.subjectImage ? URL.createObjectURL(this.subjectImage) : null,
      };

      let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

      if (this.isEditing) {
        subjects[this.subjectIndex] = newSubject;
      } else {
        subjects.push(newSubject);
      }

      localStorage.setItem('subjects', JSON.stringify(subjects));
      this.$router.push('/teacherlistofsubject');
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      this.subjectImage = file;
    },
    generateCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const length = 6;
      let code = '';
      for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      this.subjectCode = code;
    },
    loadSubjectDetails() {
      if (this.$route.query.subject) {
        const subject = JSON.parse(this.$route.query.subject);
        this.subjectIndex = this.$route.query.index;
        this.subjectName = subject.subjectName;
        this.yearLevel = subject.yearLevel;
        this.strand = subject.strand;
        this.semester = subject.semester;
        this.subjectCode = subject.code || '';
        if (subject.image) {
          this.subjectImage = subject.image;
        }
        this.isEditing = true;
      }
    },
  },
  mounted() {
    this.loadSubjectDetails();
  },
};
</script>

<style scoped>
.subject-container {
  padding: 20px;
  background-color: #f8f9fa94;
  border: 1px solid #0b355e;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
}

.subject-header {
  background-color: #8FD6A4;
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
}

.subject-form {
  padding: 20px;
}

.form-label {
  font-family: 'Georgia', serif;
  color: #343a40;
}

.form-control {
  border-radius: 5px;
  border: 2px solid #03721b;
}

.input-group .btn-generate {
  background-color: #8FD6A4;
  border: 2px solid #03721b;
  color: rgb(5, 1, 1);
  font-family: 'Georgia', serif;
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 5px;
}

.input-group .btn-generate:hover {
  background-color: #075e0e;
  border-color: #02070c;
  color: white;
}

.btn {
  background-color: #38A05D;
  border: 2px solid #03721b;
  color: rgb(5, 1, 1);
  font-family: 'Georgia', serif;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  width: 30%;
}

.btn:hover {
  background-color: #2C8C4F;
  border-color: #02070c;
  color: white;
}

.text-center {
  text-align: center;
}
</style>
