<template>
    <div>
        <navbar />
        <br>
        <box />
        <br>
        <crear />
    </div>
</template>

<script>
import navbar from '../components/navbar'
import box from '../components/box_crear'
import crear from '../components/crearpaciente'
export default {
    components: {
        navbar,
        box,
        crear
    }
}
</script>