import React from 'react';
import iconChat from './img/icon-chat.svg'
import iconMoney from './img/icon-money.svg'
import iconSecurity from './img/icon-security.svg'
import Feature from './composants/Feature';

const Accueil = () => {
    
    return (
        <div>
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    <div className="feature-item">
                        <Feature img={iconChat} title='You are our #1 priority' description='Need to talk to a representative? 
                        You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'/>
                    </div>
                    <div className="feature-item">
                        <Feature img={iconMoney} title='More savings means higher rates' description='The more you save with us, the higher your interest rate will be !'/>
                    </div>
                    <div className="feature-item">
                        <Feature img={iconSecurity} title='Security you can trust' description='We use top of the line encryption to make sure your data 
                        and money is always safe.'/>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Accueil;