<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <tablepacientes />
    </div>
</template>

<script>
import navbar from '../components/navbar'
import box from '../components/box_pacientes'
import tablepacientes from '../components/table_pacientes'
export default {
    components: {
        navbar,
        box,
        tablepacientes
    }
}
</script>