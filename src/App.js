import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('books');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || books state || books array of objects
  const [books, setbooks]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [author, setAuthor]=useState('');
  const [isbn, setIsbn]=useState('');

  // form submit event
  const handleAddBookSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let book={
      title,
      author,
      isbn
    }
    setbooks([...books,book]);
    setTitle('');
    setAuthor('');
    setIsbn('');
  }

  // delete book from LS
  const deleteBook=(isbn)=>{
    const filteredBooks=books.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setbooks(filteredBooks);
  }
  const resetClick=()=>{
    setTitle({title:""})
  }
  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('books',JSON.stringify(books));
  },[books])

  return (
    <div className='wrapper'>
      <h1>Angular - Crud Operaction</h1>

      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddBookSubmit}>
           <div className='info'>
           <label className='name'>Name</label><br/>
            <input type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Name"></input>
           </div>
           <div>
           <label className='label'>Designaction</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setAuthor(e.target.value)} value={author} placeholder="Designaction"></input>
           </div>
            <div>
            <label className='label'>Salary</label>
            <input type="text" className='form-control' required placeholder='Salary'
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            </div><br/>
            <button type="submit" className='reset' onClick={resetClick}>
              Reset
            </button>
            <button type="submit" className='save'>
              Save
            </button>
          </form>
        </div>

        <div className='view-container'>
          {books.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead className='table-responsive-head'>
                  <tr>
                    <th>Name</th>
                    <th>Designaction</th>
                    <th>Salary</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <View books={books} deleteBook={deleteBook}/>
                </tbody>
              </table>
            </div>
            <button className='removeall'
            onClick={()=>setbooks([])}>Remove All</button>
          </>}
          {books.length < 1 && <div>No books are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App
