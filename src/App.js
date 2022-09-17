import { useEffect, useState , useRef } from 'react';
import './App.css';

function App() {
  const [ users, setUsers] = useState([]);
  const [ idpost, setIdPost] = useState("");
  const [ id, setId ] = useState('');
  const [ result, setResult ] = useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  //{ current : 현재값 }

  const getUserList = async ()=>{
      const data = await fetch('http://localhost:3500');
      const rawdata = await data.json() ;
      setUsers(rawdata);
  }

  const postIdpost = async ()=>{
      const post =  {
                idpost : "idpost jemicom"
              }
      const data = await fetch('http://localhost:3500/idpost', {
              method: "post",
              headers :{
                'content-type' : 'application/json',
              },
              body:JSON.stringify(post)
      });
      const rawdata = await data.json() ;
      console.log( rawdata.data );
      setIdPost( rawdata.data )
  }
  useEffect(()=>{
    getUserList();
    // postIdpost();
  },[])

  useEffect(()=>{
    getUserList();
  },[users])
  // users 가 변경될때만 갱신 

  const handleChange = (e)=>{
      //console.log(e.target.value);
      setId(e.target.value);
  }
  
  const handleSubmit = ( )=>{
    const post =  {
        ui_id : id 
    }

    fetch("http://localhost:3500/login",{
      method:'post',
      headers : { "content-type" :"application/json"},
      body:JSON.stringify(post)
    }).then( data=>data.json())
    .then( data => {
      console.log(  data.success ? "로그인" : "데이터를 확인하세요.");
      setResult( data.success ? "로그인" : "데이터를 확인하세요." );
    })
    setId('');
  }

  const handleSignUp = ()=>{
    const post = {
        ui_id : id, 
        ui_pwd : id,
        ui_name : nameRef.current.value, 
        ui_email : emailRef.current.value, 
    }
    console.log( post );
  
    fetch("http://localhost:3500/sign-up",{
      method:'post',
      headers : { "content-type" :"application/json"},
      body:JSON.stringify(post)
    }).then( data=>data.json())
    .then( data => {
      console.log(  data.success ? "가입처리되었습니다." : "데이터를 확인하세요.");
      setResult( !data.success.isBoolean ? data.success : data.success ? "가입처리되었습니다" : "데이터를 확인하세요." );
    })
  }

  const handleUpdate = ()=>{
    const post = {
        ui_id : id, 
        ui_name : nameRef.current.value, 
        ui_email : emailRef.current.value, 
    }
    console.log( post );
   
    fetch("http://localhost:3500/update",{
      method:'put',
      headers : { "content-type" :"application/json"},
      body:JSON.stringify(post)
    }).then( data=>data.json())
    .then( data => {
      console.log(  data.success ? "수정되었습니다." : "데이터를 확인하세요.");
      setResult( data.success ? "수정되었습니다" : "데이터를 확인하세요." );
    })
  }
  const handleDelete = ()=>{
    const post =  {
      ui_id : id 
    }

    fetch("http://localhost:3500/delete",{
      method:'delete',
      headers : { "content-type" :"application/json"},
      body:JSON.stringify(post)
    }).then( data=>data.json())
    .then( data => {
      console.log(  data.success ? "삭제되었습니다." : "데이터를 확인하세요.");
      setResult( data.success ? "삭제되었습니다." : "데이터를 확인하세요." );
    })
   
  }

  return (
    <div className="App">
      <header>  
          <h1>
              { idpost } 
              { result }
          </h1>
      </header>
      <div className="form-container">
          <input type="text" name="id" placeholder='아이디를 입력하세요.'
                 onChange={ handleChange }
          />
          <input type="text" name="name" placeholder='수정할 이름을 입력하세요.'
                 id="ui_name"
                 ref={nameRef}
          />
          {/* ref={nameRef} = document.querySelector('#ui_name').value, */}
          <input type="text" name="email" placeholder='수정할 이메일을 입력하세요.'
                 ref={emailRef}
          />

          <div className="ctrlBtns">
              <button onClick={ handleSubmit }>로그인</button>
              <button onClick={ handleUpdate }>수정</button>
              <button onClick={ handleDelete }>회원탈퇴</button>
              <button onClick={ handleSignUp }>회원가입</button>
              
          </div>
      </div>
      <section> 
          {
              users.length ?  users.map( user => (
                  <div key={user.ui_num}>  
                    {user.ui_id}  {user.ui_name} {user.ui_email} 
                  </div>
              )) : 'loadding ...'
          }
      </section>
      <footer> footer </footer>
    </div>
  );
}

export default App;
