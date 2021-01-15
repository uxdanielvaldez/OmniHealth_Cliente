<template>
    <div>
        <div class="container box">
            <div class="row">
                <div class="col-2 btn1" style="display:block; margin-left:auto; ">
                    <h1>INFORMACIÓN GENERAL</h1>
                </div>
                <div class="col-2 btn2" style="display:block; margin-right:auto;">
                    <h1 @click="goCuenta">CUENTA</h1>
                </div>
            </div>
        </div>
        <br>
        <div class="container box-2">
            <div class="form-group row">
                <div class="col-6">
                    <input class="form-control ip" v-model="data.nombre" placeholder="Nombre" type="text">
                </div>
                <div class="col-6">
                    <input class="form-control ip" v-model="data.apellido" placeholder="Apellido" type="text">
                </div>
            </div>
            <br>
            <div class="form-group row">
                <div class="col-6">
                    <input class="form-control ip" v-model="data.cedula" placeholder="Identificación" type="text">
                </div>
                <div class="col-6">
                    <input class="form-control ip" v-model="data.genero" placeholder="Genero" type="text">
                </div>
            </div>
            <br>
            <div class="form-group row">
                <div class="col-12">
                    <input class="form-control ip" v-model="data.direccion" placeholder="Dirección" type="text">
                </div>
            </div>
            <br>
            <div class="form-group row">
                <div class="col-6">
                    <input class="form-control ip" v-model="data.codigoPostal" placeholder="Codigo Postal" type="text">
                </div>
                <div class="col-6">
                    <input class="form-control ip" v-model="data.especialidad" placeholder="Especialidad" type="text">
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
import router from '../router/index'
import Notiflix from 'notiflix'
export default {
    data() {
        return {
            data: {
                nombre: '',
                apellido: '',
                cedula: '',
                genero: '',
                direccion: '',
                codigoPostal: '',
                especialidad: ''
            }
        }
    },
    mounted() {
        this.userInfo()
    },
    methods: {
    userInfo() {
        axios
        .get(`https://api.omnihealth.com.do/api/${localStorage.getItem("userId")}/user/info`)
        .then(res => {
          console.log(res)
          this.data = res.data
        })
      },
      saveData() {
          const body = {
              nombre: this.data.nombre,
              apellido: this.data.apellido,
              cedula: this.data.cedula,
              genero: this.data.genero,
              direccion: this.data.direccion,
              codigoPostal: this.data.codigoPostal,
              especialidad: this.data.especialidad
          }
          axios
          .put(`https://api.omnihealth.com.do/api/user/${localStorage.getItem("userId")}`, body)
          .then(res => {
              if(res.status == 200) {
                  Notiflix.Notify.Success("INFORMACIÓN ACTUALIZADA CORRECTAMENTE")
                  setTimeout(() => location.reload(), 3000)
              }
          }) .catch ((err) => {
              Notiflix.Notify.Failure(`SE HA PRESENTADO EL SIGUIENTE ERROR: ${err}`)
          })
      },
      goCuenta() {
          router.push('/cuenta')
      }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

    body {
        background-color: rgb(228, 226, 226);
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

    .col-2 > h1 {
        font-size: 15px;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
    }

    .btn2 {
        color: #aaa9a9;
        cursor: pointer;
        transition: .5s all;
        text-align: center;
    }

    .btn2:hover {
        color: rgb(45, 138, 224);
        transition: .5s all;
    }

    .btn1 {
        border-bottom: 4px solid rgb(45, 138, 224);
        text-align: center;
        cursor: pointer;
    }

    .btn-cancel {
        border: none;
        width: 40%;
        margin-left: -190px;
        height: 4vh;
        border-radius: 100px;
        background-color: #f35454;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        color: #ffffff;
    }

    .ip {
        height: 7vh;
    }

    .box {
        width: 98%;
        background-color: #ffffff;
        font-family: 'Roboto', sans-serif;
        padding-top: 15px;
        /* padding-bottom: 15px; */
        padding-left: 30px;
        border-radius: 5px;
    }
    
    .box-2 {
        width: 98%;
        background-color: #ffffff;
        font-family: 'Roboto', sans-serif;
        padding-top: 15px;
        padding-bottom: 15px;
        padding-left: 30px;
        border-radius: 5px;
    }

    .box > h5 {
        font-weight: 500;
        font-size: 14px;
        color: #5F89FA;
    }

    .box > h4 {
        font-weight: 100;
        font-size: 14px;
    }

    .box > button {
        float:right;
        margin-top: -40px;
    }

    .btn {
        background-color: #40ca63;
        color: #ffffff;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        font-size: 12px;
        border-radius: 20px;
    }

    @media screen and (max-width: 1000px) {
    .box > button {
        float:left;
        margin-top: 0px;
    }  

    .btn-succes {
        width: 130%;
        margin-right: 5px;
    }

    .btn-cancel {
        width: 130%;
        margin-left: 5px;
    }

    .btn1 {
        margin-right: 90px;
        text-align: center;
    }

    }
</style>