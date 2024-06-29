<template>
  <div>
    <vue-cal
      :events="appoints"
      @event-click="showEventDetails"
      default-view="month"
      style="height: 600px;"
      locale="es"
    ></vue-cal>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title class="headline">{{ selectedEvent.client_name }}</v-card-title>
        <v-card-text>
          <p><strong>Cliente:</strong> {{ selectedEvent.client_name }}</p>
          <p><strong>Email:</strong> {{ selectedEvent.email }}</p>
          <p><strong>Teléfono:</strong> {{ selectedEvent.phone_number }}</p>
          <p><strong>Servicio:</strong> {{ selectedEvent.service_name }}</p>
          <p><strong>Calendario:</strong> {{ selectedEvent.calendar_name }}</p>
          <p><strong>Fecha de inicio:</strong> {{ formatDate(selectedEvent.start) }}</p>
          <p><strong>Fecha de fin:</strong> {{ formatDate(selectedEvent.end) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmDelete">Eliminar</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="confirmDialog" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmar Eliminación</v-card-title>
        <v-card-text>¿Está seguro que desea eliminar esta cita?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="deleteEvent">Sí</v-btn>
          <v-btn color="blue darken-1" text @click="confirmDialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';
import { mapGetters } from 'vuex';
import { fetchAppointments, deleteAppointment } from '@/services/appointment.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default {
  name: 'AdminCalendar',
  components: {
    VueCal
  },
  data() {
    return {
      appoints: [],
      dialog: false,
      confirmDialog: false,
      selectedEvent: {},
    };
  },
  computed: {
    ...mapGetters('tienda', ['tienda'])
  },
  mounted() {
    this.loadAppointments();
  },
  methods: {
    async loadAppointments() {
      try {
        const tiendaId = localStorage.getItem("store")
        if (!tiendaId) {
          throw new Error('Tienda no encontrada');
        }
        const appointments = await fetchAppointments(tiendaId);
        const eventsArray = appointments.map(appointment => ({
          start: this.convertToISO(appointment.startDate),
          end: this.convertToISO(appointment.endDate),
          title: `<span style="color: ${appointment.calendar.color}; font-size: 14px;">&#9679;</span> ${appointment.client_name}`,
          background: appointment.calendar.color,
          content: {
            id: appointment.id, // Añadir el id de la cita
            client_name: appointment.client_name,
            email: appointment.email,
            phone_number: appointment.phone_number,
            service_name: appointment.calendar.service.name,
            calendar_name: appointment.calendar.name,
            start: this.convertToISO(appointment.startDate),
            end: this.convertToISO(appointment.endDate),
          },
        }));
        this.appoints = [...eventsArray];
      } catch (error) {
        console.error('Error loading appointments:', error);
      }
    },
    convertToISO(dateString) {
      const [day, month, year, time] = dateString.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}:\d{2}:\d{2})/).slice(1);
      return `${year}-${month}-${day} ${time}`; // Formato esperado por vue-cal
    },
    showEventDetails(event) {
      this.selectedEvent = event.content;
      this.dialog = true;
    },
    async deleteEvent() {
      try {
        await deleteAppointment(this.selectedEvent.id);
        this.loadAppointments(localStorage.getItem("store")); // Recargar citas después de eliminar
        this.confirmDialog = false;
        this.dialog = false;
      } catch (error) {
        console.error('Error deleting appointment:', error);
      }
    },
    confirmDelete() {
      this.confirmDialog = true;
    },
    formatDate(date) {
      const formattedDate = format(new Date(date), "EEEE yyyy-MM-dd HH:mm:ss", { locale: es });
      return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
  }
};
</script>

<style scoped>
.headline {
  text-align: center;
}
</style>
