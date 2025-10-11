import React, { useEffect } from 'react'
import { useState } from 'react'
import {Formik, Field, Form} from "formik"



function CategoryForm() {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newImage, setNewImage] = useState();
    const [removeImage, setRemoveImage] = useState(false);

    useEffect(() =>{
            fetch ("http://localhost:5000/api/categories")
            .then (res => res.json())
            .then (data => setCategory(data))
        },[])
        const updatedCategoryList = (id)=> {
        setCategory(prev => prev.filter(c => c._id !== id))
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try 
            {
             const formData = new FormData();
             formData.append("name", name);
             if (image) {
             formData.append("image", image)
                        }
        const response = await fetch("http://localhost:5000/api/categories", {
            method:"POST",
            headers: {
                Authorization:"Bearer " + token,
            },
            body:formData,
        });

        if (!response.ok) {
            const text = await response.text();
            console.log("backend hata:" , text);
             alert ("kategori eklenemedi")
             return;
        }
            
        const data = await response.json();
        alert("Kategori başarıyla eklendi")
        setName("");
        setImage(null);
        setCategory(prev => [...prev, data])

}
catch (e) {
    console.error(" hata" , e);
    alert("kategori eklerken hata oluştu")
}
}
    const deleteCategory = async(id) =>{
        if (!window.confirm("Kategori yi silmek istedğinizden eminmisiniz")) return;
        const res = await fetch (`http://localhost:5000/api/categories/${id}`,{
            method:"DELETE",
            headers: {
                Authorization: "Bearer " + token,
            },

        });
           
        if (!res.ok) { 
            console.log("silme hatası", data)
            alert("silme başarısız")
        }
          alert ("kategori silindi")
          updatedCategoryList(id);
         // setCategory(prev => prev.filter(c => c._id !== id))
          
    }
         
          
        
  return (
    <div>
       
        <form onSubmit={handleSubmit} className='category-form-wrapper'>
            <div className='category-form-container'>
        <div>
            <label>Kategori adı</label>
            <input type="text" value={name} placeholder='Kategori Adı' onChange={(e) => setName(e.target.value) } />
        </div>
        <div>
            <label htmlFor="">Fotoğraf ekle</label>
            <input type="file"  accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type='submit' disabled= {!token}>Kategori Ekle</button>
        </div>
       </form>
       
       <div className='category-list-wrapper'>
                {category.map((cat)=>(
                <div className="category-list" key={cat._id}>
                    <p>{cat.name}</p>
                    <div className="category-btn-container">
                      <button onClick={() => setEditingCategory(cat)} disabled= {!token} >Düzenle</button>
                      <button onClick={() => deleteCategory(cat._id)} disabled= {!token}>Sil</button>
                    </div>
                </div>
            ))}
            
            {editingCategory && (
                <div>
                    <Formik 
                    enableReinitialize= {true}
                    initialValues={{
                        name:editingCategory.name,
                        image:null
                    }}
                    onSubmit={async(values) => {
                        console.log(values)
                        try {
                            const formData = new FormData();
                            formData.append("name", values.name);
                            if(newImage) {
                                formData.append("image", newImage);
                            }
                            else if(removeImage) {
                                formData.append("removeImage", true);
                            }

                            const response = await fetch (`http://localhost:5000/api/categories/${editingCategory._id}`,{
                                method:"PUT",
                                headers: {
                                    Authorization:"Bearer " + token,
                                },
                                body: formData
                            });
                            if (!response.ok) {
                               alert("Güncelleme Başarısız")
                            }
                            const data = await response.json();
                            alert("Kategori güncellendi");
                            setCategory(prev => prev.map(cat =>
                                cat._id === editingCategory._id ? data : cat
                            ));
                            setNewImage(null);
                            setRemoveImage(false);
                            setEditingCategory(null);
                            
                        }
                        catch (e) {
                            console.error("hata oluştu", e )
                        }
                    }}>
                        {({setFieldValue}) =>(
                            <Form>
                            <div>
                            <Field name="name" ></Field>
                            <input type="file"
                             onChange={(e) => {setFieldValue("image", e.target.files[0]);
                                setNewImage(e.target.files[0])
                            }}
                            />
                            {editingCategory.image && !removeImage &&(
                                <img src={`http://localhost:5000${editingCategory.image}`}
                                 alt={editingCategory.name}  width={50}/>
                            )}
                            <span onClick={() => setRemoveImage(true)}>x</span>
                            </div>
                            <button type='submit'>güncelle</button>
                            <button type="button" onClick={() => setEditingCategory(null)}>iptal</button>
                        </Form>
                        )}
                    </Formik>
                    </div>
                    )}
         </div>
    </div>
  )
}

export default CategoryForm