<template>
    <div>
        <navbar/>
        <br>
        <configuracion />
    </div>
</template>

<script>
import navbar from '../components/navbar'
import configuracion from '../components/infogeneral2.vue'
import axios from 'axios'
export default {
    components: {
        navbar,
        configuracion
    }
}
</script>

<style>
    body {
        background-color: rgb(228, 226, 226);
    }
</style>