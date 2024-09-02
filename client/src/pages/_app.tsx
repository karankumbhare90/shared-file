import 'tailwindcss/tailwind.css';
import '../../styles/globals.css'
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000/'

function MyApp({ Component, pageProps }) {
    return (
        <div className='h-screen w-full bg-background flex items-center justify-center'>
            <Component {...pageProps} />
            <Toaster position='top-right' />
        </div>
    )
}

export default MyApp;   