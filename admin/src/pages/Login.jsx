import React from 'react'
import {Formik, Field, Form} from "formik"
import "../App.css"

function Login() {
    const handleSubmit = async (values,{setSubmitting}) =>{
            try {
                const response = await fetch ("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify(values),
                })

                const data = await response.json();
                if (response.ok) {
                    if (data.user.role !== "admin") {
                        alert("admin yetkiniz yok");
                    
                    }
                    else {
                        localStorage.setItem("admin", JSON.stringify(data));
                        alert("admin giris başarılı");
                        window.location.href="/dashboard";
                    }
                 }
                 else {
                    alert (data.message || "Giris başarısız");
                 }
              }
              catch (e) {
                  console.error(e);
                  alert("sunucu hatası")
                 }
                 finally {
                    setSubmitting(false)
                 }
    }
  return (
    <div className='admin-form-wrapper'>
        <h1>Admin Girişi</h1>
        <div className="admin-form-container">
            <Formik initialValues={{
                email:"",
                password:""
            }}
            onSubmit={handleSubmit}
            >
            {({isSubmitting}) =>(
             <Form>
                <div className='admin-form'>
                    <label >email</label>
                    <Field className="form-input" id="email" name="email" placeholder="e-mail" disabled={isSubmitting}></Field>
                    </div>
                <div className='admin-form'>
                    <label>Sifre</label>
                    <Field className="form-input" id="password" name="password" type="password" placeholder="sifre" disabled={isSubmitting} ></Field>
                </div>
                  <button className='btn-login' type='submit' disabled={isSubmitting}>Giris Yap</button>
            </Form>
            )}


            </Formik>
        </div>
    </div>
  )
}

export default Login