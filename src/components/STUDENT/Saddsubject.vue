<template>
  <div>
    <h3> Subjects</h3>
    <div class="card-container">
      <div v-for="(subject, index) in subjects" :key="index" class="card subject-card" @click="redirectToSubjectPage(subject)" >
        <div class="image-container">
          <img :src="default_image_url" class="card-img-top" alt="Default Image"/>
          <i class="bi bi-three-dots-vertical icon" ></i>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ subject.subjectName }}</h5>
          <p class="card-text">
            <strong>Subject Teacher:</strong> {{ subject.teacher }}<br />
            <strong>Semester:</strong> {{ subject.semester }}
          </p>
        </div>
      </div>
    </div>
    <button class="bi bi-clipboard-plus-fill add-button" @click="showModal = true"></button>

    <div v-if="showModal" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ADD SUBJECT</h5>
            <button type="button" class="btn-close" @click="showModal = false" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="subjectCode" class="form-label">ENTER THE SUBJECT CODE:</label>
            <input type="text" id="subjectCode" v-model="subjectCode" class="form-control custom-border" required />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-accept" @click="enrollSubject" style="margin-right: 20px;">ENROLL/ADD SUBJECT</button>
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddSubject',
  data() {
    return {
      showModal: false, // Controls the visibility of the modal
      subjectCode: '', // Bind the input field to this data property
      subjects: [
        {
          subjectName: 'Mathematics',
          teacher: 'Juan Dela Cruz',
          semester: '1',
        },
        {
          subjectName: 'Philosophy',
          teacher: 'Mariah Curry',
          semester: '1',
        },
        {
          subjectName: 'Computer Servicing',
          teacher: 'Ben Ten',
          semester: '1',
        },
        {
          subjectName: 'Information Technology',
          teacher: 'Jezzy Jhay',
          semester: '1',
        },
        {
          subjectName: 'Information Technology',
          teacher: 'Jezzy Jhay',
          semester: '1',
        },
      ],
      default_image_url: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsb2ZmaWNlMl9sdXh1cnlfYmFja2dyb3VuZF9ncmVlbl9jb2xvcl93aXRoX2dvbGRlbl9saW5lX181N2E0MDI0Mi0xMzkzLTQ3MWMtYWMxNS0yYWM1Yzk3OTI0MjZfMS5qcGc.jpg',
    };
  },
  methods: {
    enrollSubject() {
      // Handle the enroll/add subject logic here
      console.log('Enrolling subject with code:', this.subjectCode);
      this.showModal = false; // Close the modal after adding the subject
    },
    redirectToSubjectPage(subject) {
      // Handle the redirection logic here
      console.log('Redirecting to subject:', subject.subjectName);
    }
  }
};
</script>

<style scoped>
h3 {
  color: rgb(6, 0, 0);
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-family: 'Georgia', serif;
  margin: 20px;
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
  background-color: #38a05d;
  border: none;
  color: white;
  cursor: pointer;
}

.add-button:hover {
  background-color: rgb(0, 120, 5);
}

.modal-header {
  background-color: #50c878; /* Green header background */
  color: #130404;
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
  border: 2px solid #0c4e06; /* Light border around input fields */
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

.btn-accept {
  background-color: #38a05d; /* Green background for primary button */
  border: none;
}

.btn-accept:hover {
  background-color: #50c878; /* Darker green on hover */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center cards horizontally */
  gap: 20px;
  margin-top: 10px;
}

.subject-card {
  flex: 1 1 calc(25% - 20px);
  min-width: 200px;
  max-width: 18rem;
  cursor: pointer;
  background-color: #f8f9fa94; /* Card background color */
  border: 1px solid #0b355e; /* Card border */
  border-radius: 8px; /* Card border radius */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Card box shadow */
  transition: transform 0.2s; /* Smooth hover effect */
}

.subject-card:hover {
  transform: scale(1.05); /* Slightly enlarge card on hover */
}

.image-container {
  position: relative;
}

.card-img-top {
  border-top-left-radius: 8px; /* Rounded corners for top-left */
  border-top-right-radius: 8px; /* Rounded corners for top-right */
  max-width: 100%;
  height: 150px;
  object-fit: cover;
}

.icon {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 1.5rem;
  color: white;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px; /* Adjust padding */
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
