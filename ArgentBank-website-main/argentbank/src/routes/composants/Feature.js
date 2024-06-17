import React from 'react';

const Feature = ({img, title, description}) => {

    return(
        <div>
            <img src={img} alt="Chat Icon" className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default Feature;