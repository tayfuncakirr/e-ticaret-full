import React from 'react'
import { Formik,Field,Form } from 'formik'
import {object,string} from "yup"
import { useNavigate } from 'react-router-dom'

function  Signup() {
const navigate = useNavigate();
const requiredMessage = "zorunlu alan"
const signUpValidations = object({
    name:string().required(requiredMessage),
    surname:string().required(requiredMessage),
    email:string().email("geçerli bir email giriniz").required(requiredMessage),
    password:string().min(5, "en az 5 karakter giriniz").required(requiredMessage)
})

const handleSubmit = async (values, {setSubmitting,resetForm}) => {
    try {
        const response = await fetch("http://localhost:5000/api/auth/register",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify(values),
        });
        const data = await response.json();
        console.log(data);

        if (response.ok) {
            alert ("kayıt başarılı");
            resetForm();
            navigate("/signin");
        }
        else {
            alert(data.message);
        }
    }
    catch (e) {
            console.log(e);
            alert("bir hata oluştu");
        }
    finally {
        setSubmitting(false);
    }
}

  return (
    <div className='form-wrapper'>
        <div className="form-container">
            <Formik
            initialValues={{
                name:"",
                surname:"",
                email:"",
                password:"",
            }}
            validationSchema={signUpValidations}
            onSubmit={handleSubmit}
            >
             
               {({isSubmitting,errors,touched}) =>(
                <Form>
                 <div>
                    <label htmlFor="name">ad</label>
                    <Field id="name" name="name" placeholder="adınızı giriniz" disabled={isSubmitting}></Field>
                    {errors.name && touched.name && <div>{errors.name}</div>}
                </div>
                <div>
                    <label htmlFor="surname">soyad</label>
                    <Field id="surname" name="surname" placeholder="soyadınızı giriniz" disabled={isSubmitting}></Field>
                    {errors.surname && touched.surname && <div>{errors.surname}</div>}
                </div>
                <div>
                    <label htmlFor="email">e-mail</label>
                    <Field id="email" name="email" type="email" placeholder="email giriniz" disabled={isSubmitting}></Field>
                    {errors.email && touched.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">şifre</label>
                    <Field id="password" name="password" type="password" placeholder="şifrenizi giriniz" disabled={isSubmitting}></Field>
                    {errors.password && touched.password && <div>{errors.password}</div>}
                </div>
                <button type='submit' disabled={isSubmitting}>gönder</button>
             </Form>
             )}
            </Formik>
        </div>
    </div>
  )
}

export default  Signup