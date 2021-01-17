<template>
    <router-view/>
</template>

<script>
import router from './router/index'
export default {
    mounted() {
        if(localStorage.getItem("estadoUser") == 'INACTIVO') {
        localStorage.clear()
        Notiflix.Notify.Failure("USUARIO NO AUTORIZADO")
        this.validUser()
      } else {
        this.validUser()
      }
    },
    methods: {
    validUser() {
      if(localStorage.getItem("accessToken")) {
  
      } else {
        router.push('/login')
      }
    }
    }
}
</script>

<style>

</style>
