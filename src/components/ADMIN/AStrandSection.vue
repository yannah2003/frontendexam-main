<template>
    <div>
      <h3>Strands</h3>
      <div class="card-container">
        <div
          v-for="(strand, index) in strands"
          :key="index"
          class="card subject-card"
          @click="redirectToStrandPage(strand)"
        >
          <div class="image-container">
            <img :src="strand.image" class="card-img-top" alt="Strand Image" />
            <i
              class="bi bi-three-dots-vertical icon"
              v-b-popover.hover="'Delete'"
              @click.stop="deleteStrand(index)"
            ></i>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ strand.strandName }}</h5>
            <p class="card-text">
              <strong>Program Chair:</strong> {{ strand.teacher }}<br />
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StrandSection',
    data() {
      return {
        strands: [
          {
            strandName: 'STEM',
            teacher: 'Juan Dela Cruz',
            image: 'https://resdyjoefredpagayon.home.blog/wp-content/uploads/2020/10/stem_summer_camps-3.jpg?w=1024',
            route: '/strand-section/stem',
          },
          {
            strandName: 'ABM',
            teacher: 'Mariah Curry',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG8np_FScdwIQ0jQrecIQOncYUPjEl6dgk-w&s',
            route: '/strand-section/abm',
          },
          {
            strandName: 'HUMMS',
            teacher: 'Ben Ten',
            image: 'https://www.featiu.edu.ph/wp-content/uploads/2022/12/HUMSS-1-e1674187286961.png',
            route: '/strand-section/humss',
          },
          {
            strandName: 'TVL-ICT',
            teacher: 'Jezzy Jhay',
            image: 'https://cdn.vectorstock.com/i/1000v/49/78/ict-information-and-communication-technology-vector-27524978.jpg',
            route: '/strand-section/tvl-ict',
          },
        ],
        default_image_url:
          'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTEyL3Jhd3BpeGVsb2ZmaWNlMl9sdXh1cnlfYmFja2dyb3VuZF9ncmVlbl9jb2xvcl93aXRoX2dvbGRlbl9saW5lX181N2E0MDI0Mi0xMzkzLTQ3MWMtYWMxNS0yYWM1Yzk3OTI0MjZfMS5qcGc.jpg',
      };
    },
    methods: {
      redirectToStrandPage(strand) {
        // Navigate to the specified strand's route
        this.$router.push(strand.route);
      },
      deleteStrand(index) {
        // Handle the delete logic here
        console.log('Deleting strand at index:', index);
        this.strands.splice(index, 1);
      },
    },
  };
  </script>
  
  <style scoped>
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
    color: rgb(6, 1, 1);
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
  