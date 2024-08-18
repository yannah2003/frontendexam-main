
<template>
  <div class="container mt-4">
    <!-- Title -->
    <div class="mb-4">
      <h5 class="text-center">Manage Strand, Section & Year Levels</h5>
    </div>
    
    <!-- Search and Add Button -->
    <div class="d-flex justify-content-between mb-3">
      <div class="input-group">
        <input type="text" v-model="searchQuery" class="form-control" placeholder="Search...">
        <button class="btn btn-outline-secondary" @click="openModal">
          <i class="bi bi-plus"></i>
        </button>
      </div>
    </div>

    <!-- Table -->
    <div>
      <table class="table table-bordered table-striped">
        <thead class="table-light">
          <tr>
            <th>No.</th>
            <th>Strand</th>
            <th>Section</th>
            <th>Year Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.strand }}</td>
            <td>{{ item.section }}</td>
            <td>{{ item.yearLevel }}</td>
            <td>
              <button class="btn btn-warning btn-sm me-1" @click="editItem(item)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" @click="deleteItem(item)">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div class="modal fade" id="addEditModal" tabindex="-1" ref="addEditModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEdit ? 'Edit' : 'Add' }} Strand, Section & Year Level</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <input type="text" v-model="newStrand" class="form-control" placeholder="Strand">
            </div>
            <div class="mb-3">
              <input type="text" v-model="newSection" class="form-control" placeholder="Section">
            </div>
            <div class="mb-3">
              <input type="text" v-model="newYearLevel" class="form-control" placeholder="Year Level">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveItem">{{ isEdit ? 'Update' : 'Save' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Import the Bootstrap Modal class
import { Modal } from 'bootstrap';

export default {
  name: 'StrandSection',
  data() {
    return {
      searchQuery: '',
      items: [
        { id: 1, strand: 'STEM', section: 'A', yearLevel: 'Grade 11' },
        { id: 2, strand: 'ABM', section: 'B', yearLevel: 'Grade 12' }
      ],
      newStrand: '',
      newSection: '',
      newYearLevel: '',
      showModal: false,
      isEdit: false,
      editItemId: null,
    };
  },
  computed: {
    filteredList() {
      return this.items.filter(item => {
        return (
          this.searchQuery === '' || 
          item.strand.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.section.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.yearLevel.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      });
    }
  },
  methods: {
    openModal() {
      const modal = new Modal(this.$refs.addEditModal);
      modal.show();
    },
    closeModal() {
      const modal = Modal.getInstance(this.$refs.addEditModal);
      modal.hide();
      this.resetForm();
    },
    saveItem() {
      if (this.newStrand && this.newSection && this.newYearLevel) {
        if (this.isEdit) {
          const item = this.items.find(i => i.id === this.editItemId);
          item.strand = this.newStrand;
          item.section = this.newSection;
          item.yearLevel = this.newYearLevel;
        } else {
          this.items.push({
            id: this.items.length + 1,
            strand: this.newStrand,
            section: this.newSection,
            yearLevel: this.newYearLevel
          });
        }
        this.closeModal();
      }
    },
    editItem(item) {
      this.isEdit = true;
      this.editItemId = item.id;
      this.newStrand = item.strand;
      this.newSection = item.section;
      this.newYearLevel = item.yearLevel;
      this.openModal();
    },
    deleteItem(item) {
      this.items = this.items.filter(i => i.id !== item.id);
    },
    resetForm() {
      this.newStrand = '';
      this.newSection = '';
      this.newYearLevel = '';
      this.isEdit = false;
      this.editItemId = null;
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.table th, .table td {
  text-align: center;
  vertical-align: middle;
}

.modal-backdrop.show {
  opacity: 0.5;
}
</style>
