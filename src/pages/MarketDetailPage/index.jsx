import React, { Component } from 'react';
import autoBind from "react-autobind";
import { withRouter } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';
import { findCompanyOverview, findEarnings } from './service';
import { Divider } from 'primereact/divider';
import { Skeleton } from 'primereact/skeleton';
import { chartOptions } from './utilities/constant';
import { formatDateISOtoDate } from '../../utilities/formatters'

class MarketDetailPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.state = {
            overviewLoading: false,
            earningLoading: false,            

            overview: {},
            dataAnnualEarningChart: {},
            dataQuarterEarningChart: {}
        }
    }

    componentDidMount() {
        const symbol = new URLSearchParams(this.props.location.search).get("symbol");
        if (symbol) {
            this.searchOverview(symbol);
            this.searchEarnings(symbol);
        }
    }

    searchEarnings(symbol){        
        this.setState({ earningLoading: true })
        findEarnings(symbol, earning => {
            const dataAnnualEarningChart = {
                labels: earning.annualEarnings?.map(earn => formatDateISOtoDate(earn.fiscalDateEnding)).reverse(),
                datasets: [
                    {
                        label: "Earning per share",
                        data: earning.annualEarnings?.map(earn => earn.reportedEPS).reverse(),
                        borderColor: "#8dd0ff",
                        backgroundColor: "#8dd0ff20"
                    }
                ]
            };

            const dataQuarterEarningChart = {
                labels: earning.quarterlyEarnings?.map(earn => formatDateISOtoDate(earn.fiscalDateEnding)).reverse(),
                datasets: [
                    {
                        label: "Reported",
                        data: earning.quarterlyEarnings?.map(earn => earn.reportedEPS).reverse(),
                        borderColor: "#8dd0ff",
                        backgroundColor: "#8dd0ff20"
                    },
                    {
                        label: "Estimated",
                        data: earning.quarterlyEarnings?.map(earn => earn.estimatedEPS).reverse(),
                        borderColor: "#0BF03C",
                        backgroundColor: "#0BF03C20"
                    }
                ]
            };
            
            this.setState({
                dataAnnualEarningChart,
                dataQuarterEarningChart,
                earningLoading: false
            })        
            
        })
    }

    searchOverview(symbol) {
        this.setState({ overviewLoading: true })
        findCompanyOverview(symbol, overview => {
            this.setState({ overview, overviewLoading: false })
        })
    }

    getTitleCard() {
        <div className="p-d-flex p-jc-between">
            <div>{this.state.overview?.Name}</div>
            <div>{this.state.overview?.Symbol}</div>
        </div>
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card 
                        className="p-shadow-24 p-mb-3"
                        title={this.getTitleCard()}
                        subTitle={`${this.state.overview?.Industry} - ${this.state.overview?.AssetType}`}
                    >
                        <div className="p-fluid p-formgrid p-grid">
                            <div className="p-field p-col-12 p-m-0">
                                <Divider align="center" type="dashed" className="p-mt-0">
                                    <b>Description</b>        
                                </Divider>
                                {this.state.overviewLoading ?
                                    <Skeleton width="100%" height="150px" />
                                : <p>{this.state.overview?.Description}</p>} 

                                <Divider type="dashed" className="p-mt-0">

                                </Divider>
                            </div>
                        </div>    
                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Annual Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.state.earningLoading ? (
                            <Skeleton width="100%"  height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataAnnualEarningChart}
                                options={chartOptions}
                            />                            
                        )}

                    </Card>

                    <Card
                        className="p-shadow-24 p-mb-3"
                        title="Quarterly Earnings"
                        subTitle="Quotient that serves as an indicator of the profitability of organization (Earnings Per Share - EPS)."
                    >
                        {this.state.earningLoading ? (
                            <Skeleton width="100%"  height="366px" />
                        ) : (
                            <Chart
                                type="line"
                                data={this.state.dataQuarterEarningChart}
                                options={chartOptions}
                            />                            
                        )}
                    </Card>
                </div>
            </div>
        );
    }
}

export default withRouter(MarketDetailPage);