import React from 'react'
import { Formik,Field,Form } from 'formik'
import {object,string} from "yup"

function  Signup() {
const requiredMessage = "zorunlu alan"
const signUpValidations = object({
    name:string().required(requiredMessage),
    surname:string().required(requiredMessage),
    email:string().email("geçerli bir email giriniz").required(requiredMessage),
    password:string().min(5, "en az 5 karakter giriniz").required(requiredMessage)
})

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
            onSubmit={async(values) => {
             await new Promise((resolve) => setTimeout(resolve,500))
             console.log(values)
            }}
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