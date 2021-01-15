<template>
    <div>
        <div class="container box">
            <div class="row">
                <div class="col-2 btn4" style="display:block; margin-left:auto; ">
                    <h1 @click="goConfiguracion">INFORMACIÓN GENERAL</h1>
                </div>
                <div class="col-2 btn3" style="display:block; margin-right:auto;">
                    <h1>CUENTA</h1>
                </div>
            </div>
        </div>
        <br>
        <div class="container box-2">
            <div class="form-group row">
                <div class="col-6">
                    <input class="form-control ip" v-model="data.username" placeholder="Correo Electronico" type="text" disabled>
                </div>
                <div class="col-6">
                    <input class="form-control ip" v-model="data.confirm_username" placeholder="Confirmar Correo Electronico" type="text">
                </div>
            </div>
            <br>
            <div class="form-group row">
                <div class="col-6">
                    <input class="form-control ip" v-model="data.password_1" placeholder="Contraseña" type="password">
                </div>
                <div class="col-6">
                    <input class="form-control ip" v-model="data.password_confirmation" placeholder="Confirmar Contraseña" type="password">
                </div>
            </div>
            <br>
            <div class="form-group row">
                <div class="col-4">
                    <button class="btn-succes" @click="sendData"><i class="fas fa-check"></i> Guardar</button>
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
                username: '',
                confirm_username: '',
                password_1: '',
                password_confirmation: '',
            },
            validation1: false,
            validation2: false,
            validation3: false,
            validation4: false
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
      goConfiguracion() {
          router.push('/configuracion')
      },
      emailValidation() {
          if(this.data.username !== this.data.confirm_username) {
              Notiflix.Notify.Failure("ERROR")
          }
      },
      sendData() {

          if(this.data.confirm_username == '') {
              Notiflix.Notify.Failure("DEBES CONFIRMAR EL USUARIO")
              this.validation1 = true
          } else {
              this.validation1 = false
          }

          if(this.data.confirm_username !== this.data.username) {
              Notiflix.Notify.Failure("DEBES INSERTAR EL CORREO CORRACTAMENTE")
              this.validation2 = true
          } else {
              this.validation2 = false
          }

          if(this.data.password_confirmation !== this.data.password_1) {
              Notiflix.Notify.Failure("LAS CONTRASENAS NO COINCIDEN")
              this.validation3 = true
          } else {
              this.validation3 = false
          }

          if(this.validation1 == true || this.validation2 == true || this.validation3 == true || this.data.confirm_username == '') {
              Notiflix.Notify.Failure("POSEE ERRORES EN EL PROCESO, POR FAVOR VERIFICAR TODOS LOS DATOS SUMINISTRADOS")
          } else {
            const body = {
              newpassword: this.data.password_1,
              token: localStorage.getItem("accessToken"),
              username: localStorage.getItem("username")
          }
          axios
          .post(`https://api.omnihealth.com.do/api/change-password`, body)
          .then(res => {
              if(res.status == 200) {
                  Notiflix.Notify.Success("Datos actualizados, inicie sesión nuevamente")
                  localStorage.clear()
                  setTimeout(() => location.reload(), 3000)
              } else {
                  Notiflix.Notify.Failure(`${res.data.error}`)
              }
          })

          }


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

    .btn4 {
        color: #aaa9a9;
        cursor: pointer;
        transition: .5s all;
        text-align: center;
    }

    .btn4:hover {
        color: rgb(45, 138, 224);
        transition: .5s all;
    }

    .btn3 {
        border-bottom: 4px solid rgb(45, 138, 224);
        text-align: center;
        cursor: pointer;
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

    .btn4 {
        margin-right: 90px;
        text-align: center;
    }

    }
</style>