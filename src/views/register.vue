<template>
    <div>
        <div class="container login-box">
            <h1>OmniHealth</h1>
            <h6>Registrar</h6>
            <p>Crea una nueva cuenta</p>
                <div class="form">
                    <div class="input-container">
                        <input type="text" v-model="nombre" required=""/>
                        <label>Nombre</label>		
                    </div>
                    <div class="input-container">
                        <input type="text" v-model="apellido" required=""/>
                        <label>Apellido</label>		
                    </div>
                    <div class="input-container">
                        <input type="text" v-model="identificacion" required=""/>
                        <label>Cedula o Pasaporte</label>		
                    </div>
                    <div class="input-container">
                        <input type="text" v-model="username" required=""/>
                        <label>Correo Electronico</label>		
                    </div>
                    <div class="input-container">
                        <input type="password" v-model="password" required=""/>
                        <label>Contraseña</label>		
                    </div>
                    <div class="input-container">		
                        <input type="password" v-model="password_confirmation" required=""/>
                        <label>Repetir Contraseña</label>
                    </div>
                </div>
            <!-- <h4>Olvidó su Contraseña?</h4> -->
            <button @click="registrar">Registrar</button>
            <br>
            <h3>Tienes una cuenta? <a style="color:rgb(50, 96, 250, 0.856);" @click="goLogin">Inicia Sesión</a></h3>
            <br>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Notiflix from 'notiflix'
import router from '../router/index'
export default {
    data() {
        return {
            nombre: '',
            apellido: '',
            identificacion: '',
            username: '',
            password: '',
            password_confirmation: ''
        }
    },
    methods: {
        registrar() {
            if(this.password !== this.password_confirmation) {
                Notiflix.Notify.Failure("CONTRASENA NO COINCIDE")
            } else {
            const body = {
                username: this.username,
                password: this.password,
                nombre: this.nombre,
                apellido: this.apellido,
                cedula: this.identificacion,
                rol: 'USUARIO',
                estado: 'ACTIVO'
            }
            axios
            .post('https://api.omnihealth.com.do/api/register', body)
            .then(res => {
                if(res.data.status == 200) {
                    Notiflix.Notify.Success("REGISTRO REALIZADO CORRECTAMENTE")
                    router.push('/login')
                    localStorage.clear()
                } else {
                    Notiflix.Notify.Failure(`${res.data.error}`)
                }
            })
            .catch((err) => {
                Notiflix.Notify.Failure(`SE HA PRESENTADO EL SIGUIENTE ERROR: ${err}`)
            })
            }
        },
        goLogin() {
            router.push('/login')
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

        margin-top: 7%;
        padding-top: 30px;
        padding-bottom: 30px;
        width: 30%;

        border-radius: 5px;
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
       width: 90%;
    }
}

    
</style>