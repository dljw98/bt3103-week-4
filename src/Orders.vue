<template>
    <div class = "navbar">
        <nav>
            <ul class = "ul">
                <li class = "li"><router-link to ="/" exact> Home </router-link></li>
                <li class = "li"><router-link to ="/orders" exact> Orders </router-link>></li>
                <li class = "li"><router-link to ="/dashboard" exact> Dashboard </router-link>></li>
            </ul>
        </nav>

        <p>
        <ul class = "ul"> 
            <li class = "li" v-for="order in orders" v-bind:key="order.name">
                <ul>
                    <li v-for="dish in order[1]" v-bind:key="dish.name">
                        {{ dish.name + ": " + dish.quantity }}
                    </li>
                    <button v-bind:id="order[0]" v-on:click="deleteItem($event)"> Delete </button>
                    <button v-bind:id="order[0]" v-on:click="route($event)"> Modify </button>
                </ul>
            </li>
        </ul>          
        </p>
    </div>
    
</template>

<script>
import database from "./firebase.js"

export default {
    data () {
        return {
            orders: []
        }
    },

    components: {

    },

    created: function() {
        this.fetchItems();
    },

    methods: {
        fetchItems: function() {
            database.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.orders.push([doc.id, doc.data()])
                 });
            });
        },

        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            database.collection('orders').doc(doc_id).delete().then(() => location.reload());
        },

        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({name: 'modify', params: {id:doc_id}});
        }
    }
}

</script>

<style>
#ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

#li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}


</style>