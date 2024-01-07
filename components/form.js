import React from 'react'
import {useState ,useEffect} from 'react';
import axios from 'axios';
// import './form.css'
export default function Form() {

    const [users,setUsers]=useState([])
    useEffect(()=>{
        fetchDataFromBackend();
    },[])

    const fetchDataFromBackend=async()=>{
        axios.get('http://localhost:3000/user/getUser')
        .then(res=>{
        console.log(res);
        setUsers(res.data);
        })
        .catch(err=>console.log(err))
    }
    // console.log(users)
    // console.log("Hello");
    const userdata=users.userData;
    // console.log(typeof(userdata));


    const[formData,setFormData]=useState({
        team:'',
        username:'',
        position:'',
        instaid:'',
        linkdin:'',
        image:'',
      });
      const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const response =await fetch('http://localhost:3000/user/addUser',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData)
          });
          if(response.ok){
            console.log('Data saved successfully');
          }
          else{
            console.error('Failed to save data');
          }
        }
        catch(error){
          console.error('Error:',error);
        }
        // axios.post('http://localhost:3000/user/addUser', formData)
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error('Error:', error));

        setFormData({
            team:'',
            username:'',
            position:'',
            instaid:'',
            linkdin:'',
            image:'',
        })
    };

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleDelete = async(id)=>{
        try{
            const response = await fetch(`http://localhost:3000/user/deleteUser/${id}`,{
                method:'DELETE',
            });
            if(response.ok){
                console.log('data deleted successfully');
                fetchDataFromBackend();
            }else{
                console.error('failed to delete');
            }
        }catch(error){
            console.error('Error:',error);
        }
    }
    return(
    <>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="exampleInputTeam">Team</label>
                <input type="text" className='name' name='team' value={formData.team} placeholder="Enter team name" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputName">Name</label>
                <input type="text" className="name" name='username' value={formData.username} placeholder="enter name" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPosition">Position</label>
                <input type="text" className="name" name='position' value={formData.position} placeholder="enter postion" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputInstagram">Instagram ID</label>
                <input type="text" className="name" name='instaid' value={formData.instaid} placeholder="enter Instagram ID" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputLinkdin">Linkdin ID</label>
                <input type="text" className="name" name='linkdin' value={formData.linkdin} placeholder="enter Linkdin ID" onChange={handleChange}/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputImage" >Image</label>
                <input type="text" className="name" name='image' value={formData.image} placeholder="enter image" onChange={handleChange}/>
            </div>
            
            <button type="submit" className="btn btn-primary">Submit</button>

        </form>
        <table>
            <tr className='head'>
            <th className='body'>Team</th>
            <th className='body'>username</th>
            <th className='body'>position</th>
            <th className='body'>instaid</th>
            <th className='body'>linkdinid</th>
            <th className='body'>image</th>
            </tr>
            {
                userdata?.map((user)=>{
                return (
                    <tr className='head' key={user._id}>
                    <td className='body'>{user.team}</td>
                    <td className='body'>{user.username}</td>
                    <td className='body'>{user.position}</td>
                    <td className='body'>{user.instaid}</td>
                    <td className='body'>{user.linkdin}</td>
                    <td className='body'>{user.image}</td>
                    <button onClick={()=>handleDelete(user._id)}>delete</button>
                    </tr>
                )
                })
            }
      </table>
    </>
    )
}