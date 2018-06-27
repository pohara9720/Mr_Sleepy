import React, { Component } from 'react';
import { Context } from '../../App'



export default connect = (Component, context) => {
    return props => {
        return (
            <Context.Consumer>
                {value => <Component {...props} {...value} />}
            </Context.Consumer>
        )
    }
}