<template>
    <div class="container mt-4">
      <h5 class="text-center">Manage Year Levels</h5>
  
      <div class="d-flex justify-content-between mb-3">
        <div class="input-group">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search Year Levels...">
          <button class="btn btn-outline-secondary" @click="openModal">
            <i class="bi bi-plus"></i>
          </button>
        </div>
      </div>
  
      <div>
        <table class="table table-bordered table-striped">
          <thead class="table-light">
            <tr>
              <th>No.</th>
              <th>Year Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(yearLevel, index) in filteredList" :key="yearLevel.id">
              <td>{{ index + 1 }}</td>
              <td>{{ yearLevel.name }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" @click="editYearLevel(yearLevel)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteYearLevel(yearLevel)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="modal fade" id="yearLevelModal" tabindex="-1" ref="yearLevelModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEdit ? 'Edit Year Level' : 'Add Year Level' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input type="text" v-model="newYearLevel" class="form-control" placeholder="Year Level">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="saveYearLevel">{{ isEdit ? 'Update' : 'Save' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'YearLevelManagement',
    data() {
      return {
        searchQuery: '',
        yearLevels: [
          { id: 1, name: 'Grade 11' },
          { id: 2, name: 'Grade 12' },
        ],
        newYearLevel: '',
        isEdit: false,
        editYearLevelId: null,
      };
    },
    computed: {
      filteredList() {
        return this.yearLevels.filter(yearLevel => {
          return yearLevel.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    },
    methods: {
      openModal() {
        const modal = new Modal(this.$refs.yearLevelModal);
        modal.show();
      },
      closeModal() {
        const modal = Modal.getInstance(this.$refs.yearLevelModal);
        modal.hide();
        this.resetForm();
      },
      saveYearLevel() {
        if (this.newYearLevel) {
          if (this.isEdit) {
            const yearLevel = this.yearLevels.find(y => y.id === this.editYearLevelId);
            yearLevel.name = this.newYearLevel;
          } else {
            this.yearLevels.push({
              id: this.yearLevels.length + 1,
              name: this.newYearLevel
            });
          }
          this.closeModal();
        }
      },
      editYearLevel(yearLevel) {
        this.isEdit = true;
        this.editYearLevelId = yearLevel.id;
        this.newYearLevel = yearLevel.name;
        this.openModal();
      },
      deleteYearLevel(yearLevel) {
        this.yearLevels = this.yearLevels.filter(y => y.id !== yearLevel.id);
      },
      resetForm() {
        this.newYearLevel = '';
        this.isEdit = false;
        this.editYearLevelId = null;
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  .table th, .table td {
    text-align: center;
  }
  </style>
  