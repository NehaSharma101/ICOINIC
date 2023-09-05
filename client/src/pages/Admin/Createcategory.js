import React, { useEffect, useState } from 'react'
import Layout from '../../Components/layout/Layout'
import AdminMenu from '../../Components/layout/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../Components/Form/CategoryForm'
import { Modal , footer,visible} from 'antd'
// import footer from '../../Components/layout/Footer'

const Createcategory = () => {
  const [category, setcategory] = useState([])
  const [name,setname]=useState("")
  const [visible,setvisible]=useState(false)
  const [selected,setselected]=useState(null)
  const [updated,setupdated]=useState("")

  //handle form
const handleSubmit=async(e)=>{
  e.preventDefault()
  try{
     const{data}=await axios.post('http://localhost:8000/create-category',{name})
     console.log(data)
     if(data.success){
      toast.success(`category  ${name} created successfully`)
      getAllCategory()
     }
     else{
      toast.error(data.message)
     }
  }
  catch(error){
    console.log(error)
    toast.error('something went wrong in input form')
  }
}

//handle update
  const handleUpdate=async(e)=>{
   e.preventDefault()
    try{
      const {data}=await axios.put(`http://localhost:8000/update-category/${selected._id}`,{name:updated})
      if(data.success){
        toast.success('data.message')
        setselected(null)
        setupdated('')
        setvisible(false)
        getAllCategory()

      }else {toast.error(data.message)}
    }catch(error){
      console.log(error)
    }
  }

  //handle delete
  const handleDelete=async(id)=>{
   
    try{
      const {data}=await axios.delete(`http://localhost:8000/delete-category/${id}`)
      if(data.success){
        toast.success(`deleted`)
        // setselected(null)
        // setupdated('')
        // setvisible(false)
        getAllCategory()

      }else {toast.error('something went wrong')}
    }catch(error){
      console.log(error)
    }
  }

  //get all category
  const getAllCategory = async (req, res) => {
    try {
      const res = await axios.get('http://localhost:8000/get-category')
      console.log(res.data)
      if (res.data.success) {
        setcategory(res.data.allCategory)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in getting category')
    }
  }

  
  useEffect(() => {
    getAllCategory()
  }, [])
  return (
    <Layout>
      <div className='container-fluid m-3 p-3s'>
        <div className='row'>
          <div className='col-md-3 '>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Manage category</h1>
            <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setname}/>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className='btn btn-primary m-2' onClick={()=>{setvisible(true); setupdated(c.name);setselected(c)}}>Edit</button>
                        <button className='btn btn-danger' onClick={()=>{handleDelete(c._id)}}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          <Modal onCancel={()=>setvisible(false)} footer={null} open={visible}>
          <CategoryForm value={updated} setValue={setupdated} handleSubmit={handleUpdate}/>
          </Modal>
          

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Createcategory