import React from 'react'
import Restaurant from './Restaurant'
import { Doughnut, Radar } from 'react-chartjs-2';
import { Route, Switch, Link, Redirect } from 'react-router-dom'
import { Alert, Button, FormGroup, ControlLabel, FormControl, HelpBlock, render, FormExample, Radio, Popover, Checkbox } from 'react-bootstrap'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import StripeCheckout from 'react-stripe-checkout';


class Recharge extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recharge: false,
            restaurantId: (this.props.meets.restaurantId || null),
            amount: 0,
        }

    }
        onToken = (token) => {
            // Token -> card to charge
            // Amount -> amount to charge comes from input
            const amount = this.state.amount
            const restid = this.state.restaurantId
            fetch(`http://localhost:8080/restaurants/${this.state.restaurantId}/charges`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    token,
                    amount,
                    restid
                })
            })
            .then(res => res.json(
                this.setState({
                    recharge: false,
                })
            ))
            .then(response => {
                const charged = response.amount / 100
                // alert(`Status: ${response.status}, ${response.message}`);
                this.setState({
                    amount: charged,
                })
                this.props.newBalance(charged)
            })
        }

    handleRecharge = (e) => {
        this.setState({ amount: e.target.value });
    }

    submitRecharge = () => {
        this.setState({
            recharge: !this.state.recharge
        })
    }

        render () {
            if (!this.state.recharge) {
                return (
                    <div className="charts-admin" style={{ maxWidth: '100%', width: '100%', borderRadius: "5px" }}>
                        <FormGroup
                            controlId="formBasicText">
                            <ControlLabel><h4 style={{ paddingTop: 10, paddingLeft: 10 }}>RECHARGE AMOUNT:</h4></ControlLabel>
                            <HelpBlock style={{ paddingLeft: 10, fontSize: "medium" }} >Amount to load </HelpBlock>
                            <FormControl
                                type="currency"
                                value={this.state.amount}
                                placeholder="Amount"
                                onChange={this.handleRecharge}
                                style={{ width: "50%", marginLeft: 10, fontSize: "medium" }}
                                maxLength="10"/>
                            <FormControl.Feedback />
                        </FormGroup>
                        <div style={{ marginLeft: 10, fontSize: "medium" }}>
                            <StripeCheckout
                                onClick={this.submitRecharge}
                                token={this.onToken}
                                stripeKey="pk_test_Gn7A7t8oWM48sDDpAlzeAfhY"
                            />
                        </div>
                    </div>
                )
        }
        }
}

    export default Recharge