<template>
  <main>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Welcome</h1>
      <div>
        <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"> Event Attendees for past 2 months </h1>
        <EventChart
              v-if="!loading && !error"
              :label="labels"
              :chart-data="attendees"
              style="margin-left: 75px; margin-right: 75px; margin-bottom: 75px;"
            ></EventChart>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import EventChart from "@/components/eventchart.vue";

export default {
  components: {
    EventChart,
  },
  data() {
    return {
      labels: [],
      attendees: [],
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = `http://localhost:3000/eventdata/graphdata`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item.eventName);
        this.attendees = response.data.map((item) => item.attendees);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
}
</script>
