<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <agendar />
    </div>
</template>

<script>
import navbar from '../components/navbar'
import box from '../components/box_agendar'
import agendar from '../components/agendarcita'
export default {
    components: {
        navbar,
        box,
        agendar
    }
}
</script>