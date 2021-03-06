import axios from 'axios';
import { useState, useEffect } from 'react'
import Search from './Search'
import './App.css'



function App() {
  useEffect(() => {
    getOpenLib();
    // getComics();

  }, [])

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])


  /// get request to API with author params
  const getOpenLib = () => {
    axios({
      method: 'GET',
      url: "http://openlibrary.org/search.json?author=tolkien&limit=50"
    }).then((response) => {
      /// set useState books to response.data
      console.log('specific name----->', response.data.docs[0].name);
      console.log('response.data ------->', response.data)
      setBooks(response.data);
      console.log('books.docs------>', books.docs)
    })


  }
  // rename books array
  let booksArray = books.docs

  // console.log('5 objects books------->', books.docs)

  ////// I have to use index to get all the objects from response
  ///// large object ?????


  const getSearchResults = (search) => {
    setSearch(search)
    //// this chunk is from stackOverFlow
    /// how to get rid search spaces .join("") = no spaces and filters 
    /// .include checks to see if (search) is there returns boolean
    if (search !== "") {
      const bookList = booksArray.filter((book) => {
        return Object.values(book) // ?????????? Ask matt
          .join("")
          .includes(search);
      })
      //// search results will have the filtered booksArray
      setSearchResults(bookList)
    } else {
      /// else it will show the entire book array
      setSearchResults(booksArray)
    }
  }
  console.log('all the books with search keyword in it', searchResults)


  // const getComics= () =>{
  //   axios({
  //     method: 'GET',
  //     url: "http://comicvine.gamespot.com/api/issues/?api_key=6527d653b13545a3a86c6c9014f2b9aee5488ab2&format=JSON&limit=2"
  //   }).then((response) => {
  //     JSON.stringify(response)
  //     console.log(response.data);
  //     setBooks([response.data]);
  //   })
  // }


  // console.log('testing for map', books.docs)

  return (
    <>
      <div className='container'>
        {/* {JSON.stringify(books)} */}

        {/* pass search and searchResults as props to search component */}
        <Search search={search} searchResults={getSearchResults} />


        {/* loop through booksArray */}
        <ul className='list'>
          {booksArray &&
            booksArray.map((book, i) => {
              return (<li key={i} className='list-book'>{book.title}
              </li>
              );
            })}
        </ul>


    {/* Last step is to loop through searchResults  if else */}


    {/* <ul >
          {searchResults &&
            searchResults.map((book, i) => {
              return (<li key={i} className='list-book'>{book}
              </li>
              );
            })}
        </ul> */}


      </div>



    </>
  )



}

export default App;