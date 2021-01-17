<template>
    <div>
        <navbar />
        <br>
        
        <div class="container">
            <button class="btn btn-danger" @click="changeState">Cerrar Cita</button>
            <br>
            <p>
                User: admin,
                Password: Omnihealth123
            </p>
            <br>
            <div id="meeting"></div>
            <textarea class="form-control" v-model="notas" placeholder="Notas"></textarea>
            <br>
            <div class="btn btn-success" @click="saveNotas">Guardar</div>
            <br>
            <br>
        </div>

    </div>
</template>

<script>
import navbar from  '../components/navbar'
import axios from 'axios'
import Notiflix from 'notiflix'
import router from '../router/index'
export default {
    data() {
        return {
            notas: ''
        }
    },
    components: {
        navbar
    },
    mounted() {
        const options = {
            parentNode: document.querySelector('#meeting'),
            roomName: this.$route.params.idmeeting,
            height: 900,
            interfaceConfigOverwrite: {
                filmStripOnly: true
            }
        }
        meetAPI = new JitsiMeetExternalAPI("consulta.omnihealth.com.do", options);
    },
    methods: {
        saveNotas() {
            const body = {
                notas: this.notas
            }
            axios
            .put(`https://api.omnihealth.com.do/api/citas/${this.$route.params.id}`, body)
            .then(res => {
                if(res.status == 200) {
                    Notiflix.Notify.Success("NOTAS GUARDADAS")
                }
            })
        },
        changeState() {
            const body = {
                estado: false
            }
            axios
            .put(`https://api.omnihealth.com.do/api/citas/${this.$route.params.id}`, body)
            .then(res => {
                if(res.status == 200) {
                    
                    setTimeout(() => router.push('/'),2000)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>

<style>
    #meeting {
        text-align: center;
    }
    
</style>