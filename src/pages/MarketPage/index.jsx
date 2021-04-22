import React, { Component } from 'react';

import autoBind from "react-autobind";

import { SearchSymbol } from './components/SearchSymbol';
import { SkeletonLoading } from './components/SkeletonLoading';
import { OrganizationsList } from './components/OrganizationsList'

import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import { Divider } from 'primereact/divider';
import { Tag } from 'primereact/tag';
import { findEndpoint } from './service';
import { debounce } from 'lodash';
import { withRouter } from 'react-router';

class MarketPage extends Component {

    constructor(props) {
        super(props);

        autoBind(this);

        this.searchOrganization = debounce(this.searchOrganization.bind(this), 350);

        this.state = {
            symbol: '',
            loading: false,
            organizations: []
        }
    }

    componentDidUpdate(_, prevState) {
        if(prevState.symbol !== this.state.symbol){
            this.searchOrganization();
        }
    }

    searchOrganization() {
        this.setState({ loading: true })
        findEndpoint(this.state.symbol,
            organizations => {
                this.setState({ organizations, loading: false })
            })
    }

    render() {
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <Card
                        className="p-shadow-24"
                        title="Get summary"
                        subTitle="Enter a symbol and get a little summary of him"
                    >
                        <div className="p-fluid">
                         <SearchSymbol 
                            onChange={event => this.setState( { symbol: event.target.value })}
                            value={this.state.symbol}
                            onSearchClick={this.searchOrganization}
                         />
                        </div>
                    </Card>
                    {this.state.symbol && (
                        <>
                            {/* <div className="p-m-6" /> */}
                            <Divider align="center" type="dashed">
                                <b>Result of search</b>
                            </Divider>

                            <Card className="p-shadow-24">
                                {this.state.loading ? (
                                    <SkeletonLoading 

                                    />                                    
                                ) : (
                                    <OrganizationsList
                                        organizations={this.state.organizations}
                                        history={this.props.history}
                                    />
                                )}
                            </Card>
                        </>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(MarketPage);
 