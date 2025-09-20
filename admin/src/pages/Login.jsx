import React from 'react'
import {Formik, Field, Form} from "formik"

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
    <div className='form-wrapper'>
        <div className="form-container">
            <Formik initialValues={{
                email:"",
                password:""
            }}
            onSubmit={handleSubmit}
            >
            {({isSubmitting}) =>(
             <Form>
                <div>
                    <label >email</label>
                    <Field id="email" name="email" placeholder="e-mail" disabled={isSubmitting}></Field>
                    </div>
                <div>
                    <label>Sifre</label>
                    <Field id="password" name="password" type="password" placeholder="sifre" disabled={isSubmitting} ></Field>
                </div>
                  <button type='submit' disabled={isSubmitting}>Giris Yap</button>
            </Form>
            )}


            </Formik>
        </div>
    </div>
  )
}

export default Login