<template>
  <v-container fluid class="pa-6">
    <!-- HEADER CARD -->
    <v-card class="mb-6 gradient-header" elevation="4">
      <v-card-text class="pa-6">
        <v-row align="center" class="text-center">
          <v-col cols="12">
            <v-avatar size="80" color="white" class="mb-4">
              <v-icon large color="primary">mdi-group</v-icon>
            </v-avatar>
            <h1 class="display-1 font-weight-bold white--text mb-2">
              User Management System
            </h1>
            <p class="title font-weight-light white--text mb-0">
              Manage your users efficiently and effectively
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- MAIN CONTENT CARD -->
    <v-card elevation="4" class="main-card">
      <!-- TOOLBAR -->
      <v-card-text class="pa-6">
        <v-row align="center" class="mb-4">
          <v-col cols="12" md="6">
            <h2 class="headline primary--text font-weight-bold">
              Users Details
              <v-chip color="primary" class="ml-2" v-if="users.length > 0">
                {{ users.length }} Users
              </v-chip>
            </h2>
          </v-col>
          
          <v-col cols="12" md="6" class="text-right">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search users by name, email, or city..."
              single-line
              outlined
              dense
              hide-details
              class="search-field mr-4"
              clearable
            ></v-text-field>
            
            <v-btn 
              color="primary" 
              @click="fetchUsersFromAPI" 
              :loading="loading"
              large
              class="elevation-2"
            >
              <v-icon left>mdi-download</v-icon>
              Fetch Users
            </v-btn>
          </v-col>
        </v-row>

        <!-- STATS CARDS -->
        <v-row class="mb-6">
          <v-col cols="12" sm="4">
            <v-card color="blue lighten-5" elevation="2" class="stats-card">
              <v-card-text class="text-center">
                <v-icon large color="blue" class="mb-2">mdi-account</v-icon>
                <h3 class="title blue--text">{{ users.length }}</h3>
                <p class="mb-0">Total Users</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card color="green lighten-5" elevation="2" class="stats-card">
              <v-card-text class="text-center">
                <v-icon large color="green" class="mb-2">mdi-account-check</v-icon>
                <h3 class="title green--text">{{ filteredUsers.length }}</h3>
                <p class="mb-0">Displayed</p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12" sm="4">
            <v-card color="orange lighten-5" elevation="2" class="stats-card">
              <v-card-text class="text-center">
                <v-icon large color="orange" class="mb-2">mdi-city</v-icon>
                <h3 class="title orange--text">{{ uniqueCities }}</h3>
                <p class="mb-0">Cities</p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- SEARCH INFO -->
        <v-alert 
          v-if="search" 
          type="info" 
          dense 
          elevation="2"
          border="left"
          colored-border
          class="mb-4"
        >
          <v-row align="center">
            <v-col>
              <strong>Search Results:</strong> Found {{ filteredUsers.length }} users matching "{{ search }}"
            </v-col>
            <v-col cols="auto">
              <v-btn small text @click="search = ''">
                <v-icon left>mdi-close</v-icon>
                Clear Search
              </v-btn>
            </v-col>
          </v-row>
        </v-alert>

        <!-- DATA TABLE -->
        <v-data-table
          :headers="headers"
          :items="filteredUsers"
          :loading="loading"
          :items-per-page="25"
          :search="search"
          class="elevation-2 data-table"
          loading-text="Loading users... Please wait"
          no-data-text="No users available. Click 'Fetch Users' to load data."
          no-results-text="No users found matching your search criteria."
        >
          <!-- NAME COLUMN -->
          <template v-slot:item.name="{ item }">
            <div class="d-flex align-center">
              <v-avatar color="primary" size="36" class="mr-3">
                <span class="white--text font-weight-bold">{{ getInitials(item.name) }}</span>
              </v-avatar>
              <div>
                <strong class="primary--text">{{ item.name }}</strong>
              </div>
            </div>
          </template>

          <!-- EMAIL COLUMN -->
          <template v-slot:item.email="{ item }">
            <div class="d-flex align-center">
              <v-icon small color="blue" class="mr-2">mdi-email</v-icon>
              <a :href="`mailto:${item.email}`" class="text-decoration-none">
                {{ item.email }}
              </a>
            </div>
          </template>

          <!-- CITY COLUMN -->
          <template v-slot:item.city="{ item }">
            <div class="d-flex align-center">
              <v-icon small color="green" class="mr-2">mdi-map-marker</v-icon>
              <span>{{ item.city }}</span>
            </div>
          </template>

          <!-- ACTIONS COLUMN -->
          <template v-slot:item.actions="{ item }">
            <v-btn 
              color="primary" 
              @click="editItem(item)"
              small
              outlined
              class="action-btn"
            >
              <v-icon small left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </template>

          <!-- LOADING SKELETON -->
          <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>

    <!-- EDIT DIALOG -->
    <v-dialog v-model="dialog" max-width="500px" persistent>
      <v-card elevation="8" class="edit-dialog">
        <v-card-title class="headline primary white--text pa-4">
          <v-icon left color="white">mdi-account-edit</v-icon>
          Edit User Profile
        </v-card-title>
        
        <v-card-text class="pa-6">
          <v-form ref="form">
            <v-text-field 
              v-model="editedItem.name" 
              label="Full Name" 
              outlined
              prepend-icon="mdi-account"
              class="mb-4"
            ></v-text-field>
            
            <v-text-field 
              v-model="editedItem.email" 
              label="Email Address" 
              outlined
              prepend-icon="mdi-email"
              class="mb-4"
            ></v-text-field>
            
            <v-text-field 
              v-model="editedItem.city" 
              label="City" 
              outlined
              prepend-icon="mdi-city"
            ></v-text-field>
          </v-form>
        </v-card-text>
        
        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn 
            color="red" 
            text 
            @click="close" 
            large
            class="mr-3"
          >
            <v-icon left>mdi-close</v-icon>
            Cancel
          </v-btn>
          <v-btn 
            color="primary" 
            @click="save" 
            :loading="saving"
            large
            elevation="2"
          >
            <v-icon left>mdi-content-save</v-icon>
            Save Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- SUCCESS MSG -->
    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="4000" elevation="4">
      <div class="d-flex align-center">
        <v-icon class="mr-3" color="white">
          {{ snackbarColor === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle' }}
        </v-icon>
        <span class="font-weight-medium">{{ snackbarText }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false" color="white">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { userService } from '@/services/api'

export default {
  name: 'UserTable',
  data: () => ({
    search: '',
    users: [],
    loading: false,
    saving: false,
    dialog: false,
    editedIndex: -1,
    editedItem: {
      uuid: '',
      name: '',
      email: '',
      city: ''
    },
    headers: [
      { text: 'User', value: 'name', width: '250px' },
      { text: 'Email Address', value: 'email', width: '300px' },
      { text: 'Location', value: 'city', width: '200px' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center', width: '150px' }
    ],
    snackbar: false,
    snackbarText: '',
    snackbarColor: 'success'
  }),

  computed: {
    filteredUsers() {
      if (!this.search) return this.users;
      
      const searchLower = this.search.toLowerCase();
      return this.users.filter(user => 
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.city.toLowerCase().includes(searchLower)
      );
    },
    
    uniqueCities() {
      const cities = new Set(this.users.map(user => user.city));
      return cities.size;
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    getInitials(name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    },

    async initialize() {
      this.loading = true
      try {
        const response = await userService.getUsers()
        this.users = response.data
      } catch (error) {
        this.showSnackbar('Error loading users from server', 'error')
      } finally {
        this.loading = false
      }
    },

    async fetchUsersFromAPI() {
      this.loading = true
      try {
        await userService.fetchUsers()
        this.showSnackbar('Successfully imported 1000 users!', 'success')
        await this.initialize()
      } catch (error) {
        this.showSnackbar('Failed to fetch users from external API', 'error')
      } finally {
        this.loading = false
      }
    },

    editItem(item) {
      this.editedItem = { ...item }
      this.dialog = true
    },

    close() {
      this.dialog = false
    },

    async save() {
      this.saving = true
      try {
        await userService.updateUser(this.editedItem.uuid, {
          name: this.editedItem.name,
          email: this.editedItem.email,
          city: this.editedItem.city
        })
        this.showSnackbar('User profile updated successfully!', 'success')
        this.close()
        await this.initialize()
      } catch (error) {
        this.showSnackbar('Failed to update user profile', 'error')
      } finally {
        this.saving = false
      }
    },

    showSnackbar(message, color) {
      this.snackbarText = message
      this.snackbarColor = color
      this.snackbar = true
    }
  }
}
</script>

<style scoped>
.gradient-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.main-card {
  border-radius: 12px !important;
}

.stats-card {
  border-radius: 10px !important;
  transition: transform 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
}

.search-field {
  max-width: 400px;

  

}

.data-table {
  border-radius: 8px !important;
}

.action-btn {
  border-radius: 20px !important;
}

.edit-dialog {
  border-radius: 12px !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
