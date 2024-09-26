import React from 'react';

const Picture = () => {
    return (
        <div
            className="w-full h-96 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/principale.jpg')` }}
        ></div>
    );
};

export default Picture;