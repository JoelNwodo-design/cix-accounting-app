import { supabase } from "./supabase";
import { signOut } from "./session";
import { getCurrentSession } from "./session";
import { requireAuth } from "./session";
import { getUser } from "./user.js";
import { getUserBusiness } from "./user.js";
import { showError } from "./components.js";

import '../styles/global.css'
import '../styles/product.css'

import { createIcons, icons } from "lucide";


    /**
     * Updates product in database
     * 
     * @param {string} base_unit updated base unit of product
     * @param {string} product_name updated product name unit of product
     * @param {string} productId id of product being edited, used to find the product in the db
     * @returns {Promise<object>} success status of query, data containing updated product, and message
     * @throws {TypeError} error message if query fails
    */
    async function updateProduct(productId, product_name, base_unit) {
        try {
            const { data, error } = await supabase
                .from('products')
                .update({
                    product_name: product_name,
                    base_unit: base_unit
                })
                .eq("id", productId)
                .select()

                if (error) {
                    showError('Failed to update Product')
                    return{
                        success: false,
                        data: [],
                        message: `failed to update products ${error.message}`
                    }
                } else {
                    return{
                        success: true,
                        data,
                        message: 'successfully updated products'
                    }
                }
        } catch (error) {
            showError('Failed to update Product')
            return{
                success: false,
                data: [],
                message: `failed to update products ${error.message}`
            }
        }
    }

    /**
     * get products from products table in supabase
     *
     * @returns {Promise<object>} result containing success status, data containing product and message
     * @throws {TypeError} error message if query fails
     */
    async function getProducts() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select(`
                        id,
                        product_name,
                        base_unit
                    `)
                .order('product_name', {ascending: true})

            if (error) {
                showError('Failed to get Products')
                return {
                    success: false,
                    data: [],
                    message: `failed to load products ${error.message}`,
                }
            } else {
                return {
                    success: true,
                    data,
                    message: 'products fetched successfully',
                }
            }
        } catch (error) {
            showError('Failed to get Products')
            return{
                success: false,
                data: [],
                message: `failed to load products ${error.message}`
            }
        }   
    }

    async function deleteProduct(productId) {
        try {
            const { data, error } = await supabase
                .from('products')
                .delete()
                .eq('id', productId)

            if (error) {
                showError('Failed to delete Product')
                return{
                    success: false,
                    data: [],
                    message: `failed to delete product ${error.message}`
                }
            } else {
                return{
                    success: true,
                    data,
                    message: 'successfully deleted product'
                }
            }
        } catch (error) {
            showError('Failed to delete Product')
            return{
                success: false,
                data: [],
                message: `failed to delete product ${error.message}`
            }
        }
    }

    let productBeingEdited;
    let productBeingDeleted;
    let cancelDelete
    

     /**
     * renders array of products using html template tags
     * 
     * @param {array} products array containing objects with product info
     * @returns {void}
     * @throws {void}
    */
    function displayProducts(products) {
        const tableBody = document.getElementById('tableBody')

        tableBody.innerHTML = "<tr><th><h3>S/N</h3></th><th><h3>Product name</h3></th><th><h3>Base unit</h3></th><th></th></tr>";

        products.forEach(function(product, index) {
            const template = document.querySelector("#tableRow");
            const row = template.content.cloneNode(true);

            row.querySelector("#number").textContent = index + 1;
            row.querySelector("#productName").textContent = product.product_name;
            row.querySelector("#baseUnit").textContent = product.base_unit;

            const editBtn = row.querySelector(".editBtn")
            editBtn.addEventListener('click', () => {
                productBeingEdited = product

                const overlay = document.querySelector(".overlay")
                overlay.style.display = "flex"
                const modal = document.querySelector(".modal")
                modal.style.display = "flex"

                overlay.addEventListener('click', function (event) {
                    event.preventDefault()
                    document.getElementById('editProductName').value = ""
                    document.getElementById('editBaseUnit').value = ""
                    modal.style.display = "none"
                    overlay.style.display = "none"
                })

                document.getElementById('editProductName').value = product.product_name;
                document.getElementById('editBaseUnit').value = product.base_unit;

            })

            const deleteBtn = row.querySelector(".deleteBtn")
            deleteBtn.addEventListener('click', async () => {
                const cancelDelBtn = document.getElementById('cancelDelBtn')
                cancelDelBtn.addEventListener('click', function () {
                    cancelDelete = true
                    const confirmDelete = document.querySelector(".confirm-delete")
                    confirmDelete.style.display = "none"
                    comfirmOverlay.style.display = "none"
                })

                const confirmDelete = document.querySelector(".confirm-delete")
                confirmDelete.style.display = "block"
                const comfirmOverlay = document.getElementById('comfirmOverlay')
                comfirmOverlay.style.display = "block"

                comfirmOverlay.addEventListener('click', function () {
                    comfirmOverlay.style.display = "none"
                    confirmDelete.style.display = "none"
                })

                const confirmDelBtn = document.getElementById('confirmDelBtn')

                if (!cancelDelete) return

                confirmDelBtn.addEventListener('click', async () => {
                    productBeingDeleted = product.id

                    const result = await deleteProduct(productBeingDeleted)
                    
                    if (result.success) {
                        const comfirmOverlay = document.getElementById('comfirmOverlay')
                        comfirmOverlay.style.display = "none"
                        confirmDelete.style.display = "none"
                        await loadProducts()
                    }
                })
            })

            tableBody.appendChild(row)
        });
        createIcons({icons})
    }

    const saveEditBtn = document.getElementById('saveEdit')
    saveEditBtn.addEventListener('click', async function saveEdit() {
        const newProductName = document.getElementById('editProductName').value
        const newBaseUnit = document.getElementById('editBaseUnit').value
        const productId = productBeingEdited.id

        const result = await updateProduct(productId, newProductName, newBaseUnit)

        if (result.success) {
            document.getElementById('editProductName').value = ""
            document.getElementById('editBaseUnit').value = ""
            const modal = document.querySelector(".modal")
            modal.style.display = "none"
            overlay.style.display = "none"

            await loadProducts()
        }
    })

    const cancelEditBtn = document.getElementById('cancelEditBtn')
    cancelEditBtn.addEventListener('click', () => {
        document.getElementById('editProductName').value = ""
        document.getElementById('editBaseUnit').value = ""
        const modal = document.querySelector(".modal")
        modal.style.display = "none"
        overlay.style.display = "none"
    })

    /**
     * Loads products in prep to display products
     * 
     * @param {void}
     * @returns {void}
     * @throws {void} error is handled by getProducts().message
    */
    async function loadProducts() {
        const result = await getProducts()
        if (result.success == true) {
            displayProducts(result.data)
        }
    }


    /**
     * saves product to backend
     * 
     * @param {string} newProductName is the name of the product being saved
     * @param {string} newProductBaseUnit means the base unit of the new product being saved
     * @returns {Promise<object>} result containing success status and message
     * @throws {TypeError} an error message if query fails 
    */
    async function saveNewProduct(newProductName, newProductBaseUnit) {
        try {
            const user = await getUser()
            const userBusiness =  await getUserBusiness(user.user.id)

            const { data, error } = await supabase
                .from('products')
                .insert({
                    product_name: newProductName,
                    base_unit: newProductBaseUnit,
                    business_id: userBusiness.business.business_id,
                })

            if (error) {
                showError('Failed to Save Product')
                return {
                    success: false,
                    message: `failed to save product ${error.message}`,
                }
            } else {
                await loadProducts()
                return {
                    success: true,
                    message: 'product saved successfully',
                }
            }
        } catch (error) {
            showError('Failed to save Product')
            return{
                success: false,
                message: `failed to save product ${error.message}`
            }
        }
    }

    /**
     * calls the save product function and feeds in the params on button click
     * 
     * @param {void}
     * @returns {void}
     * @throws {TypeError} an alert if fields are left empty
    */
    const addProductBtn = document.getElementById('addProductBtn')
    addProductBtn.addEventListener('click', async () => {
        const overlay = document.querySelector(".overlay")
        overlay.style.display = "flex"
        const modal = document.querySelector(".addProductModal")
        modal.style.display = "flex"

        overlay.addEventListener('click', function (event) {
            event.preventDefault()
            document.getElementById('addProductName').value = ""
            document.getElementById('addBaseUnit').value = ""
            modal.style.display = "none"
            overlay.style.display = "none"
        })

        const saveProductBtn = document.getElementById('saveProductBtn')
        saveProductBtn.addEventListener('click', async () => {
            const productName = document.getElementById('addProductName').value
            const baseUnit = document.getElementById('addBaseUnit').value

            if (!productName || !baseUnit) {
                showError('All fields are required*')
                return
            }

            const result = await saveNewProduct(productName, baseUnit)

            if (result.success) {
                document.getElementById('addProductName').value = ""
                document.getElementById('addBaseUnit').value = ""
                modal.style.display = "none"
                overlay.style.display = "none"
            }
        })
    })

    const cancelSaveBtn = document.getElementById('cancelSaveBtn')
    cancelSaveBtn.addEventListener('click', () => {
        document.getElementById('addProductName').value = ""
        document.getElementById('addBaseUnit').value = ""

        const modal = document.querySelector(".addProductModal")
        const overlay = document.querySelector(".overlay")
        modal.style.display = "none"
        overlay.style.display = "none"
    })




/**
 * runs individual functions in order, to load page correctly
 * 
 * @param {void}
 * @returns {void}
 * @throws {void}
*/
async function initializePage() {
    createIcons({icons})
    getCurrentSession()
    requireAuth()

    const signOutBtn = document.getElementById('signOutBtn')
    signOutBtn.addEventListener('click', signOut)

    await loadProducts()
}

await initializePage()