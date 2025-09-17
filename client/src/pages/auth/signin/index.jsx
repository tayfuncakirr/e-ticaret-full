import React from 'react'
import {Formik ,Field, Form} from "formik"
import { object,string } from 'yup'

function Signin() {
    const requiredMessage = "zorunlu alan"
    const signinValidations = object({
      email:string().email("geçerli bir email giriniz").required(requiredMessage),
      password:string().min(5, "en az 5 karakter giriniz.").required(requiredMessage)
    })
  return (
    <div className='form-wrapper'>
        <div className='form-container'>
            <Formik initialValues={{
                email:"",
                password:"",  
            }}
            validationSchema={signinValidations}
            onSubmit={async(values) =>{
                await new Promise((resolve) => setTimeout(resolve,500));
                console.log(values)
                
            }}
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