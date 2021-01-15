<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="card" style="width: 15rem;" v-for="(item) in data" v-bind:key="item">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-notes-medical"></i> {{ item.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-comment-medical" ></i> {{ item.motivo }}</h6>
                        <p class="card-text"><i class="far fa-calendar-alt"></i> {{ item.fecha }}  <i class="far fa-clock"></i> {{ item.hora }}</p>
                        <a class="card-link"><button class="btn btn-success" @click="goMeeting(item.meeting, item._id)"><i class="fas fa-check"></i> Iniciar Consulta</button></a>
                        <a class="card-link" @click="changeState(item._id)"><i class="far fa-times-circle cancel"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router/index'
import moment from 'moment'
import Notiflix from 'notiflix'
moment.locale('es-do')
export default {
    data() {
        return {
            data: [],
            fechaActual: ''
        }
    },

    mounted() {
        this.fechaActual = moment(new Date()).add(1, 'd').format('ll')
        console.log(this.fechaActual)
        axios
        .get('https://api.omnihealth.com.do/api/citas', {
            params: {
                fecha: this.fechaActual,
                estado: true,
                user_creation: localStorage.getItem("username")
            }
        })
        .then(res => {
            console.log(res.data)
            this.data = res.data
        })
    },
    methods: {
        goMeeting(idmeeting,id) {
            router.push(`/meeting/${idmeeting}/${id}`)
            console.log(idmeeting)
        },
        changeState(id) {
            const body = {
                estado: false
            }
            axios
            .put(`https://api.omnihealth.com.do/api/citas/${id}`, body)
            .then(res => {
                if(res.status == 200) {
                    Notiflix.Notify.Success("CITA CERRADA CORRECTAMENTE")
                    setTimeout(() => location.reload(),3000)
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
    .card-text {
        font-size: 12px;
    }

    .btn {
        background-color: #40ca63;
        color: #ffffff;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        font-size: 12px;
        border-radius: 20px;
        border: none;
    }

    .cancel {
        font-size: 19px;
        color: #fd5b5b;
    }

    .card-subtitle {
        font-size: 12px;
    }
</style>