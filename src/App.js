import React from 'react';
import './App.css';
import axios from 'axios';


// react component class
export default class App extends React.Component {
    // constructor for currencies
    constructor(props) {
        super(props);
        this.state = {
            baseCurrencies: [],
            targetCurrencies: [],
            baseCurrency: '',
            targetCurrency: '',
            amount: 0,
            exchangeRate: '',
            result: ''
        };
    }

    // componentDidMount
    componentDidMount() {
        this.fetchData();
    }

    // fetchData
    fetchData = () => {

        // Base Currency
        axios.get('https://api.coingecko.com/api/v3/coins/list?include_platform=false')
            .then(res => {
                this.setState({
                    baseCurrencies: res.data,
                });
            })
            .catch(error => {
                alert("Sorry, there was an error, please come back later.");
            });

        // Target Currency
        axios.get('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
            .then(res => {
                this.setState({
                    targetCurrencies: res.data,
                });
            })
            .catch(error => {
                alert("Sorry, there was an error, please come back later.");
            });
    };

    // Handle Conversion
    convert = () => {
        console.log('https://api.coingecko.com/api/v3/simple/price?ids=' + this.state.baseCurrencies[this.state.baseCurrency] + '&vs_currencies=' + this.state.targetCurrency);
        // Base Currency
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=' + this.state.baseCurrency + '&vs_currencies=' + this.state.targetCurrency)
            .then(res => {
                console.log(res.data);
                this.setState({
                    result: (res.data[this.state.baseCurrency][this.state.targetCurrency] * this.state.amount) + " " + this.state.targetCurrency,
                });
                // this.setState({
                //     result: res.data.prices[0].price,
                // });
            })
            .catch(error => {
                alert("Sorry, there was an error, please come back later.");
            });
    };


// render
    render() {
        return (
            <main>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        
                            <h1 className="text-center">Currency Converter</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card my-3">
                                <div className="card-header">
                                    <h3 className="text-center">Base Currency</h3>
                                </div>
                                <div className="card-body">

                                    <div className="form-group">
                                        <label htmlFor="baseCurrency">Base Currency</label>
                                        <select className="form-control" id="baseCurrency" onChange={(e) => {
                                            this.setState({
                                                baseCurrency: e.target.value
                                            })
                                        }}>
                                            <option value="">Select a base currency</option>
                                            {this.state.baseCurrencies.map(baseCurrency => (
                                                <option key={baseCurrency.id}
                                                        value={baseCurrency.id}>{baseCurrency.symbol}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card my-3">
                                <div className="card-header">
                                    <h3 className="text-center">Target Currency</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="targetCurrency">Target Currency</label>
                                        <select className="form-control" id="targetCurrency" onChange={(e) => {
                                            this.setState({
                                                targetCurrency: e.target.value
                                            })
                                        }}>
                                            <option value="">Select a target currency</option>
                                            {this.state.targetCurrencies.map(targetCurrency => (
                                                <option key={targetCurrency}
                                                        value={targetCurrency}>{targetCurrency}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 mx-auto">
                            <div className="card my-3">
                                <div className="card-header">
                                    <h3 className="text-center">Amount & Results</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="amount">Amount</label>
                                        <input type="number" className="form-control" id="amount" onChange={(e) => {
                                            this.setState({
                                                amount: e.target.value
                                            })
                                        }}/>
                                    </div>

                                    <div className="text-center my-3">
                                        <button className="btn btn-primary" onClick={this.convert}>Convert</button>
                                    </div>

                                    <div className="text-center">
                                        <h5>{this.state.exchangeRate}</h5>
                                        <h4>{this.state.result}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}