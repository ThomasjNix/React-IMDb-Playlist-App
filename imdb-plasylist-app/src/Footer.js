import React from 'react'
import { useLocation } from 'react-router'

const Footer = () => {
    const location = useLocation();
    return (
        <footer className={location.pathname.indexOf('confirmation') > -1 ? 'confirmation-footer footer' : 'footer'}>
            <span>Developed by Thomas Nix</span>
            { location.pathname.indexOf('confirmation') > -1 && <span> - My favorite color is blue</span>}
        </footer>
    )
}

export default Footer
