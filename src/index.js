import { supabase } from "./supabase";
import { signOut } from "./session";
import { getCurrentSession } from "./session";
import { requireAuth } from "./session";


async function initializePage() {
    getCurrentSession()
    requireAuth()

    const signOutBtn = document.getElementById('signOutBtn')
    signOutBtn.addEventListener('click', signOut())
}

initializePage()