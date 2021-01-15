<template>
    <div>
        <div class="container box">
            <h5>Pacientes</h5>
            <h4>Bienvenido a OmniHealth</h4>
            <button class="btn btn-success" @click="goCrear"> + Crear Paciente</button>
            <!-- <input type="text" placeholder="Buscar ..."> -->
        </div>
    </div>
</template>

<script>
import router from '../router/index'
export default {
    methods: {
        goCrear() {
            router.push('/crearpaciente')
        }
    }
}
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

    body {
        background-color: rgb(228, 226, 226);
    }

    .box {
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

    .box > input {
        border: none;
        border-radius: 20px;
        background-color: #d8d8d8bb;
        padding-left: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
        font-family: 'Roboto', sans-serif;
        font-weight: 300;
    }

    .box > input:focus {
        outline: none;
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

    @media screen and (max-width: 1000px) {
    .box > button {
        float:left;
        margin-top: 0px;
    }  

    .box > input {
        margin-top: 10px;
    }

    }
</style>