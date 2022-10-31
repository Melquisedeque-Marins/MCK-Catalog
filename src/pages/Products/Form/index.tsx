import './styles.css';

const Form = () => {
    return (
        <div className="product-crud-container">
            <div className="base-card product-crud-form-card">
                <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>
                <form action="">
                    <div className="row">
                        <div className="col-lg-6">
                            <input type="text" className="form-control base-input"/>
                            <input type="text" className="form-control base-input"/>
                            <input type="text" className="form-control base-input"/>
                        </div>
                        <div className="col-lg-6">
                           <textarea className="form-control base-input" name="" id="" rows={10}></textarea>
                        </div>
                    </div>
                    <div>
                        <div className=" btn btn-outline-danger">CANCELAR</div>
                        <div className=" btn btn-primary">SALVAR</div>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form;