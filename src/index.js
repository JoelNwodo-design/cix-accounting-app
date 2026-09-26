import { supabase } from "./supabase";
import { signOut } from "./session";
import { getCurrentSession } from "./session";
import { requireAuth } from "./session";

import '../styles/global.css'


async function initializePage() {
    getCurrentSession()
    requireAuth()

    const signOutBtn = document.getElementById('signOutBtn')
    signOutBtn.addEventListener('click', signOut)
}

initializePage()