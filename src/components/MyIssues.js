import React, { Component } from 'react';
import './App.css';
import './Mystyle.css'
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';
import Modal from 'react-modal'
import Pagination from './Pagination'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
  
        shortDescription:'',
        description:'',
        showMessage:false,
        products:[],
        toggle:true,
        currId:null,
        isOpen:false,
        isOpenUpdate:false,
        issueNo:1,
        currPage:1,
        updatedname:"",
        updateddes:"",
        issuesLimit:10,
        loading:false,
        id:1,
        backup:null
    }
    
    this.proref= React.createRef();
    this.desref= React.createRef();
    this.updatenameref=React.createRef();
    this.updatedesref=React.createRef();

  }

  componentDidMount=()=>{
    var url='http://localhost:5000/users/issues'
    axios.get(url)
    .then(res=>{
      console.log(res);
      if(res!=null){
        var tempObj=res.data;

        this.setState({
          products:tempObj,
          backup:tempObj
        })
  
      }
    }).catch(err=>console.log('error is',err))
  }

  //register product
  sendData=()=>{
     if(this.proref.current.value=="" || this.desref.current.value==""){
       alert(` Full Description and short description should not be empty`);
      }
     else{
      var url='http://localhost:5000/users/add-issue'
      axios.post(url,{
        shortDescription:`${this.proref.current.value}`,
        description:`${this.desref.current.value}`,
        date:new Date(),
        id:this.state.id,
        name:"vinoth",
        url:"no url needed now",
        number:this.state.id,
        label:"issue",
        state:"isOpen",
        locked:true

      })
      .then(res=>{
        console.log("res is ",res);
        if(res!=null){
  
          var obj={
            shortDescription:this.proref.current.value,
            description:this.desref.current.value,
          };
          var arr=[...this.state.products];
           arr.push(obj);
          this.setState({
            showMessage:true,
            products:arr,
            shortDescription:'',
            description:'',
            id:this.state.id+1

          })
        }
      }).catch(err=>console.log('error is',err))

     }
   
  }

  deleteItem=(id)=>{
    const filteredItems= this.state.products.filter(item =>
      item._id!==id);

      var url=`http://localhost:5000/users/delete-issue/${id}`
   axios.delete(url)
   .then(res=>{
     if(res!=null){
       console.log('the data is ',res);
     }
   }).catch(err=>console.log('error is',err))


   this.setState({
     products:filteredItems,
     backup:filteredItems
   })

   }

   //Update product
   updateItem=()=>{

     var id=this.state.currId
     var tempdata=this.state.products
     for(let i=0;i<tempdata.length;i++){
         if(id==tempdata[i]._id){
           tempdata[i].shortDescription=this.updatenameref.current.value
           tempdata[i].description=this.updatedesref.current.value
           }
     }
       var url=`http://localhost:5000/users/update-issue/${id}`
    axios.patch(url,{shortDescription:`${this.updatenameref.current.value}`,
                 description:`${this.updatedesref.current.value}`,
               
   })
    .then(res=>{
      if(res!=null){
        console.log('the data is ',res);
      }
    }).catch(err=>console.log('error is',err))


    this.setState({
      products:tempdata,
      updatedname:'',
      updatedprice:'',
      updateddes:'',
      toggle:true
    })

    }

    Updatefirst=(id)=>{
     const tempdata=this.state.products
     for(let i=0;i<tempdata.length;i++){
         if(id==tempdata[i]._id){
           var sdes=tempdata[i].shortDescription
           var fdes=tempdata[i].description
         }
     }

     this.setState({
        updatedname:sdes,
        updateddes:fdes,
        currId:id
     },()=>this.openModalUpdate())
    }


      
  changeValuename=(e)=>{
    this.setState({
      updatedname:e.target.value
    })
  }
  changeValuedes=(e)=>{
        this.setState({
          updateddes:e.target.value
        })
      }
    
          valueChange1=(e)=>{
            this.setState({
              shortDescription:e.target.value
            })
          }

          valueChange2=(e)=>{
            this.setState({
              description:e.target.value
            })
          }

          
          openModal=()=>{
            this.setState({
              isOpen:!this.state.isOpen
            })
          }
          openModalUpdate=()=>{
            this.setState({
              isOpenUpdate:!this.state.isOpenUpdate
            })
          }

          modalSubmit=()=>{
            console.log('called modal subimit');
          }

          paginationfunc=(pageno)=>{
            this.setState({
               currPage:pageno
            })
          }
          filterMethod=()=>{
            var select=document.getElementById('issues');
            var value=select.options[select.selectedIndex].value;
            if(value=='All'){
               this.setState({
                 products:this.state.backup
               })
            }else{
              const filtertedValues= this.state.backup.filter(item =>
                item.state===value);
               console.log('filtered called');
                this.setState({
                  products:filtertedValues
                })
            }
            
          }
         


