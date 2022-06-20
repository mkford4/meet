import React from 'react';
import './WelcomeScreen.css';


function WelcomeScreen(props) {
  return props.showWelcomeScreen ?
    (
      <div className='WelcomeScreen'>
        <div className='welcome-wrapper'>
          <h1>WELCOME to the MEET APP</h1>
          <h4>
            Log in to see upcoming events around the world for full-stack developers
          </h4>


          <button className='google-btn' onClick={() => { props.getAccessToken() }}
            rel='nofolow noopener'>
            <b className='btn-text'>Sign in with Google:</b>
            <div className='google-icon-wrapper'>
              <img

                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='Google sign-in'
              />
            </div>

          </button>

        </div>
        <a
          href='https://mkford4.github.io/meet/privacy.html'
          rel='nofollow noopener'
          className='footer'
        >
          Privacy Policy
        </a>
      </div>
    )
    : null
}

export default WelcomeScreen;