import React from 'react'
import {
    Wrapper,
    Input,
    P,
    InputDiv,
    Button,
    B,
    R,
    Hold
  }
    from './OtpStyle'
    import Axios from 'axios'
    import { useNavigate, useParams } from 'react-router-dom';
  import Swal from 'sweetalert2';
  import { SpinnerCircular } from 'spinners-react';

const Verification = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({ error: false, msg:""});
    console.log(message)
    const [otpinput, setOtpinput] = useState("");
    const [errorotp, setErrorotp] = useState(false);
  
    const otp1 = otpinput;
    console.log(otp1);
  
    const navigate = useNavigate();
    const url = `https://apxcrypfieldbackend.onrender.com/api/verifyotp/${id}`
    const url2 = `https://apxcrypfieldbackend.onrender.com/api/resetotp/${id}`
  
      console.log(id);
  
      const Verified = (e) => {
          e.preventDefault()
          setLoading(true)
          // console.log(Data); 
          Axios.post(url, {otp: otp1})
          .then((res) => {
          localStorage.setItem("User", JSON.stringify(res.data));
          setMessage({ error: true, msg: res.data.data.message});
          // console.log(res.data.message)
          const getId = JSON.parse(localStorage.getItem("User"))
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: "Registration Successful",
            })
          //  console.log("this is the data", getId.data._id)
            setTimeout(() => {
              navigate(`/${getId.data._id}`)
              // console.log(getId._id);
            window.location.reload()
            }, [2000]);
          })
          .catch((err)=>{
          // setMessage({ error: true, msg: "err.data.data.message"});
          // console.log(err.data.data.message)
            setLoading(false)
            setErrorotp(true)
          })   
  };
  
  
  const Resend = () => {
    Axios.post(url2)
    .then((res) => {
      setMessage({ error: true, msg: res.data.data.message});
      })
      .catch((err)=>{
      setMessage({ error: true, msg: err.data.data.message});
      // console.log(err.data.data.message)
      })
  
  }
  
  return (
    <Wrapper>
      <Hold>
      <B>We sent you a code to verify your account</B>
      <P>Enter Your code here</P>
      <InputDiv>
        <Input
        value={otpinput}
        onChange={(e) => {setOtpinput(e.target.value)}}
          // name="input1"
          // type='password'
          // maxLength={1}
          // ref={input1Ref}
          // onInput={(event) => handleInput(event, input2Ref)}
          // onKeyDown={(event) => handleKeyDown(event, null)}
          // onChange={handleInputChange}
        />
      </InputDiv>
      <Button onClick={(e)=> Verified(e)}> {loading ? <SpinnerCircular size={25} thickness={100} speed={100} color="rgba(255, 255, 255, 1)" secondaryColor="rgba(0, 0, 0, 0.44)" /> : "Verify"}</Button>
     <div style={{color: "red"}}>{errorotp? "Wrong verification code" : null}</div>
      <P>I didn't receieve any code</P>
      <R onClick={()=> Resend()}>Resend code</R>
      </Hold>
    </Wrapper>
  )
}

export default Verification