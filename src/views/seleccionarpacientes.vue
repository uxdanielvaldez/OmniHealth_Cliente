<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <tablepaciente />
    </div>
</template>

<script>
import navbar from '../components/navbar'
import box from '../components/box_seleccionarpacientes'
import tablepaciente from '../components/table_paciente'
export default {
    components: {
        navbar,
        box,
        tablepaciente
    }
}
</script>