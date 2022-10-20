import React from 'react';
import "./Style.css";

function ErrorMessage(props) {
    console.log("skjdfl sfkjldsjflkdsjf",props.city);
    return (
        <div className="weatherInfo">
            <div className='error-message'> 
                <p>"<span className='city-name'>{props.city}</span>" city not found.</p>
            </div>
        </div>
    );
}

export default ErrorMessage;