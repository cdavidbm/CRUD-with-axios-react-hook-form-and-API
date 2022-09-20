import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers, userSelected,  deselectUser}) => {

    const {register, handleSubmit, reset} = useForm ();

    useEffect(()=>{
        if(userSelected){
            reset(userSelected)
        }
    }, [userSelected])


    const submit = (data) =>{

        if(userSelected)
        {  axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                    .then(()=>getUsers())  
                    .catch(error => console.log (error.response));
        } else{
            console.log("Impresión Línea 27");
            console.log(data);
            axios.post("https://users-crud1.herokuapp.com/users/", data)
                 .then(()=>getUsers())  
                 .catch(error => console.log (error.response));
        }
        clear();
    };

        const clear = () =>{

            reset ({
                email: "",
                password: "",
                first_name: "",
                last_name: "",
                birthday: ""
            });
           deselectUser(); 
        };
    

    return (
         <>
         <form onSubmit={handleSubmit(submit)}>
            <div className='form-ctn'>
                <div className='form-item'>
                    <label htmlFor='email'><b>Email </b></label>
                    <input type='email' id='email' {...register("email")} />
                </div>
                <div className='form-item'> 
                    <label htmlFor='password'><b>Password </b></label>
                    <input type='password' id='password' {...register("password")}/>
                </div>
                <div className='form-item'>
                    <label htmlFor='first_name'><b>First Name </b></label>
                    <input type='text' id='first_name' {...register("first_name")}/>
                </div>
                <div className='form-item'>
                    <label htmlFor='last_name'><b>Last Name </b></label>
                    <input type='text' id='last_name' {...register("last_name")}/>
                </div>
                <div className='form-item'>
                    <label htmlFor='birthday'><b>Birthday </b></label>
                    <input type='date' id='birthday' {...register("birthday")}/>
                </div>
                <button>Send</button>
                <button onClick={clear} type='button'>Clear</button>
            </div>
         </form>
         </>
    );
};

export default UsersForm;