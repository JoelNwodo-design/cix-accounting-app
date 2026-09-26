import { supabase } from "./supabase";
import { redirectTo } from "./auth";


export async function getCurrentSession() {
    try {
        const { data: { session } } = await supabase.auth.getSession()
        return {
            success: !!session,
            session,
        }
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

export async function requireAuth() {
    try {
        let result = await getCurrentSession()
        if (!result.success) {
            redirectTo('sign-in.html')
            return{
                success: false,
                message: 'sign-in to continue',
            }
        } else return{
            session: result.session,
            success: true,
            message: 'user is already signed in',
        }
    } catch (error) {
        return{
            message: error.message
        }
    }
}


export async function requireGuest() {
    try {
        let result = await getCurrentSession()
        if (result.success) {
            redirectTo('home.html')
            return{
                session: result.session,
                success: false,
                message: 'user already signed-in',
            }
        } else return{
            success: true,
            message: 'sign-in to continue',
        }
    } catch (error) {
        return{
            message: error.message
        }
    }
}

export async function signOut() {
    const {data, error} = await supabase.auth.signOut()

    if (error) {
        return {
            success: false,
            message: error.message,
        }
    } else {
        alert('successfully signed out')
        return {
            success: true,
            message: 'successfully signed out',
        }
    }
}