import React from 'react'
import { useState } from 'react'



function CategoryForm() {
    const token = JSON.parse(localStorage.getItem("admin"))?.token;
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

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

}
catch (e) {
    console.error(" hata" , e);
    alert("kategori eklerken hata oluştu")
}
}
  return (
    <div>
       <form onSubmit={handleSubmit}>
        <div>
            <label>Kategori adı</label>
            <input type="text" value={name}  onChange={(e) => setName(e.target.value) } />
        </div>
        <div>
            <label htmlFor="">Fotoğraf ekle</label>
            <input type="file"  accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type='submit'>Kategori Ekle</button>
       </form>
    </div>
  )
}

export default CategoryForm