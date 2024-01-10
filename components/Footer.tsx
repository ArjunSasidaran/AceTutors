import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React from 'react';
import LinkedInIcon from './path/to/linkedin.svg';

export default function Footer() { //test
    return (
      <footer className="w-full flex items-center justify-between p-4 bg-cyan-900 text-white">
        {/* LinkedIn Logo */}
        <div className="flex items-center">
          <a href="https://www.linkedin.com/company/acetutors/" target="_blank" rel="noopener noreferrer">
            <img src="/linkedin.svg" alt="LinkedIn" className="h-8 w-8"/>
          </a>
        </div>
  
        {/* Center Text */}
        <div>
          <strong>© 2023 AceTutors. All rights reserved.</strong>
        </div>
  
        {/* Contact Us Link */}
        <div>
          <strong>
            <a href="/contact" className="hover:underline">Contact Us</a>
          </strong>
        </div>
      </footer>
    );
  }
  