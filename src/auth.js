import { supabase } from "./supabase.js";

export function redirectTo(path) {
    window.location.href = path;
}


// for signin
export async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return{
            success: false,
            message: error.message,
        }
    } else {
        return{
            success: true,
            message: 'Successfully logged in',
            user: data.user,
        }
    }
}
