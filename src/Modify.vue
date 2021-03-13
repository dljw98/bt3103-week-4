<template>
    <div>
        <form style="text-align:left"> 
            <div v-for="(dish, index) in datapacketArray" v-bind:key="dish.name">
                {{ dish.name }}: {{ dish.quantity }} <br>
                <input v-bind:id="index" placeholder=0 type="number" min="0">
                <br>
                <br>
                <br>
            </div>
        </form>
        <button style = "align:left" v-on:click="updateOrder()"> Update Order </button>
    </div>
    
</template>

<script>
import database from './firebase.js'
export default {
    data() {
        return  {
            datapacketArray:[], //just created an extra array to use for easier looping in template
            datapacket:{},
            id: this.$route.params.id
        }
    },
    
    created: function() {
        this.fetchItems();
    },

    props: {

    },

    methods: {
        fetchItems: function() {
            database.collection('orders').doc(this.$route.params.id).get().then((doc) => {
                this.datapacket = doc.data();
                for (var dish in this.datapacket) {
                    this.datapacketArray.push(this.datapacket[dish]);
                }
            });
        },

        updateOrder: function() {
            var copy = [];
            for (var i=0; i<6; i++) {
                if (document.getElementById(i).value.valueOf() == "") {
                    copy.push(this.datapacketArray[i].quantity);
                } else {
                    copy.push(document.getElementById(i).value);
                }
            } //copy is now an array of the new quantities
            console.log(copy);
            var updatedObject = {};
            
            var count = 0;

            for (var dish of this.datapacketArray) {
                updatedObject[count] = {name: dish.name, quantity: copy[count]};
                count++;
            }
            console.log(updatedObject);

            database.collection('orders').doc(this.id).set(updatedObject).then(this.$router.push({name: "orders"}));
            
        }
        
    }
}
</script>

<style>

</style>