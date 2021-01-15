<template>
    <div>
        <div class="container boxCrear">
            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="data.identificacion" placeholder="Identificación">
                </div>

            </div>
            <br>
            <div class="form-group row">

                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="data.nombre" placeholder="Nombre">
                </div>
                <div class="col-6">
                    <input type="text" class="form-control txtbox" v-model="data.apellido" placeholder="Apellido">
                </div>

            </div>
            <br>
            <div class="form-group row">

                <!-- <div class="col-6">
                    <input type="date" class="form-control txtbox" v-model="data.fechaDeNacimiento" placeholder="Fecha De Nacimiento">
                </div> -->
                <div class="col-12">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1">Genero</span>
                        </div>
                        <select class="form-control" v-model="data.genero">
                            <option disabled selected hidden>Seleccionar</option>
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                    </div>
                </div>

            </div>

            <div class="form-group row">

                <div class="col-12">
                    <input type="text" class="form-control txtbox" v-model="data.direccion" placeholder="Dirección">
                </div>

            </div>

            <br>

            <div class="form-group row">
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-envelope"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="data.correoElectronico" placeholder="Ingrese Su Correo Electronico">
                </div>
                </div>
                <div class="col-6">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text txtbox" style="font-family: 'Roboto', sans-serif;font-size: 18px;font-weight: 300;" id="basic-addon1"><i class="fas fa-phone-alt"></i></span>
                    </div>
                    <input type="text" class="form-control" v-model="data.telefono" placeholder="Ingrese Su Telefono">
                </div>
                </div>
            </div>

            <br>

            <div class="container">
                <h1 class="txt_title">Historial De Consultas</h1>
                <hr>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Motivo</th>
                                <th scope="col">Notas</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in info" :key="item._id">
                                <th scope="row">{{ index++ }}</th>
                                <td>{{ item.fecha }}</td>
                                <td>{{ item.motivo }}</td>
                                <td>{{ item.notas }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        <br>
        <div class="form-group row">
            <div class="col-4">
                <button class="btn-succes" @click="saveData"><i class="fas fa-check"></i> Guardar</button>
            </div>

        </div>

        </div>
        <br>
    </div>
</template>

<script>
import axios from  'axios'
import Notiflix from 'notiflix'
export default {
    data() {
        return {
            data: {
            identificacion: '',
            nombre: '',
            apellido: '',
            fechaDeNacimiento: '',
            genero: '',
            correoElectronico: '',
            telefono: '',
            direccion: ''
            },
            info: []
        }
    },
    mounted() {
        this.viewData()
        this.viewDataHistorial()
    },
    methods: {
        saveData() {
            const body = {
                identificacion: this.data.identificacion,
                nombre: this.data.nombre,
                apellido: this.data.apellido,
                fechaDeNacimiento: this.data.fechaDeNacimiento,
                genero: this.data.genero,
                correoElectronico: this.data.correoElectronico,
                telefono: this.data.telefono,
                direccion: this.data.direccion,
                user_creation: localStorage.getItem("username")
            }
            axios
            .put(`https://api.omnihealth.com.do/api/paciente/${this.$route.params.id}`, body)
            .then(res => {
                if(res.status == 200) {
                    Notiflix.Notify.Success("PACIENTE ACTUALIZADO CORRECTAMENTE")
                }
            })
        },
        viewData() {
            axios
            .get(`https://api.omnihealth.com.do/api/paciente/${this.$route.params.id}`)
            .then(res => {
                this.data = res.data
            })
        },
        viewDataHistorial() {
            axios
            .get(`https://api.omnihealth.com.do/api/citas/?identificacion=${this.$route.params.identificacion}`)
            .then(res => {
                this.info = res.data
            })
        }
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');
    .boxCrear {
        width: 95%;
        background-color: #ffffff;
        padding-top: 30px;
        padding-bottom: 30px;
        border-radius: 5px;
    }

    .txt_title {
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 15px;
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