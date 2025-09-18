import React from 'react'
import {Formik ,Field, Form} from "formik"
import { object,string } from 'yup'

function Signin() {
    const requiredMessage = "zorunlu alan"
    const signinValidations = object({
      email:string().email("geçerli bir email giriniz").required(requiredMessage),
      password:string().min(5, "en az 5 karakter giriniz.").required(requiredMessage)
    });

    const handleSubmit = async (values,{setSubmitting, resetForm}) => {

        try {
            
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(values)
        });

        const data =await response.json();
        console.log(data);
        if(response.ok){
            const {token, user} = data;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user))
            alert("giriş başarılı");
            resetForm();
        }
        else {
            alert(data.message)
        }
        
    }
    catch(e) {
            console.log(e);
            alert("bir hata oluştu")
        }
        finally {
            setSubmitting(false);
        }
        }
  return (
    <div className='form-wrapper'>
        <div className='form-container'>
            <Formik initialValues={{
                email:"",
                password:"",  
            }}
            validationSchema={signinValidations}
            onSubmit={handleSubmit}
              >
             {({isSubmitting,errors, touched}) => (
                <Form>
                <div>
                    <label htmlFor="email">email</label>
                <Field id="email" name="email" type="email" placeholder="email giriniz" disabled={isSubmitting}></Field>
                {errors.email && touched.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">password</label>
                <Field id="password" name="password" type="password" placeholder="sifre giriniz" disabled={isSubmitting}></Field>
                {errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <button type="submit" disabled={isSubmitting} >Giriş Yap</button>
             </Form>
             )}
</Formik>
        </div>
    </div>
  )
}

export default Signin