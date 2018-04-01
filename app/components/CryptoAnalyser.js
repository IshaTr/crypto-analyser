import React from "react";
import { Component } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

class CryptoAnalyser extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            currencyNames: [],
            currencyPrices: []
        };
    }

    componentDidMount() {
        this.syncCryptoAnalyser();
        setInterval(() => {
            this.syncCryptoAnalyser()
        }, 300000);
    }

    syncCryptoAnalyser = () => {
        axios({
            method: "get",
            url: "https://api.coinmarketcap.com/v1/ticker/?limit=10"
        }).then(response => {
            this.setState({data: response.data});
            const xAxis = response.data.map(data => data.name);
            const yAxis = response.data.map(data => data.price_usd);
            this.setState({ currencyNames: xAxis, currencyPrices: yAxis});
        });
    }

    render() {
        if (this.state.currencyNames && this.state.currencyPrices) {    
            const data = {
                labels: this.state.currencyNames,
                datasets: [
                    {
                        label: "CryptoAnalyser",
                        backgroundColor: "rgba(255,99,132,0.2)",
                        borderColor: "rgba(255,99,132,1)",
                        borderWidth: 1,
                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                        hoverBorderColor: "rgba(255,99,132,1)",
                        data: this.state.currencyPrices
                    }
                ],
            };

            return(
                <Bar
                    data={data}
                    options={{
                        maintainAspectRatio: false,
                    }}
                    width="600"
                    height="250"
                />
            )
        }
        return null;
    }
}

export default CryptoAnalyser;