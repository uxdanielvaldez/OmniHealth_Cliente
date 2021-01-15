<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <div class="container" style="backgroung-color:#fff; border-radius:10px;">
            <full-calendar :events="fcEvents" locale="en"></full-calendar>
        </div>
    </div>
</template>

<script>
    var dataCalendar = [

]
import navbar from '../components/navbar'
import box from '../components/box_calendar'
import axios from 'axios'
export default {
  data () {
	return {
    fcEvents : dataCalendar,
    data: []
	}
  },
  components : {
    'full-calendar': require('vue-fullcalendar'),
    navbar,
    box
  },
  mounted() {
    this.viewCalendar()
    console.log(this.data)
  },
  methods: {
    viewCalendar() {
      axios
      .get('https://api.omnihealth.com.do/api/calendar')
      .then(res => {
        this.data = res.data
        console.log(res.data)
        
      })
    }
  }
}
</script>

<style>
    
</style>