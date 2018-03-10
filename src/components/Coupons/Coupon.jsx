import React from 'react'
import {Row, Col, PageHeader, Table} from 'react-bootstrap'
import {Route, Switch, Link} from 'react-router-dom'

import Beer from '../../images/beer.png'
import wine from '../../images/wine-glass.png'
import cocktail from '../../images/cocktail.png'
import pizza from '../../images/pizza.png'
import food from '../../images/cutlery.png'
import burrito from '../../images/burrito.png'
import hamburger from '../../images/hamburger.png'
import pasta from '../../images/spaghetti.png'
import sushi from '../../images/sushi.png'
import steak from '../../images/steak.png'



class Coupon extends React.Component {

  render() {
    const coupon = this.props.coupon
    return (

      <div class="coupon-container">
        <div class="coupon-image-tags">
          {coupon.tags.map((tag) => {
            return <img src={Beer} />
          })}
        </div>
        <div class="restaurant-name"><h3> {coupon.restaurant.name} </h3></div>
        <div class="coupon-info"> {coupon.description} </div>
        <button type="button">Map</button>
        <button type="button">Get Coupon</button>
        </div>
    )
  }
}

export default Coupon