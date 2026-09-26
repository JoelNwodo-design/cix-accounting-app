import { supabase } from "./supabase";
import { getCurrentSession } from "./session";
import { requireGuest } from "./session";
import { signIn } from "./auth";
import { redirectTo } from "./auth";


async function initializePage() {
    getCurrentSession()
    requireGuest()

    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        let email = document.getElementById('email').value.trim()
        let password = document.getElementById('password').value
    
        if (!email || !password) {
            alert('fill in all fields')
            return
        }
    
        const result = await signIn(email, password)
    
        if (result.success === true) {
            redirectTo('index.html');
            alert('login successful')
        } else {
            alert(result.message);
        }
    })
}

initializePage()