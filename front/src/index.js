import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'
import {BrowserRouter} from "react-router-dom";

const PUBLISHABLE_KEY = 'pk_test_b25lLWdvc2hhd2stMzIuY2xlcmsuYWNjb3VudHMuZGV2JA'; //despus ver que onda que no lee el .env

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ClerkProvider>
);

