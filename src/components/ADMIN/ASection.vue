<template>
    <div class="container mt-4">
      <h5 class="text-center">Manage Sections</h5>
  
      <div class="d-flex justify-content-between mb-3">
        <div class="input-group">
          <input type="text" v-model="searchQuery" class="form-control" placeholder="Search Sections...">
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
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(section, index) in filteredList" :key="section.id">
              <td>{{ index + 1 }}</td>
              <td>{{ section.name }}</td>
              <td>
                <button class="btn btn-warning btn-sm me-1" @click="editSection(section)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="deleteSection(section)">
                  <i class="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="modal fade" id="sectionModal" tabindex="-1" ref="sectionModal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ isEdit ? 'Edit Section' : 'Add Section' }}</h5>
              <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <input type="text" v-model="newSection" class="form-control" placeholder="Section Name">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="saveSection">{{ isEdit ? 'Update' : 'Save' }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Modal } from 'bootstrap';
  
  export default {
    name: 'SectionManagement',
    data() {
      return {
        searchQuery: '',
        sections: [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
        ],
        newSection: '',
        isEdit: false,
        editSectionId: null,
      };
    },
    computed: {
      filteredList() {
        return this.sections.filter(section => {
          return section.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      }
    },
    methods: {
      openModal() {
        const modal = new Modal(this.$refs.sectionModal);
        modal.show();
      },
      closeModal() {
        const modal = Modal.getInstance(this.$refs.sectionModal);
        modal.hide();
        this.resetForm();
      },
      saveSection() {
        if (this.newSection) {
          if (this.isEdit) {
            const section = this.sections.find(s => s.id === this.editSectionId);
            section.name = this.newSection;
          } else {
            this.sections.push({
              id: this.sections.length + 1,
              name: this.newSection
            });
          }
          this.closeModal();
        }
      },
      editSection(section) {
        this.isEdit = true;
        this.editSectionId = section.id;
        this.newSection = section.name;
        this.openModal();
      },
      deleteSection(section) {
        this.sections = this.sections.filter(s => s.id !== section.id);
      },
      resetForm() {
        this.newSection = '';
        this.isEdit = false;
        this.editSectionId = null;
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
  