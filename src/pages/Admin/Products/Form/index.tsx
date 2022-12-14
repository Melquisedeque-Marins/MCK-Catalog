import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import CurrencyInput from 'react-currency-input-field';
import { useForm, Controller } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { Category } from 'types/category';
import { Product } from 'types/products';
import { requestBackend } from 'util/requests';
import './styles.css';

type UrlParams = {
    productId: string;
}

const Form = () => {

    const { productId } = useParams<UrlParams>();

    const isEditing = productId !== 'create';

    const history = useHistory();

    const [selectcategories, setSelecCategories] = useState<Category[]>([]);

    const { register, handleSubmit, formState: { errors }, setValue, control } = useForm<Product>();

    useEffect(() => {
        requestBackend({url: '/categories'})
            .then(response => {
                setSelecCategories(response.data.content);
            })
    }, []);

    useEffect(() => {
        if (isEditing) {
            requestBackend({ url: `/products/${productId}`})
            .then((response) => {
                const product = response.data as Product;

                setValue('name', product.name);
                setValue('price', product.price);
                setValue('description', product.description);
                setValue('imgUrl', product.imgUrl);
                setValue('categories', product.categories);
            });
        }
    },[isEditing, productId, setValue]);

    const onSubmit = (formData: Product) => {

        const data = {...formData, price: String(formData.price).replace(',', '.')}
       
        const config : AxiosRequestConfig = {
            method: isEditing ? 'PUT' : 'POST',
            url: isEditing ? `/products/${productId}` : '/products',
            data,
            withCredentials: true
        };

        requestBackend(config)
            .then(response => {
                history.push("/admin/products");
            });
    };

    const handleCancel = () => {
        history.push("/admin/products");
    }

    return (
        <div className="product-crud-container">
            <div className="base-card product-crud-form-card">
                <h1 className="product-crud-form-title">DADOS DO PRODUTO</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="row product-crud-inputs-container">
                        <div className="col-lg-6 product-crud-inputs-left-container">
                            <div className="margin-botton-30">
                                <input
                                    {...register("name", {
                                    required: 'Campo obrigat??rio',
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="Nome do produto"
                                    name="name"
                                />
                                <div className="invalid-feedback d-block" >
                                    {errors.name?.message}
                                </div>
                            </div>

                            <div className="margin-botton-30">

                                <Controller
                                    name='categories'
                                    rules={{required: true}}
                                    control={control}
                                    render={({field}) => ( 
                                        <Select {...field}
                                            options={selectcategories}
                                            classNamePrefix="product-crud-select" 
                                            isMulti
                                            getOptionLabel={(category: Category) => category.name}
                                            getOptionValue={(category: Category) => String(category.id)}
                                        />
                                    )}
                                />
                                {errors.categories && (
                                     <div className="invalid-feedback d-block" >
                                     Campo obrigat??rio
                                 </div>  
                                )}
                            </div>
                            <div className="margin-botton-30">
                                <Controller
                                    name="price"
                                    rules={{required: 'campo obrigat??rio'}}
                                    control={control}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            placeholder='Pre??o'
                                            className={`form-control base-input ${errors.price ? 'is-invalid' : ''}`}
                                            disableGroupSeparators={true}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        />
                                    )}
                                />
                                <div className="invalid-feedback d-block" >
                                    {errors.price?.message}
                                </div>
                            </div>
                          
                            <div className="margin-botton-30">
                                <input
                                    {...register("imgUrl", {
                                    required: 'Campo obrigat??rio',
                                    pattern: {
                                        value: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                                        message: 'Deve ser uma URL valida'
                                    }
                                    })}
                                    type="text"
                                    className={`form-control base-input ${errors.name ? 'is-invalid' : ''}`}
                                    placeholder="URL da imagem do produto"
                                    name="imgUrl"
                                />
                                <div className="invalid-feedback d-block" >
                                    {errors.imgUrl?.message}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div>
                                <textarea
                                    rows={10}
                                    {...register("description", {
                                        required: 'Campo obrigat??rio',
                                        })}
                                        className={`form-control base-input h-auto ${
                                            errors.price ? 'is-invalid' : ''}`}
                                        placeholder="Descri????o"
                                        name="description"
                                    />
                                <div className="invalid-feedback d-block" >
                                    {errors.description?.message}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="product-crud-buttons-container">
                        <button className=" btn btn-outline-danger product-crud-button" onClick={handleCancel}>
                            CANCELAR
                        </button>
                       
                        <button className=" btn btn-primary product-crud-button text-white">SALVAR</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Form;