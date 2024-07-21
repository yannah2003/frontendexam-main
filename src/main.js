// main.js

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Bootstrap CSS 
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap Icons CSS
import 'bootstrap-icons/font/bootstrap-icons.css';

// Font Awesome CSS (adjust path based on your setup)
import '@fortawesome/fontawesome-free/css/all.css';

// Import only necessary Bootstrap JavaScript components
import 'bootstrap/dist/js/bootstrap.bundle.min.js';  

const app = createApp(App);
app.use(router);
app.mount('#app');

//


