<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-3 box1">
                <div class="container" style="background-color:#fff; padding-top:20px; padding-bottom:20px; border-radius:5px;">
                    <h4 class="subtitle_cancel">Citas</h4>
                    <h1 class="title_cancel" style="text-align:right;">{{ dataNumber }}</h1>
                </div>
                </div>
                <div class="col-3 box2">
                <div class="container" style="background-color:#fff; padding-top:20px; padding-bottom:20px; border-radius:5px;">
                    <h4 class="subtitle_cancel">Cancelado</h4>
                    <h1 class="title_cancel" style="text-align:right;">{{ dataCerradaNumber }}</h1>
                </div>
                </div>
                <div class="col-3 box3">
                <div class="container" style="background-color:#fff; padding-top:20px; padding-bottom:20px; border-radius:5px;">
                    <h4 class="subtitle_cancel">Total</h4>
                    <h1 class="title_cancel" style="text-align:right;">{{ dataNumber2 }}</h1>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            dataCerrada: [],
            dataCerradaNumber: [],
            dataNumber: [],
            dataNumber2: []
        }
    },
    mounted() {
        this.viewDataCerrada()
        this.viewConsultas()
        this.viewConsultasTotal()
    },
    methods: {
        viewDataCerrada() {
        axios
        .get('https://api.omnihealth.com.do/api/citas', {
            params: {
                estado: false,
                user_creation: localStorage.getItem("username")
            }
        })
        .then(res => {
            var numberElements = res.data.length
            console.log(numberElements)
            this.dataCerradaNumber = numberElements
            
        })
        },
        viewConsultas() {
        axios
        .get('https://api.omnihealth.com.do/api/citas', {
            params: {
                estado: true,
                user_creation: localStorage.getItem("username")
            }
        })
        .then(res => {
            var numberElements1 = res.data.length
            console.log(numberElements1)
            this.dataNumber = numberElements1
        })
        },
        viewConsultasTotal() {
        axios
        .get('https://api.omnihealth.com.do/api/citas', {
            params: {
                user_creation: localStorage.getItem("username")
            }
        })
        .then(res => {
            var numberElements2 = res.data.length
            console.log(numberElements2)
            this.dataNumber2 = numberElements2
        })
        }
    }
    
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap');

    .title_cancel {
        font-size:20px;
        font-family: 'Roboto', sans-serif;
    }
    .subtitle_cancel {
        font-size:12px;
        text-align: right;
        font-family: 'Roboto', sans-serif;
    }

    .box1 {
        display:block; 
        margin-right:auto;
    }

    .box2 {
        display:block; 
        margin-right:auto; 
        margin-left:auto;
    }

    .box3 {
        display:block; 
        margin-left:auto;
    }
    @media only screen and (max-width: 1000px){ 
        .box1, .box2, .box3 {
            width: 40%;
            display:block; 
            margin-right:auto; 
            margin-left:auto;
            margin-top: 10px;
        }
    }
</style>