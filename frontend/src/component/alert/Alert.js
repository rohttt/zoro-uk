import React from "react";
import './Alert.css'

function Alert(props) {

    return (
        props.alert &&
        <div className={`alert alert-${props.alert.type}`} role="alert">
            <strong>{props.alert.msg}</strong>
        </div>

    )
}

export default Alert;