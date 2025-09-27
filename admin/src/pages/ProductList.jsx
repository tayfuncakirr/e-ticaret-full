import React from 'react'
import { useEffect,useState } from 'react'
import {Formik, Field, Form} from "formik"


function ProductList() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState([]);
    const token = JSON.parse(localStorage.getItem("admin"))?.token
    const [editingProduct, setEditingProduct] = useState(null);
    const [deleteImages, setDeleteImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [category, setCategory] = useState([]);


    const fetchProducts = async() => {
    const res = await fetch(`http://localhost:5000/api/products?page=${page}&limit=10`);
    const data = await res.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setTotal(data.total);
      }
        
      useEffect(()=> {
        if(editingProduct) {
            setExistingImages(editingProduct.images || []);
            setNewImages([]);
            setDeleteImages([]);
        }
      },[editingProduct])

      const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages((prev) => [...prev, ...files])
    }
      useEffect(() => {
            fetchProducts();
      },[])
    const handleDelete = async (id) =>{
        if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
        try {
            const res = await fetch (`http://localhost:5000/api/products/${id}`, {
                method:"DELETE",

                 headers:{Authorization:"Bearer " + token,}
            });
            if (!res.ok) {
                const text = await res.text();
                console.log("silme hatası", text);
                alert("silme başarısız")
                return;
            }
            alert("ürün silindi");
            fetchProducts();
         }  catch (e) {
            console.error ("hata", e)
         }
    }
    useEffect(() => {
        const categoryData = async () => {
            try {
                
        const response =  await fetch ("http://localhost:5000/api/categories");
        const data = await response.json();
         setCategory(data);   
            }
            catch (e) {
                console.error("category çekme hatası", e)
            }
    };
    categoryData();
    },[])
    
  return (
    <>
    <div>
        {products.map((product) => (
            <div key={product._id}>
                {product.images && product.images.length > 0 &&(
                    <img  src={`http://localhost:5000/${product.images[0].replace(/^\/+/, '')}`}  alt={product.name} width={100}/>
                )}
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>{product.stock}</p>
                <p>{product.price}</p>
                 
                <button onClick={() => setEditingProduct(product)} disabled= {!token}>Ürünü Düzenle</button>
                <button onClick={() => handleDelete(product._id)} disabled= {!token} >Ürünü Sil</button>
                <hr />
            </div>
        ))}
    </div>

    {editingProduct && (
        <div>
            <Formik
                enableReinitialize= {true}
                initialValues={{
                    name:editingProduct.name ?? "",
                    price:editingProduct.price ??"",
                    stock:editingProduct.stock ?? "",
                    description:editingProduct.description ?? "",
                    category:editingProduct.category ?? "",
                }}
                onSubmit={async (values, {setSubmitting}) => {
                    console.log("gönderilen: ", values)
                    try {
                        const formData = new FormData();
                        formData.append("name", values.name);
                        formData.append("price", values.price);
                        formData.append("stock", values.stock);
                        formData.append("description", values.description);
                        formData.append("category",values.category || "");

                        newImages.forEach((file) => formData.append("images", file));

                        if (deleteImages.length > 0) {
                            formData.append("deleteImages", JSON.stringify(deleteImages))
                        }

                        const response = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`,{
                            method:"PUT",
                            headers: {Authorization: "Bearer " + token},
                            body: formData,
                        });
                        if (!response.ok) {
                            throw new Error ("Güncelleme başarısız");
                        }
                        const data = await response.json();
                        alert ("Ürün başarıyla güncellendi");
                        setEditingProduct(data);
                        setExistingImages(data.images);
                        setNewImages([]);
                        setDeleteImages([]);
                        fetchProducts();
                    }
                        catch (e) {
                            console.error(e);
                            alert("Güncelleme sırasında hata oluştu");
                        }
                        finally {
                            setSubmitting(false);
                        }

                }}
            >
                {({isSubmitting}) => (
                    <Form>
                        <div>
                            <label >Ürün adı</label>
                            <Field name="name" placeholder="ürün adı"></Field>
                        </div>
                        <div>
                            <label >Stok </label>
                            <Field name="stock" type="number" placeholder="stok durumu"></Field>
                        </div>
                        <div>
                            <label >fiyat</label>
                            <Field name="price" type="number" placeholder="fiyat"></Field>
                        </div>
                        <div>
                            <label >açıklama</label>
                            <Field name="description" placeholder="açıklama"></Field>
                        </div>
                        <div>
                            <label htmlFor="category">category</label>
                            <Field id="category"  as="select" name="category" placeholder="" >
                                {category.map((cat) => ( 
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    
                                ))}
                            </Field>
                        </div>
                        <div className='images-update'>
                            <input type="file"
                                     multiple onChange={handleImageChange} 
                                     placeholder='fotoğraf ekle' />
                            {existingImages.map((img, i) =>{
                                return (
                              //  const src = typeof img === "string" ? `http://localhost:5000${img}` : URL.createObjectURL(img);
                                      
                                    <div key={i}>
                                        <img src={`http://localhost:5000${img}`} alt={`prewiew-${i}`} width={50} />
                                        <button type="button"
                                         onClick={() => {
                                            
                                                setDeleteImages((prev) => [...prev, img] )
                                            
                                            setExistingImages((prev) => prev.filter((i) => i !== img));
                                         }}
                                        >x</button>
                                </div>
                                )
                            })}
                            {newImages.map((file,i) =>(
                                <div key={`new-${i}`}>
                                    <img src={URL.createObjectURL(file)} width={50}  />
                                    <button type="button" onClick={() => {
                                        setNewImages((prev) => prev.filter((_,index) => 
                                            index !== i ))
                                            }}>x</button>
                                </div>
                            ))}
                                
                        </div>
                        <button type='submit'  disabled={isSubmitting}>güncelle</button>
                        <button onClick={() => setEditingProduct(null)}>iptal</button>
                    </Form>
                )}
            </Formik>
        </div>
    )} 
    <button onClick={() => setPage(page -1)} disabled={page === 1}>Önceki</button>
    <span>{page} / {totalPages}</span>
    <button onClick={() => setPage(page +1)} disabled={page === totalPages}>Sonraki</button>
    <span> Toplam Ürün: {total}</span>
    </>
  )
}

export default ProductList