<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <div class="container" style="backgroung-color:#fff; border-radius:10px;">
                    <full-calendar 
            :events="events"
            :header="{
                    left: 'prev, next today',
                    center: 'title',
                    right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek',
                }"
        >
        </full-calendar>
        </div>
    </div>
</template>

<script>

import navbar from '../components/navbar'
import box from '../components/box_calendar'
import axios from 'axios'
export default {
data(){
   return{
       events: [],
       dataapi:''
   }
},
  components : {
    'full-calendar': require('vue-fullcalendar'),
    navbar,
    box
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      axios
      .get(`http://localhost:3000/api/calendar?user_creation=${localStorage.getItem("username")}`)
      .then(res => {
        this.dataapi = res
        // for(let i = 0; i < this.dataapi.length; i++) {
        // var data = this.dataapi[i]
        // console.log(JSON.stringify(data))
        // console.log(data.title)
        // this.events = [
        //     {
        //         title: data.title,
        //         start: data.start,
        //         end: data.end
        //     }
        // ]

        // console.log(this.events)
        // }
        for (var i =0; i<this.dataapi.data.length; i++) {
            var data = this.dataapi.data[i];
            console.log(data.title)
        this.events = [
            {
                title: data.title,
                start: data.start,
                end: data.end
            }
        ]
        console.log(this.events)
        }

      })
    }
  }
}
</script>

<style>
    
</style>