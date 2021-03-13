<template>
    <div id ="app">
        <nav>
            <ul class = "ul">
                <li class = "li"><router-link to ="/" exact> Home </router-link></li>
                <li class = "li"><router-link to ="/orders" exact> Orders </router-link>></li>
                <li class = "li"><router-link to ="/dashboard" exact> Dashboard </router-link>></li>
            </ul>
        </nav>


    <p style = "float: left;">
        <ul class = "ul">
            <li class = "li" v-for="item in items" v-bind:key="item.id">  
                <p> 
                <b>{{ item.name }}</b> <br> ${{item.price}} <br> 
                <img v-bind:src="item.imageURL" alt = "noimg"> <br> 
        
                <PageCounter v-bind:item1 = "item" v-on:counter="onCounter"></PageCounter>
            
                </p>
            </li>
        </ul>
    </p>
    <p style="text-align: left; padding: 70px; float: left;"> Menu:
    <PageBasket v-bind:itemsSelected = "itemsSelected" v-bind:items = "items" v-bind:itemNames = "itemNames"></PageBasket>
    </p>
    </div>
</template>

<script>

import QuantityCounter from "./QuantityCounter.vue"
import Basket from "./Basket.vue"
import database from "./firebase.js"

export default {
    name: "PageContent",

    data() {
        return {
            itemsSelected: [],
            items: [],
            itemNames:[],
        }
    },
    
    props: {

    },

    components: {
        PageCounter: QuantityCounter,
        PageBasket: Basket
    },

    created: function() {
        this.fetchItems();
    },

    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);

            } else {

                var boo = false
    
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item.name === item_name && count > 0) {
                        var newArray = []
                        for (let i = 0; i < this.itemsSelected.length; i++) {
                            if (this.itemsSelected[i][0] != item_name) {
                                newArray.push(this.itemsSelected[i]);
                            }
                            else {
                                newArray.push([item.name, count, item.price]);
                            }
                        }
                        this.itemsSelected = newArray;

                        boo = true;
                    }

                    // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                    else if (item.name === item_name && count == 0) {
                        this.itemsSelected.$delete(this.itemsSelected, i);
                        boo = true;
                    }
                    

                }         

                if (boo == false) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
                

            }

        },

        fetchItems: function() {
            database.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.items.push(doc.data());
                    this.itemNames.push(doc.data().name);
                 });
            });
        }
    }
}
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
.ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
.li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>