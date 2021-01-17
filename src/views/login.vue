<template>
    <div>
        <div class="bg1"></div>
        <div class="bg2"></div>
        <div class="container login-box">
            <h1>OmniHealth</h1>
            <h6>Acceda a su cuenta</h6>
            <p>Entre para acceder a su cuenta</p>
                <div class="form">
                    <div class="input-container">
                        <input type="text" style="text-transform:lowercase;" v-model="username" @change="validateMail" required=""/>
                        <label>Correo Electronico</label>		
                    </div>
                    
                    <div class="input-container">		
                        <input type="password" v-model="password" required=""/>
                        <label>Contraseña</label>
                    </div>
                </div>
            <!-- <h4>Olvidó su Contraseña?</h4> -->
            <br>
            <button @click="login">Ingresar</button>
            <br>
            <h3>No tienes cuenta? <a style="color:rgb(50, 96, 250, 0.856);" @click="goRegister">Registrarse Aquí</a></h3>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import router from '../router/index'
const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default {
    data() {
        return {
            username: '',
            password: '',
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            errorMail: null,
            validate: null,
            validate2: null
        }
    },
    mounted() {
                if (localStorage.getItem("reloaded")) {
        localStorage.removeItem("reloaded");
        } else {
        localStorage.setItem("reloaded", "1");
        location.reload();
        }

    if(localStorage.getItem("accessToken")) {
        router.push("/")
      } else {
        router.push('/login')
      }

    if(localStorage.getItem("estadoUser") == 'INACTIVO') {
        localStorage.clear()
        Notiflix.Notify.Failure("USUARIO NO AUTORIZADO")
        this.validUser()
      } else {
        this.validUser()
      }

    },
    methods: {
        validateMail() {
        if (emailRe.test(this.username)) {
        this.validate = true
      } else {
        this.validate = false
        Notiflix.Notify.Failure("Por favor ingrese un formato de correo valido")
      }
        },
        login() {
        if(this.username == null || this.username == '') {
           Notiflix.Notify.Failure("Por favor ingrese un correo electronico")
           this.validate2 = false
        } else {
            this.validate2 = true
        }
        if(this.validate == false || this.validate2 == false) {
            Notiflix.Notify,Failure("Por favor verifique su información")
        } else  {
            const body = {
                username: this.username,
                password: this.password
            }
            axios
            .post('https://api.omnihealth.com.do/api/login', body)
            .then(res => {
                if(res.data.status == 200) {
                    localStorage.setItem("accessToken", res.data.jwt)
                    localStorage.setItem("userId", res.data.id)
                    localStorage.setItem("username", res.data.username)
                    localStorage.setItem("estadoUser", res.data.estado)
                    router.push('/')
                } else {
                    Notiflix.Notify.Failure(`${res.data.error}`)
                }
            })
            .catch((err) => {
                Notiflix.Notify.Failure(`SE HA PRESENTADO EL SIGUIENTE ERROR: ${err}`)
            })
        }
        },
        goRegister() {
            router.push('/register')
            localStorage.clear()
        },
            validUser() {
      if(localStorage.getItem("accessToken")) {
          router.push("/")
      } else {
        router.push('/login')
      }
    }
    }
}
</script>

<style>

    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

    .login-box {
        -webkit-box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);
        -moz-box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);
        box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);

        margin-top: -730px;
        padding-top: 30px;
        padding-bottom: 30px;
        width: 30%;

       border-radius: 5px;
       z-index: 5;
       overflow: hidden;
    }

    .bg1 {
        background-image: url('../assets/b1.png');
        background-position:right;
        background-size: 30%;
        background-repeat: no-repeat;
        width: 100%;
        height: 500px;
        overflow: hidden;
        margin-top: -20px;
    }
    .bg2 {
        background-image: url('../assets/b2.png');
        background-position: left;
        background-size: 30%;
        background-repeat: no-repeat;
        width: 100%;
        height: 500px;
        margin-top: -150px;
        overflow: hidden;
    }

    .login-box > h1 {
        text-align: center;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        font-size: 50px;
    }

    .login-box > h6 {
        margin-top: 30px;
        margin-left: 30px;

        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 15px;

        color: rgb(53, 53, 53);
    }

    .login-box > p {
        margin-top: 5px;
        margin-left: 30px;

        font-family: 'Roboto', sans-serif;
        font-weight: 100;
        font-size: 15px;

        color: rgb(53, 53, 53);
    }

    .login-box > h4 {
        font-size: 12px;
        font-weight: 200;
        float: right;
        margin-right: 30px;
        color: rgb(50, 96, 250, 0.856);
    }

    .login-box > button {
        display: block;
        margin-left: auto;
        margin-right: auto;
        margin-top: 30px;
        border: none;
        padding-top: 12px;
        padding-bottom: 12px;
        padding-left: 25px;
        padding-right: 25px;
        border-radius: 5px;
        background-color: rgb(50, 96, 250, 0.856);
        color: #ffffff;
        font-family: 'Roboto', sans-serif;
        font-weight: 200;
    }

    .login-box > h3 {
        font-size: 12px;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
        text-align: center;
    }



    .form {
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 20px;
}


.input-container{
	position:relative;
	margin-bottom:25px;
    color: #555555;
}

.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:14px;
	color:rgba(65, 65, 65, 0.63);	
	transition: all 0.5s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid rgba(109, 109, 109, 0.466);  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
  color:#000;
}
.input-container input:focus{ 
 border:none;	
 outline:none;
 border-bottom:2px solid rgba(50, 97, 250, 0.856);	
}

.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-12px;
	font-size:12px;
    color: rgb(50, 96, 250, 0.856);
	
}

@media only screen and (max-width: 1000px) {
    .login-box {
        -webkit-box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);
        -moz-box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);
        box-shadow: 1px 10px 45px -15px rgba(0,0,0,0.60);

        margin-top: 10%;
        padding-top: 30px;
        padding-bottom: 30px;
        width: 90%;

        border-radius: 5px;
    }

    .bg1 {
        display: none;
    }
    .bg2 {
        display: none;
    }

}
</style>