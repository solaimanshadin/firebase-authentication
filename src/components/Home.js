import React from 'react';
import image from '../images/home.svg'
const Home = () => {
    return (
        <div className="container my-5 py-5">
            <div className="row align-items-center">
                <div className="col-md-6">
                    <h1 className="display-2">Welcome to our</h1>
                    <h1 className="display-3 text-primary">AwesomeSite</h1>
                </div>
                <div className="col-md-6">
                    <img className="img-fluid" src={image} alt="Banner" />
                </div>
            </div>

        </div>
    );
};

export default Home;