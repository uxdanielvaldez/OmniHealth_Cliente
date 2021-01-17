<template>
    <div>
        <div class="container boxCrear">
            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="data.identificacion" placeholder="Identificación" disabled>
                </div>

            </div>
            <br>
            <div class="form-group row">

                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="data.nombre" placeholder="Nombre" disabled>
                </div>
                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="data.apellido" placeholder="Apellido" disabled>
                </div>

            </div>
            <br>
            <div class="form-group row">

                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="data.fechaDeNacimiento" placeholder="Fecha De Nacimiento" disabled>
                </div>
                <div class="col-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1">Genero</span>
                        </div>
                        <select class="form-control" v-model="data.genero" disabled>
                            <option disabled selected hidden>Seleccionar</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="data.direccion" placeholder="Dirección" disabled>
                </div>

            </div>

            <br>

            <div class="form-group row">
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="data.correoElectronico" placeholder="Ingrese Su Correo Electronico" disabled>
                </div>
                </div>
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-phone-alt"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="data.telefono" placeholder="Ingrese Su Telefono" disabled>
                </div>
                </div>
            </div>
        <br>
        <div class="form-group row">
            <div class="col-6">
                <input type="date" class="form-control txtbox" v-model="data.fecha" placeholder="Fecha de la Consulta">
            </div>
            <div class="col-6">
                <input type="time" class="form-control txtbox" v-model="data.hora" placeholder="Hora de la Consulta">
            </div>
        </div>
        <br>
        <div class="form-group">
            <div class="col-12">
                <textarea class="form-control" v-model="data.motivo" placeholder="Motivo Consulta"></textarea>
            </div>
        </div>
        <br>
        <div class="form-group row">
            <div class="col-4">
                <button class="btn-succes" @click="saveData"><i class="fas fa-check"></i> Guardar</button>
            </div>

        </div>



        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import router from '../router/index'
import moment from 'moment'
moment.locale('es-do')
export default {
    data() {
        return {
            data: {
                identificacion: '',
                nombre: '',
                apellido: '',
                fechaDeNacimiento: '',
                correoElectronico: '',
                genero: '',
                direccion: '',
                telefono: '',
                fecha: '',
                hora: '',
                motivo: '',
                codeMeeting: ''
            }
        }
    },
    mounted() {

            function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
            }

            console.log(makeid(20))
            this.codeMeeting = makeid(30)
        
        this.viewUser()
        console.log(this.$route.params._id)
    },
    methods: {
        saveData() {
            console.log(moment(this.data.fecha).format('ll'))
            const body = {
                nombre: this.data.nombre,
                apellido: this.data.apellido,
                fecha: moment(this.data.fecha).format('ll'),
                hora: this.data.hora,
                motivo: this.data.motivo,
                meeting: this.codeMeeting,
                estado: true,
                identificacion: this.data.identificacion,
                user_creation: localStorage.getItem("username")
            }
            axios
            .post(`https://api.omnihealth.com.do/api/cita/${this.$route.params._id}`, body)
            .then(res => {
                Notiflix.Notify.Success("CITA CREADA CORRECTAMENTE")
                setTimeout( () => router.push('/'), 3000)
                this.agendarCita()
            })
            
        },
        agendarCita() {
            const body = {
                title: this.data.nombre,
                start: moment(this.data.fecha).format('YYYY/MM/DD'),
                end: moment(this.data.fecha).format('YYYY/MM/DD'),
                user_creation: localStorage.getItem("username")
            }
            axios
            .post('http://localhost:3000/api/calendar', body)
            .then(res => {
                console.log('AGENDADO')
            })
        },
        viewUser() {
            axios
            .get(`https://api.omnihealth.com.do/api/paciente/${this.$route.params._id}`)
            .then(res => {
                this.data = res.data
            })
        }
    }
}
</script>

<style>
    .boxCrear {
        width: 95%;
        background-color: #ffffff;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 5px;
    }

    .txtbox {
        height: 50px;
    }

    .btn {
        border: none;
    }

    .btn:focus {
        outline: none;
    }



    .btn-succes {
        border: none;
        width: 40%;
        height: 4vh;
        border-radius: 100px;
        background-color: #3fd37d;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        color: #ffffff;
    }

    .btn-cancel {
        border: none;
        width: 40%;
        height: 4vh;
        margin-left: -190px;
        border-radius: 100px;
        background-color: #f35454;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        color: #ffffff;
    }

    @media screen and (max-width: 1000px) {

    .btn-succes {
        width: 130%;
        margin-right: 5px;
    }

    .btn-cancel {
        width: 130%;
        margin-left: 5px;
    }

    .btn4 {
        margin-right: 90px;
        text-align: center;
    }

    }

</style>