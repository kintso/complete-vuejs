// The use of esm-bundler is apparently specific
import * as Vue from 'vue/dist/vue.esm-bundler.js'

// Num is a component
const Num = {
    // Properties
    props: ['number'],
    // View ?
    // Bind the click event to
    template: `
        <button
            v-bind:class="getClass(number)"
            v-on:click="click"
        >
            {{ number }}
        </button>
    `,
    // Methods
    methods : {
        isEven(number){
            return number % 2 === 0
        },
        getClass(number) {
            return this.isEven(number) ? 'blue' : 'red'
        },
        click() {
            // Send an event to the parent
            this.$emit('chosen', this.number)
        }
    }
}

// The main application
const app = Vue.createApp({
    // List the children components
    components: {
        Num
    },
    // View
    template: `
        <h1>Hello {{ msg }}</h1>
        <!-- Binding on the item -->
        <button v-on:click="increment">Increment</button> 

        <p>{{ count }}</p>

        <!-- Two way binding -->
        <input
            type="checkbox" 
            v-model="value"
            value="a"
        />
        <input
        type="checkbox" 
        v-model="value"
        value="b"
        />

        {{ value }}

        <div class="red">
            {{ error }}
        </div>

        <!-- Call the Num component (no case sensitive in HTML) -->
        <num
            v-for="number in numbers"
            v-bind:number="number" 
            v-on:chosen="addNumber"
        /> 

        <hr />

        <num
            v-for="number in numberHistory"
            v-bind:number="number" 
        /> 
    `,
    // Model ? as in M in MVC
    data() {
        return {
            msg: 'world',
            count: 0,
            numbers: [1,2,3,4,5,6,7,8,9,10],
            numberHistory: [],
            value: ['a', 'b'],
        }
    },
    // Computed properties like in object oriented programming
    computed: {
        // Filter the numbers array to only retrive even numbers
        evenList() {
            return this.numbers.filter(num => this.isEven(num))
        },
        error() {
            if (this.value.length < 5) {
                return 'Must be greater then 5.'
            }
        }
    },

    methods: {
        increment() {
            this.count += 1
        },
        addNumber(payload) {
            this.numberHistory.push(payload)
        }
    }

})

// Bind the Vue app to the div ?
app.mount('#app')