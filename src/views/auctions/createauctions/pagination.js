import React from 'react';
import {  Pagination, PaginationItem, PaginationLink } from "reactstrap";

const pagination=({postPerPage,totalPosts,paginate})=> {
  const pageNumbers=[];
for(let i=1; i <= Math.ceil(totalPosts/postPerPage); i++){
        pageNumbers.push(i)
        
    }
    return (
        
        <div>
       
         {pageNumbers && pageNumbers.map(number=>(
                   <Pagination aria-label="Page navigation example">
                    <PaginationItem  key={number}>
                        <PaginationLink onClick={()=>paginate(number)}>
                     {number}
                        </PaginationLink>
                    </PaginationItem>
                    </Pagination>
                         ))}
                          
                           </div>
                  
               

    );
}

export default pagination;