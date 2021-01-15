<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <editar />
    </div>
</template>

<script>
import navbar from  '../components/navbar'
import box from '../components/box_editar'
import editar from '../components/editarpaciente'
export default {
    components: {
        navbar,
        box,
        editar
    }
}
</script>