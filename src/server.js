import dotenv from 'dotenv'
import app from './app';

// ? dotenv
dotenv.config();

// ? puerto
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`[+] servidor activo en el puerto ${ PORT }`);
});
