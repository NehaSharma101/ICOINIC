import React, { useEffect , useState} from 'react'
import Layout from '../Components/layout/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from '../context/auth'
import { Checkbox, Radio } from "antd";
import { Prices } from '../Components/Prices';
import { AiOutlineReload } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';

const Homepage = () => {
  const [auth,setauth]=useAuth()
  const navigate = useNavigate()
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

//get total count
const getTotal = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/product-count");
    setTotal(data?.total);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  if (page === 1) return;
  loadMore();
}, [page]);

//get all categories

const getAllCategory = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/get-category");
    console.log(data);
    if (data?.success) {
      setCategories(data?.allCategory);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  getAllCategory();
  getTotal();
}, []);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/get-product`);
      console.log(data)
      setLoading(false);
      setProducts(data.product);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }
  useEffect(()=>{
  getAllProducts()
  },[])

   // filter by cat
   const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);
  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:8000/product-filter", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8000/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  
  return (
    <Layout>
        {/* <h1>Home page</h1> */}
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        <div className='row p-2'>
          <div className='col-md-3'>
            <h5 className='text-center'>Filter by Categories</h5>
            <div className="d-flex flex-column">
            {categories?.map((c) => (
             <Checkbox
             key={c._id}
             onChange={(e) => handleFilter(e.target.checked, c._id)}>
             {c.name}
           </Checkbox>
            ))}
          </div>
          <h5 className="text-center mt-4">Filter By Price</h5>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
          </div>
          <div className='col-md-9'>
            <h3 className='text-center'>All Products</h3>
            <div className='d-flex flex-wrap'>
             {/* <h2>Products</h2> */}
             {products?.map((p) => (
              // <Link
              //   key={p._id}
              //   to={`/product/${p.slug}`}
              //   className="product-link"
              // >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8000/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,30)}</p>
                    <p className="card-text ">${p.price}</p>
                    <button className='btn btn-primary m-2 w-45' onClick={()=>{
                      setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success('Item added to cart !')
                    }}>Add to Cart</button>
                    <button className='btn btn-secondary' onClick={()=> navigate(`/get-single-product/${p.slug}`)}>More Details</button>
                  </div>
                </div>
              // </Link>
            ))}
            </div>
            <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn loadmore"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    {" "}
                    Loadmore <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        </div>
    </Layout>
  )
}

export default Homepage