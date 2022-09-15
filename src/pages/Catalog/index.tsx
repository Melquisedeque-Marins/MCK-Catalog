import Pagination from "components/Pagination";
import ProductCard from "components/ProductCard";
import { Link } from "react-router-dom";
import { Product } from "types/products";
import './styles.css';

const Catalog = () => {
    
    const product: Product = {
        "id": 2,
        "name": "Smart TV",
        "description": "TV grande",
        "price": 2190.0,
        "imgUrl": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/2-big.jpg",
        "date": "2020-07-14T10:00:00Z",
        "categories": [
            {
                "id": 1,
                "name": "Livros"
            }
        ],
    };

    return (    
        <div className="container my-4 catalog-container">
            <div className="row catalog-title-container">
                <h1>Catálogo de produtos</h1>
            </div>
            <div className="row">
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
                <div className="col-sm-6 col-lg-4 col-xl-3">
                    <Link to="/products/1">
                        <ProductCard product={product}/>
                    </Link>
                </div>
         
              
            </div>
            <div className="row">
                <Pagination />
            </div>
        </div>
    );
}

export default Catalog;