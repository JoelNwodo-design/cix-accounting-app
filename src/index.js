import { supabase } from "./supabase";
import { signOut } from "./session";
import { getCurrentSession } from "./session";
import { requireAuth } from "./session";

import '../styles/global.css'

import { createIcons, icons } from "lucide";


async function initializePage() {
    createIcons({icons})
    
    getCurrentSession()
    requireAuth()

    const signOutBtn = document.getElementById('signOutBtn')
    signOutBtn.addEventListener('click', signOut)
}

initializePage()