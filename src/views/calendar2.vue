<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <div class="container" style="backgroung-color:#fff; border-radius:10px;">
                    <full-calendar 
            :events="calendarEvents"
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
  data () {
	return {
    calendarEvents: [{
                    events(start, end, callback) {
                        axios.get('http://localhost:3000/api/calendar').then(res => {
                            callback(res.data)
                            console.log(res.data)
                        })
                    },
                    color: 'blue',
                    textColor: 'white',
                }]
	}
  },
  components : {
    'full-calendar': require('vue-fullcalendar'),
    navbar,
    box
  },
}
</script>

<style>
    
</style>