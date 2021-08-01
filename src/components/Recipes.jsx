import React, { useState } from 'react';
import './../layout.css';

const Recipes =()=>{
    const [query, setQuery] = useState("")
    const [recipe, setRecipe] = useState([])
            const getRecipes =async()=>{
                try{
                let response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${process.env.REACT_APP_ID}&app_key=${process.env.REACT_APP_KEY}&&health=alcohol-free`)

                let result = await response.json()
                setRecipe(result.hits)
                //console.log(result.hits)
            }
            catch(err){
                console.log(err)
            }
        }      
   

    const handleSubmit =(e)=>{
        e.preventDefault()
        getRecipes()
        
    }

    const handleChange =(e)=>{
        setQuery(e.target.value)
    }
    return(
        <>
        <div className="main container">
            <h2 className="text-white pt-3 mb-4">Recipe PlaZa</h2> <hr className="hr-line"/>
           <div className="row mb-5">
               <div className="col-12 searchArea">
                    <nav className="navbar navbar-light justify-content-center">
                        <form className="form-inline" onSubmit={handleSubmit}>
                            <div className="input-group mb-3">
                                <input className="form-control searchBox" type="search" placeholder=""
                                name='search'
                                value={query}
                                onChange={handleChange}
                                 />

                                <button
                                 className="btn btn-warning searchBtn" type="submit">Search</button>
                            </div>
                            {/* <label for="sel1" className="p-2 text-white">Select list: </label>
                            <select id="sel1">
                                <option>Rice</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select> */}
                        </form>
                    </nav>
               </div>

           </div>
           <div className="row d-flex justify-content-center">
              {
                  recipe.map((item,index)=>{
                      return(
                          item.recipe.image.match(/\(jpeg|jpg|gif|png $/)) !=null &&(
                        <div className="col-lg-3 col-md-4 col-sm-12 col-12 m-1 card" onClick={()=>{window.open(item.recipe.url)}}>
                           <img className="rounded mx-auto d-block pt-3" src={item.recipe.image} />
                            <p className="pt-2">{item.recipe.label}</p>
                            <a href={item.recipe.url}></a>
                         </div>
                      )
                  })
              }
               {/* <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <p>Image</p>
                    <h2>label</h2>
                    <p>link</p>
               </div>

               <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <p>Image</p>
                    <h2>label</h2>
                    <p>link</p>
               </div> */}


           </div>
        </div>
        </>
    )
}
export default Recipes;