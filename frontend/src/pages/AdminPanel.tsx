import { Link } from "react-router-dom"

function AdminPanel() {
  return (
    <div className="max-w-7xl px-2 mx-auto"> 
        <h1 className="poppins text-4xl poppins-semibold my-4">Admin Panel</h1>
        <div className="flex flex-wrap gap-3">
            <Link to='/admin/add-product/' className=" px-4 py-2 rounded bg-orange-800 text-white font-medium hover:bg-slate-900">Add Product</Link>
            <Link to='/admin/all-products' className=" px-4 py-2 rounded bg-orange-800 text-white font-medium hover:bg-slate-900">View All Products</Link>
            <Link to='/admin/manage-banners' className=" px-4 py-2 rounded bg-orange-800 text-white font-medium hover:bg-slate-900">Update Featured Banners</Link>
            <Link to='/admin/manage-orders' className=" px-4 py-2 rounded bg-orange-800 text-white font-medium hover:bg-slate-900">View Orders</Link>
        </div>
    </div>
  )
}

export default AdminPanel