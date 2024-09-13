import React from 'react'
import { Fade } from 'react-awesome-reveal'

import HeaderTurnBackComponent from 'components/header_turn_back/header_turn_back.component';

import styles from './index.module.scss';

const HomePage: React.FC = () => {
    return (
        <div className={styles.main}>

            {/* start Titulo */}
            <HeaderTurnBackComponent title="Bienvenido" />
            {/* end Titulo */}


            {/* start Acciones crear ingresar */}
            <div className='d-flex justify-content-evenly flex-wrap gap-3 mb-5'>
                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <Fade direction='left'><h2>¡Ultimo post!</h2></Fade>
                    <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fbarbershopblow%2Fposts%2Fpfbid0nicDGwoYtGdpyLrVn9vWfEBJ9THQWrRrfkTnLwS5uSM6r5xx73gz2LL37Q2u8pKgl&show_text=true&width=400" width="400" height="725" scrolling="no" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                </div>

                <div className='d-flex justify-content-center align-items-center flex-column'>
                    <Fade direction='right'><h2>¿Como llegar?</h2></Fade>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7954.112688792073!2d-74.10246231677927!3d4.583907670711808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99f2ee719bf9%3A0xef1c5dc9a1e65fe3!2sBlow%20Barber%20Shop!5e0!3m2!1ses-419!2sco!4v1725909480405!5m2!1ses-419!2sco" width="350" height="700" loading="lazy" ></iframe>
                </div>
            </div>
        </div>
    )
}

export default HomePage
