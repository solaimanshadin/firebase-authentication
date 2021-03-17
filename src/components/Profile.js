import React from 'react';
import avatar from '../images/avatar.svg'
const Profile = () => {
    return (
        <div className="container my-5 py-5">
             <div className="card text-center col-md-8 mx-auto">
            <div className="card-header">
                My Profile
            </div>
            <div className="card-body py-5">
                <img src={avatar} width="100" alt="Profile Pic"/>
                <h5 className="card-title pt-4">Solaiman Shadin</h5>
                <hp className="card-text">shadin@programming-hero.com</hp>
            </div>
        </div>
        </div>
       
    );
};

export default Profile;