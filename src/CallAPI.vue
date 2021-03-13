<template>
  <div class="chart">
    <h1 style="background-color:#d9ffb3">Line Chart</h1>
    <CallAPIChart></CallAPIChart>
  </div>
</template>

<script>
import CallAPIChart from "./CallAPI.js";
export default {
  components: {
    CallAPIChart
  }
};
</script>

<style>
</style>