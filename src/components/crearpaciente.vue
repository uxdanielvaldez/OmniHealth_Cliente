<template>
    <div>
        <div class="container boxCrear">
            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="identificacion" placeholder="Identificación">
                </div>

            </div>
            <br>
            <div class="form-group row">

                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="nombre" placeholder="Nombre">
                </div>
                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="apellido" placeholder="Apellido">
                </div>

            </div>
            <br>
            <div class="form-group row">

                <div class="col-6">
                    <input type="date" class="form-control txtbox" v-model="fechaDeNacimiento" placeholder="Fecha De Nacimiento">
                </div>
                <div class="col-6">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1">Genero</span>
                        </div>
                        <select class="form-control" v-model="genero">
                            <option disabled selected hidden>Seleccionar</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="direccion" placeholder="Dirección">
                </div>

            </div>

            <br>

            <div class="form-group row">
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="correoElectronico" placeholder="Ingrese Su Correo Electronico">
                </div>
                </div>
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-phone-alt"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="telefono" placeholder="Ingrese Su Telefono">
                </div>
                </div>
            </div>
        
        <div class="form-group row">
            <div class="col-4">
                <button class="btn-succes" @click="saveData"><i class="fas fa-check"></i> Guardar</button>
            </div>

        </div>

        </div>
    </div>
</template>

<script>
import axios from  'axios'
import Notiflix from 'notiflix'
import router from '../router/index'
import moment from 'moment'
moment.locale('es-do')
export default {
    data() {
        return {
            identificacion: '',
            nombre: '',
            apellido: '',
            fechaDeNacimiento: '',
            genero: '',
            correoElectronico: '',
            telefono: '',
            direccion: ''
        }
    },
    methods: {
        saveData() {
            const body = {
                identificacion: this.identificacion,
                nombre: this.nombre,
                apellido: this.apellido,
                fechaDeNacimiento: moment(this.fechaDeNacimiento).format('DD/MM/YYYY'),
                genero: this.genero,
                correoElectronico: this.correoElectronico,
                telefono: this.telefono,
                direccion: this.direccion,
                user_creation: localStorage.getItem("username")
            }
            axios
            .post(`https://api.omnihealth.com.do/api/paciente`, body)
            .then(res => {
                if(res.status == 200) {
                    Notiflix.Notify.Success("PACIENTE CREADO CORRECTAMENTE")
                    setTimeout( () => router.push('/'), 3000)
                }
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