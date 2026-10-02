import { supabase } from "./supabase.js";

export function showError(message) {
    const errorModal = document.getElementById('errorModal')
    const errorMessage = document.getElementById('errorMessage')
    const cancelErrorBtn = document.getElementById('cancelError')

    errorModal.style.display = "block"
    errorMessage.textContent = message

    const overlay = document.getElementById('errorOverlay')  
    overlay.style.display = "flex"

    overlay.addEventListener('click', function (event) {
        event.preventDefault()

        errorModal.style.display = "none"
        overlay.style.display = "none"
    })

    cancelErrorBtn.addEventListener('click', function () {
        errorModal.style.display = "none"
        overlay.style.display = "none"
    })
}