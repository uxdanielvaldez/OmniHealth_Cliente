<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <cards />
        <br>
        <div class="container citas">
            <h1>Hoy</h1>
            <br>
            <citashoy />
            <br>
            <h1>Proximas</h1>
            <br>
            <citasproximas />
            <br>
            <h1>Pasadas</h1>
            <br>
            <citaspasadas />
        </div>
    </div>
</template>

<script>
import navbar from '../components/navbar'
import box from '../components/box_dashboard'
import citashoy from '../components/citas_hoy'
import citasproximas from '../components/citas_proximas'
import citaspasadas from '../components/citas_pasadas'
import cards from '../components/cards'
export default {
    components: {
        navbar,
        box,
        citashoy,
        citasproximas,
        citaspasadas,
        cards
    }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

.citas > h1 {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 15px;
}

</style>