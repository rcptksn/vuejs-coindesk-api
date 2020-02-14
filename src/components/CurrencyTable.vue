<template>
    <div class="currData">
        <p class="small" style="font-style: italic;">{{dataExchanger}}</p>
        <div class="currDiv">
            <table class="table">
                <thead class="thead-light">
                <tr>
                    <th scope="col">Currency Code</th>
                    <th scope="col">Currency Name</th>
                    <th scope="col">Rate</th>
                    <th scope="col">Update Date</th>
                </tr>
                <tr>
                    <th colspan="4">
                        <input type="text" class="form-control" id="inputSrc" v-on:keyup="searchTable()" v-model="searchValue" placeholder="Search..." />
                    </th>
                </tr>
                </thead>
                <tbody v-for="(item, index) in currDetailFilterData" :key="index">
                    <tr>
                        <td>{{item.code}}</td>
                        <td>{{item.description}}</td>
                        <td>{{item.rate}} <sup>{{item.code}}</sup></td>
                        <td>{{item.time}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import {getDateFormat} from "../assets/helpers";

    export default {
        name: 'CurrencyTable',
        props: {
            currData: Array,
            currDetailAPI: String,
        },
        data(){
          return{
              currDetailData: [],
              currDetailFilterData: [],
              dataExchanger: '',
              disAllowCode: ['XBT', 'BTC'],
              usdPriceBTC: 0,
              searchValue: ''
          }
        },
        methods: {
            getCurrCode() {
                this.currData.map((item) => {
                    let cCode= item.currency;
                    fetch(this.currDetailAPI + cCode +'.json').then((response) => {
                        return response.json();
                    }).then((response) => {

                        if(this.disAllowCode.indexOf(response.bpi[cCode].code) === -1) {
                            this.currDetailData.push({
                                "code": response.bpi[cCode].code,
                                "description": response.bpi[cCode].description,
                                "rate": response.bpi[cCode].rate,
                                "rate_float": response.bpi[cCode].rate_float,
                                "time": getDateFormat(new Date(response.time.updatedISO))
                            });
                            this.usdPriceBTC= response.bpi["USD"].rate;
                            this.dataExchanger= response.disclaimer;
                        }
                    })
                });
                this.currDetailFilterData= this.currDetailData;
            },
            searchTable() {
                this.currDetailFilterData= this.currDetailData.filter((item) => {
                    return item.code.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1;
                })
            }
        },
        created(){
            this.getCurrCode();
            setTimeout(() => {
                this.$emit('interface', this.usdPriceBTC);
            },500)
        }
    }
</script>

<style>
</style>
