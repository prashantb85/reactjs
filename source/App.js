/**
 * Search Component: A React component that takes the input from user and provides suggestions in intellisens.
 * It allows to select data from intellisense and put it in the text box to search. 
 * Features:
 * 1. User knows already present data which system knows for effective search.
 * 2. Intellisense provides feature to not to type anything as it shows already present data.
 * 3. The component would have features to be completely configurable for generalized purpose of use.
 * 4. The component is also include responsiveness in upcoming versions.
 */

import {  createContext, useContext, useState,useEffect } from 'react';
import './App.css';

const TxtSearchContext  = createContext();

const dataList  = 
  [{id:"1",name:"abc"},{id:"2",name:"def"},{id:"3",name:"ghi"}];

  

function App() {

  // const [dataList, setPost] = useState(null);

  // useEffect(() => {
  //   axios.get("/data.json").then((response) => {
  //     setPost(response.data);
  //     console.log("response.data"+response.data);
  //   });
  // }, []);

  //console.log("dataList"+dataList.map( (item)=>{<p>(item.firstName)</p>}  ));

  const[showIntellisense,setShowIntellisense] = useState(false);
  const[txtSearchValue,setTxtSearchValue] = useState('');
  const onChange=(e)=>{setTxtSearchValue(e.target.value) };

  const Search=()=>{alert(txtSearchValue)};

  const  txtSearchShowIntellisense  = ()=>setShowIntellisense(true);  

  return (
    <div className="component" >
       <div>
          <input id="txtSearch" value={txtSearchValue} key="keyTextSearch" 
          onKeyDown={txtSearchShowIntellisense}
          onChange={onChange}
          type="text"
          placeholder='Search Data'
          />
          
          <button id="btnSearch" onClick={Search} key="keyBtnSearch">Search</button>
          
          {
          showIntellisense && txtSearchValue.length!==0 ? <TxtSearchContext.Provider value={txtSearchValue}>
                                <Intellisense change={setTxtSearchValue} intellisense={setShowIntellisense} /> 
                              </TxtSearchContext.Provider> 
                            : null}
        </div>
    </div>
  );
}

const Intellisense=(props)=>{

  const txtSearchSelectedValue  = useContext(TxtSearchContext);
  
  const dataColumn  = "name";

  const filteredNames = dataList.filter(
    (item) =>{
      return item.name.toLowerCase().startsWith(txtSearchSelectedValue)
    }
  )
  return(
          <div className="intellisense" id="divIntellisense" >
              {
                filteredNames.map( (item)=> 
                  {
                    return <div key={item.id} 
                    onClick={()=>{props.change(item.name);props.intellisense(false);} } 
                    className="intellisenseItems">{item.name} 
                    </div>;
                  })        
              }

          </div>

        );
}

export default App;
