import React, { useEffect } from 'react'

import styles from '../../styles/Home.module.css'
import Footer from '../footer/Footer'
import { api } from '../../utils/api'

import { useRouter } from 'next/router'

export default function Login() {
    const router = useRouter();

    const handleClick = async () => {
        const login = document.getElementById('email');
        const password = document.getElementById('password');
        try {
            const response = await api.get('/login', {
                auth: {
                    username: login.value,
                    password: password.value
                }
            })

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('category', response.data.category);
            router.replace({
                pathname: '/home',
                query: {
                    token: `${response.data.token}`,
                    category: `${response.data.category}`
                }
            }, '/home')
        } catch (error) {
            alert('Não autorizado');
        }
    }

    useEffect(() => {
        let category, token;
        if (typeof window !== "undefined") {
            category = localStorage.getItem('category');
            token = localStorage.getItem('token');
        }
        (async () => {
            api.defaults.headers = { 'Authorization': `Bearer ${token}` };
            const res = await api.get('/me')
            if (res.data.id) {
                router.replace({
                    pathname: '/home',
                    query: {
                        token: token,
                        category: category
                    }
                }, '/home')
            }
        })()
    }, [])

    return (
        <div className={styles.loginCard}>
            <form className={styles.form} >
                <h5>Login</h5>
                <input className={styles.loginInput} type='email' placeholder='Digite o seu email' name='email' id='email' />
                <input className={styles.password} type='password' placeholder='Digite sua senha' name='password' id='password' />
                <div className={styles.buttons}>
                    <input className={styles.button} type='button' id='passwordButton' value='Cancelar' />
                    <input onClick={handleClick} className={styles.button} type='button' id='button' value='Enviar' />
                </div>
            </form>
            <Footer className={styles.footerLogin} />
        </div>
    )
}
