import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Components/layout/AdminMenu'
import Layout from '../../Components/layout/Layout'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Product = () => {
    const [products, setproducts] = useState([])

    //get all products
    const getAllproduct = async () => {
        try {
            const { data } = await axios.get('http://localhost:8000/get-product')
            setproducts(data.product)
            console.log(data.product)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //life cycle method
    useEffect(() => {
        getAllproduct()
    }, [])

    return (
        <Layout>
            <div className='row'>
                <div className='col-md-3'>
                    <AdminMenu />

                </div>
                <div className='col-md-9'>
                    <h1 className='text-center'>All Products</h1>
                    {/* <div className='d-flex'>
                       { products?.map(p => (
                          
                             <div className="card m-2" style={{ width: '18rem' }} key={p._id}>
                                <img src={p.photo} className="card-img-top" alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                 
                                </div>
                            </div>
                        

                        ))
                    }
                    </div> */}
                <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
                    
                </div>

            </div>
        </Layout>
    )
}

export default Product