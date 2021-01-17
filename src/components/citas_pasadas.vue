<template>
    <div>
        <div class="container">
            <div class="row">
                
                <div class="card" style="width: 15rem;" v-for="(item) in data" v-bind:key="item._id">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fas fa-notes-medical"></i> {{ item.nombre }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted"><i class="fas fa-comment-medical" ></i> {{ item.motivo }}</h6>
                        <p class="card-text"><i class="far fa-calendar-alt"></i> {{ item.fecha }}  <i class="far fa-clock"></i> {{ item.hora }}</p>
                        <!-- <a class="card-link"><button class="btn btn-success" @click="goMeeting(item.meeting)"><i class="fas fa-check"></i> Iniciar Consulta</button></a>
                        <a href="#" class="card-link"><i class="far fa-times-circle cancel"></i></a> -->
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
moment.locale('es-do')
export default {
    data() {
        return {
            data: [],
        }
    },

    mounted() {
        axios
        .get('https://api.omnihealth.com.do/api/citas', {
            params: {
                estado: false,
                user_creation: localStorage.getItem("username")
            }
        })
        .then(res => {
            console.log(res.data)
            this.data = res.data
        })
    },
    
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