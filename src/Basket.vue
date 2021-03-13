<template>
<div id ="class">
    <p>
    <ul>
        <li v-for="item in itemsSelected" v-bind:key="item.name">  
            <p> 
            {{ item[0] }} x{{ item[1] }}
            </p>

        </li>
    </ul>
    </p>
    <button v-on:click="findTotal(); sendOrder()"> Calculate Total </button>
    <p v-if= "subTotal > 0">
        Subtotal: ${{ subTotal }}
        <br>
        <br>
        Grand Total : ${{ findGrandTotal }}
    </p>
</div>
</template>

<script>
import database from "./firebase.js"

export default {
    name: "Basket",

    data() {
        return {
            subTotal: 0
        }
    },
    
    props: {
        itemsSelected: {
            type: Array
        },

        itemNames: {
            type: Array
        },

        items: {
            type: Array
        }
    },

    components: {

    },

    methods: {
        findTotal: function() {
            console.log(this.itemsSelected);
            this.subTotal = 0;
            for (var i = 0; i < this.itemsSelected.length; i++) {
                var cost1 = this.itemsSelected[i][1] * this.itemsSelected[i][2];
                this.subTotal += cost1;
            }
            console.log(this.itemsSelected);
        },

        sendOrder: function() {
            var itemsSelectedNames = [];
            var unorderedArray = []; //unordered
            var finalObject = {};
            var count = 0;

            for (var item of this.itemsSelected) {
                itemsSelectedNames.push(item[0]);
            }

            for (var allItem of this.items) {
                if (!itemsSelectedNames.includes(allItem.name.valueOf())) { //means not selected
                    unorderedArray[count] = {name: allItem.name, quantity:0};
                    count++;
                }
            }

            for (var i of this.itemsSelected) {
                unorderedArray[count] = {name:i[0], quantity:i[1]};
                count++;
            }

            var count2 = 0;
            console.log(this.items.length);
            for (var orderedItem of this.items) {
                for (var unorderedItem of unorderedArray) {
                    if (unorderedItem.name.valueOf() == orderedItem.name.valueOf()) {
                        finalObject[count2] = unorderedItem;
                        count2++;
                    }
                }
            }
                    

            database.collection('orders').add(finalObject).then(() => location.reload());
        }
    },

    computed: {
        findGrandTotal: function() {
            return (this.subTotal * 1.07).toFixed(2);
        }
    }
}
</script>

<style>
#class {
    text-align: left;
}
</style>