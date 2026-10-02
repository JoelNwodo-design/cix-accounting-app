import { supabase } from "./supabase.js";

/**
 * fetches the user's data
 * 
 * @param {void}
 * @returns {promise<object>} result containing success status, user's data, and message
 * @throws {TypeError} an error message if query fails
*/
export async function getUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
            return{
                success: false,
                user: [],
                message: `failed to get user ${error.message}`
            }
        } else {
            return {
                success: true,
                user,
                message: 'get user, successfull'
            }
        }
    } catch (error) {
        return{
            success: false,
            user: [],
            message: `failed to get user ${error.message}`
        }
    }
}

/**
 * fetches the user's business data using user id
 * 
 * @param {string} id user's id 
 * @returns {promise<object>} result containing success status, user's business data, and message
 * @throws {TypeError} an error message if query fails
*/
export async function getUserBusiness(id) {
    try {
        const { data: business, error } = await supabase
            .from("business_members")
            .select(`business_id,
                    businesses (name)
                `)
            .eq("user_id", id)
            .single();

        if (error) {
            return{
                success: false,
                business: [],
                message: `failed to get user ${error.message}`
            }
        } else {
            return{
                success: true,
                business,
                message: "successfully got user's business id"
            }
        }
    } catch (error) {
        return{
            success: false,
            business: [],
            message: `failed to get user ${error.message}`
        }
    }
}

/**
 * breaks down user's data and loads user's id into getUserBusiness function
 * 
 * @param {void}
 * @returns {void}
 * @throws {void} returns if error exists
*/
export async function loadUserBusiness() {
    const result = await getUser()
    if (!result.user) {
        return
    } else {
        await getUserBusiness(result.user.id)
        return
    }
}