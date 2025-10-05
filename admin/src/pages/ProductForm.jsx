import React from 'react'
import {Formik,Field, Form} from "formik"
import { useState } from 'react';
import { useEffect } from 'react';


function ProductForm() {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;
    const [categories, setCategories] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);  

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
        .then( res => res.json())
        .then(d => setCategories(d))
        .catch((e) => console.log("categori çekme hatası", e))
    },[])
 
  return (
    <div className='product-form'>
        <h3>Yeni Ürün Ekle</h3>
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
                if (key !== "images"){
              formData.append(key, values[key]);
            }
            }
              for (let i = 0; i < values.images.length; i++ ) {
                formData.append("images",values.images[i])
              }
    
           try {
            const response = await fetch("http://localhost:5000/api/products",{
                method:"POST",
                headers:{ Authorization:"Bearer " + token, },
                body: formData,
            });

            if (!response.ok) {
                const text = await response.text();
                console.error("backend error", text);
                throw new Error("Ürün ekleme başarısız: " + response.status);
            }
            const data = await response.json();
            console.log("yeni ürün:", data)
            alert("ürün başarıyla eklendi")
            resetForm()
            setPreviewImage([]);
           }
           catch(e) {
            console.error("hata:", e)
            alert("ürün eklerken bir hata oluştu")
           }
         }}
        >
            {({isSubmitting, setFieldValue, values}) =>(
               <Form className='product-add-form'>
                    <div>
                      <label htmlFor="name">name</label>
                      <Field id="name" name="name" placeholder="Ürün adı giriniz..."></Field>
                    </div>
                    <div>
                      <label htmlFor="description">description</label>
                      <Field id="description" name="description" placeholder="Açıklama giriniz..." disabled={isSubmitting}></Field>
                    </div>
                    <div>
                      <label htmlFor="price">price</label>
                      <Field id="price" name="price" placeholder="Fiyat giriniz..." disabled={isSubmitting}></Field>
                    </div>
                    <div>
                      <label htmlFor="stock">stock</label>
                      <Field id="stock" name="stock" placeholder="Adet giriniz..." disabled={isSubmitting}></Field>
                    </div>
                    <div>
                        
                    <label htmlFor="category">Kategori</label>
                    <Field id="category"  as="select" name="category"  disabled={isSubmitting}>
                        <option value="">Kategori Seç</option>
                        {categories.map((cat) => (
                            <option value={cat._id} key={cat._id}>
                                {cat.name}
                            </option>

                        ))}
                    </Field>
                    <div>
                            <label htmlFor="images">image</label>
                            <input id="images" name="images" type="file"
                            multiple onChange={(event) => {
                              const files = Array.from(event.currentTarget.files);
                              setFieldValue("images", [...values.images,...files])
                              const previews = files.map((file)=> URL.createObjectURL(file));
                              setPreviewImage(prev => [...prev, ...previews])
                            }} 
                            disabled={isSubmitting}></input>
                            <p>Seçilen dosya sayısı: {previewImage.length}</p>
                            <div className='preview-container'>
                              {previewImage.map((src,index)=> (
                                <div className='preview-container-box' key={index} >
                                <img src={src}  alt={`preview ${index}`} width={100}  />
                                <span onClick={() => {
                                  setPreviewImage((prev) => prev.filter((_, i) => index !== i ));
                                  setFieldValue("images", values.images.filter((_, i) => i !== index));
                                  }}>x</span>
                                </div>
                              ))
                              }
                            </div>
                        </div>
                    </div>
                    <button type='submit' disabled={isSubmitting || !token}>Ekle</button>
            </Form>

            )}


        </Formik>
    </div>
  )
}

export default ProductForm