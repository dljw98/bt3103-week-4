<template>
    <div id="app">
        <nav>
            <ul class = "ul">
                <li class = "li"><router-link to ="/" exact> Home </router-link></li>
                <li class = "li"><router-link to ="/orders" exact> Orders </router-link>></li>
                <li class = "li"><router-link to ="/dashboard" exact> Dashboard </router-link>></li>
            </ul>
        </nav>
        <br>
        <BarChart></BarChart>
        <br>
        <br>
        <br>
        <CallAPI></CallAPI>
    </div>
</template>

<script>
import BarChart from "./Charts/BarChart.vue"
import CallAPI from "./CallAPI.vue"

export default {
    components: {
        BarChart,
        CallAPI
    }
}
</script>

<style>

</style>