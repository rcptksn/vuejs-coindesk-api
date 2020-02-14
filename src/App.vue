<template>
  <main role="main" class="container" id="app">
    <div class="d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
      <div class="col-10 d-flex align-items-center">
        <img class="mr-3" src="./assets/bitcoin.svg" alt="" width="48" height="48">
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">{{pageTitle}}</h6>
          <small>{{author}}</small>
        </div>
      </div>
      <div class="col-2">
        <h6 class="mb-0 text-white lh-100">$ {{this.usdPriceBTC}}</h6>
        <small>1 BTC</small>
      </div>
    </div>
    <CurrencyTable :currData="currData" :currDetailAPI="currDetailAPI" @interface="setDataProps" />
  </main>
</template>

<script>
  import CurrencyTable from './components/CurrencyTable';
  import { CurrCodes } from './data/currCode';

  export default {
    name: 'App',
    components: { CurrencyTable },
    data(){
      return{
        pageTitle: 'Bitcoin Price',
        currData: CurrCodes,
        currDetailAPI: 'https://api.coindesk.com/v1/bpi/currentprice/',/*  #CODE.json */
        usdPriceBTC: '0',
        author: 'rcptksn'
      }
    },
    methods: {
      setDataProps(dataVal) {
        this.usdPriceBTC= dataVal;
      }
    },
    created(){

    }
  }
</script>

<style>
  @import "./assets/styles.css";
</style>
