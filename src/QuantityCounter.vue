<template>
<div id ="app">
    <button v-on:click="minus"> - </button> {{ counter }} <button v-on:click="plus"> + </button>
</div>
</template>

<script>
export default {
    name:"QuantityCounter",
    
    data() {
        return {
            counter: 0
        }
    },

    methods: {
        minus: function() {
            if (this.counter > 0) {
                this.counter-=1;
            }
            this.$emit('counter', this.item1, this.counter);
        },
        plus: function() {
            if (this.counter < 10) {
                this.counter+=1;
            }
            this.$emit('counter', this.item1, this.counter);
        }
    },

    props: {
        item1: {
            type: Object
        }
    }
}
</script>

<style>
    button {
        border-radius: 8px; 
        background-color: #ffb3b3;
    }
</style>