render(){

   var cls=(this.state.toggle===true)?'pro-update-hidden':'pro-update-visible';  
   var val4=this.state.shortDescription
   var val5=this.state.description
   const indexOfLastIssue=this.state.currPage* this.state.issuesLimit;
   const indexOfFirstIssue=indexOfLastIssue-this.state.issuesLimit;
   const tempProducts=this.state.products;
   const currentIssues=tempProducts.slice(indexOfFirstIssue,indexOfLastIssue);
  
   var val1=this.state.updatedname
   var val2=this.state.updateddes
   //const time=Date.now();
   //console.log(new Date());
   const newDate=new Date;
   const time=new Date();
  

  return (
   <> 

    <div className="App">
       <h1> Github Issues </h1>
       <div >
     <Modal isOpen={this.state.isOpen}>
       <div class="header">
       <h2 style={{fontFamily:"courier,arial,helvetica",marginTop:"5px"}}>
         
#{this.state.issueNo} Issue description
</h2>
       </div>

       <div>
       <input class="short-des" value={val4} onChange={this.valueChange1}
        ref={this.proref} type="text" placeholder="Enter your short descrition here"></input>
       </div>
       <div>
       <textarea  value={val5} onChange={this.valueChange2} ref={this.desref} 
       class="full-des" type="text" placeholder="Enter your full descrition here"></textarea>
       </div>
       <button onClick = {this.sendData} class="submit">Submit</button>
        
       <button className="modal-close" onClick={this.openModal}>Close</button>
     </Modal>
     <Modal isOpen={this.state.isOpenUpdate}>
       <div class="header">
       <h2 style={{fontFamily:"courier,arial,helvetica",marginTop:"5px"}}>
         
#{this.state.issueNo} Issue description
</h2>
       </div>

       <div>
       <input class="short-des" value={val1} 
       onChange={this.changeValuename} 
        ref={this.updatenameref} type="text" placeholder="Enter your short descrition here"></input>
       </div>
       <div>
       <textarea  value={val2}
        onChange={this.changeValuedes} 
        ref={this.updatedesref} class="full-des" type="text" placeholder="Enter your full descrition here"></textarea>
       </div>
       <button onClick = {this.updateItem} class="submit">Submit</button>
        
       <button className="modal-close" onClick={this.openModalUpdate}>Close</button>
     </Modal>
       </div>
       <div style={{marginBottom:"20px"}}>
       <select id="issues" name="issue" form="issueform">
  <option value="All">All</option>
  <option value="isOpen">isOpen</option>
  <option value="Closed">Closed</option>
</select>
       <button class="primary" onClick={()=>this.filterMethod()}>Filter Apply</button>
       <button class="primary" onClick={this.openModal}>Open New Issue</button>
       </div>
      
        <div className='product'>
          <div className="issueheader">
           <span style={{fontWeight:"bold"}}>{this.state.products.length} Open</span> 0 Closed
          </div>
        {currentIssues.map(item=>{
          return <div class="items"><p  key={item._id}><InfoIcon></InfoIcon> 
          {item.shortDescription}
      <p className="del"><EditIcon onClick={()=>this.Updatefirst(item._id)}></EditIcon>
      <DeleteIcon onClick={()=>this.deleteItem(item._id)}style={{marginLeft:"10px"}}></DeleteIcon>
        </p>
        </p><p style={{fontSize:"15px"}}>{item.date}</p></div>
           
        })}
        </div>
        <div>
        <Pagination className="page" issuesLimit={this.state.issuesLimit}
        totalIssues={this.state.products.length}
        paginate={this.paginationfunc}
        />
        </div>
        
     </div>
        
</>
  );
  }
  
  }
