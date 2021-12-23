import React from 'react';

const Pagination = ({totalPages, page, changePage}) => {

    const doubleLeft = "<<<";
    const doubleRight = ">>>";

    function setPagesArray (totalPages){
        let result =[];
        for (let i=0;i<totalPages; i++){
            result.push(i+1);
        }
        return result
    }

    function CreateBigArrayPages(page,totalPages){
        let BigPagesArray = [];
        if (page > 5){
            for (let i=page-4; i<page+4; ++i){
                BigPagesArray.push(i);
                if (i === totalPages-1) break
            }
        }else
        {
            for (let i=2; i<8; ++i){
                BigPagesArray.push(i);
                if (i === totalPages-1) break
            }
        }
        return(BigPagesArray);
    }

    const PagesArray = setPagesArray(totalPages)

    return (
        totalPages<2
            ?
            <div/>
            :
            totalPages<10
                ?  ////////////////////////////////////////////////////////////////////////////////////////////////
                <nav aria-label="Search results pages">
                    <ul className="pagination justify-content-end">

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer", color: "black"}}
                            onClick={()=> {if (page>1) {changePage(page-1)} }}
                        >
                            &laquo;
                        </span>
                        </li>

                        {PagesArray.map( p =>
                                <li  className={ p===page ?"page-item active" :"page-item"} key={p}>
                        <span
                            className="page-link"
                            style={{color: "black"}}
                            onClick={()=>{changePage(p)}}
                            key={p}
                        >
                            {p}
                        </span>
                                </li>
                        )}

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer", color: "black"}}
                            onClick={()=> {if (page<totalPages){changePage(page+1)}}}
                        >
                            &raquo;
                        </span>

                        </li>
                    </ul>
                </nav>
                :  /////////////////////////////////////////////////////////////////////////////////////////////////
                <nav aria-label="Search results Big pages">
                    <ul className="pagination justify-content-end">

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer",color: "black"}}
                            onClick={()=> {if (page>3) {changePage(page-3)}else{changePage(1)}}}
                        >
                            {doubleLeft}
                        </span>
                        </li>

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer",color: "black"}}
                            onClick={()=> {if (page>1) {changePage(page-1)} }}
                        >
                            &laquo;
                        </span>
                        </li>

                        <li  className={ 1===page ?"page-item active" :"page-item"} key={1}>
                        <span
                            className="page-link"
                            style={{color: "black"}}
                            onClick={()=>{changePage(1)}}
                            key={1}
                        >
                            {1}
                        </span>
                        </li>

                        {CreateBigArrayPages(page,totalPages).map( p =>
                                <li  className={ p===page ?"page-item active" :"page-item"} key={p}>
                        <span
                            className="page-link"
                            style={{color: "black"}}
                            onClick={()=>{changePage(p)}}
                            key={p}
                        >
                            {p}
                        </span>
                                </li>
                        )}

                        <li  className={ totalPages===page ?"page-item active" :"page-item"} key={totalPages}>
                        <span
                            className="page-link"
                            style={{color: "black"}}
                            onClick={()=>{changePage(totalPages)}}
                            key={totalPages}
                        >
                            {totalPages}
                        </span>
                        </li>

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer",color: "black"}}
                            onClick={()=> {if (page<totalPages){changePage(page+1)}}}
                        >
                            &raquo;
                        </span>
                        </li>

                        <li className="page-item">
                        <span
                            className="page-link"
                            style={{cursor: "pointer",color: "black"}}
                            onClick={()=> {if (page<totalPages-2){changePage(page+3)}else{changePage(totalPages)}}}
                        >
                            {doubleRight}
                        </span>
                        </li>

                    </ul>
                </nav>
    );
};

export default Pagination;