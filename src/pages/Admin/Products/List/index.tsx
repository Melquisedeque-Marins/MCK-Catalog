import { AxiosRequestConfig } from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "types/products";
import { SpringPage } from "types/vendor/spring";
import { requestBackend } from "util/requests";
import ProductCrudCard from "../ProductCrudCard";

import './styles.css';

type ControlComponentsData = {
    activePage: number;
}


const List = () => {

    const [page, setPage] = useState<SpringPage<Product>>();

    const [ControlComponentsData, setControlComponentsData] = useState<ControlComponentsData>({activePage: 0})

    useEffect(() => {
        getProducts(0);
    }, []);
    
    const getProducts = (pageNumber: number)=>  {
        const config : AxiosRequestConfig = {
            method: "GET",
            url: "/products",
            params: {
                page: pageNumber,
                size: 3
            }
        };
        requestBackend(config)
            .then(response => {
                setPage(response.data);
            });
    }

    return (
        <div className="product-crud-container">
        <div className="product-crud-bar-container">
            <Link to="/admin/products/create">
                <button className="btn btn-primary text-white btn-crud-add">ADICIONAR</button>
            </Link>
            <div className="base-card product-filter-container">
                Search bar
            </div>
        </div>
        <div className="row">
            { page?.content.map(product => (
            <div key={product.id} className="col-sm-6 col-md-12">
                <ProductCrudCard product={product} onDelete={() => getProducts(page.number)}/>
            </div>
                ))}
        </div>
        <Pagination 
            pageCount={(page) ? page.totalPages : 0}
            range={3}
            onChange={getProducts}
        />
        </div>
            )
    }

export default List;