import React from 'react'
import {Formik,Field, Form} from "formik"
import { useState } from 'react';
import { useEffect } from 'react';


function ProductForm() {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
        .then( res => res.json())
        .then(d => setCategories(d))
        .catch((e) => console.log("categori çekme hatası", e))
    },[])
 
  return (
    <div className='product-form'>
        <h2>Admin Panel Dashboard</h2>
        <Formik
         initialValues={{
           name: "",
           description: "",
           price: "",
           stock: "",
           images: [],
           category: "",
         }} 
         onSubmit={async (values,{resetForm}) => {
            const formData = new FormData();
              for(let key in values) {
              formData.append(key, values[key]);

              for (let i = 0; i < values.images.length; i++ ) {
                formData.append("images",values.images[i])
              }
    }
           try {
            const response = await fetch("http://localhost:5000/api/products",{
                method:"POST",
                headers:{ Authorization:"Bearer " + token, },
                body: formData,
            });
            const data = await response.json();
            console.log("yeni ürün:", data)
            alert("ürün başarıyla eklendi")
            resetForm()
           }
           catch(e) {
            console.error("hata:", e)
            alert("ürün eklerken bir hata oluştu")
           }
         }}
        >
            {({isSubmitting, setFieldValue}) =>(
               <Form>
                <div>
                    <label htmlFor="name">name</label>
                    <Field id="name" name="name" placeholder=""></Field>
                    </div>
                    <div>
                    <label htmlFor="description">description</label>
                    <Field id="description" name="description" placeholder="" disabled={isSubmitting}></Field>
                    </div>
                    <div>
                    <label htmlFor="price">price</label>
                    <Field id="price" name="price" placeholder="" disabled={isSubmitting}></Field>
                    </div>
                    <div>
                    <label htmlFor="stock">stock</label>
                    <Field id="stock" name="stock" placeholder="" disabled={isSubmitting}></Field>
                    </div>
                    <div>
                        <div>
                            <label htmlFor="image">image</label>
                            <input id="image" name="image" type="file"
                            multiple onChange={(event) => {setFieldValue("images",event.currentTarget.files)}} 
                            disabled={isSubmitting}></input>
                        </div>
                    <label htmlFor="category">category id</label>
                    <Field id="category"  as="select" name="category" placeholder="" disabled={isSubmitting}>
                        <option value="">Kategori Seç</option>
                        {categories.map((cat) => (
                            <option value={cat._id} key={cat._id}>
                                {cat.name}
                            </option>

                        ))}
                    </Field>
                    </div>
                    <button type='submit' disabled={isSubmitting}>Ekle</button>
            </Form>

            )}


        </Formik>
    </div>
  )
}

export default ProductForm