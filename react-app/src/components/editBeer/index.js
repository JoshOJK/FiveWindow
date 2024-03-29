import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateBeer, loadBeerDetails } from "../../store/beer";
import { useModal } from "../../context/Modal";
import { LoadBeers } from "../../store/beer";
import "./editBeerModal.css"




const UpdateBeerForm = ({ beerId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const beer = useSelector((state) => state.beer[beerId])
    const [validSubmit, setValidSubmit] = useState(false)
    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();


    const [data, setData] = useState({
        name: "",
        description: "",
        abv: "",
    })


    useEffect(() => {
        if (beer) {
            setData({
                name: beer.name,
                description: beer.description,
                abv: beer.abv,
            });
        } else {
            dispatch(loadBeerDetails(beerId))
                .then((data) => {
                    setData({
                        name: data.name,
                        description: data.description,
                        abv: data.abv,
                    });
                })
                .catch((err) => console.error(err));
        }
    }, [dispatch, beerId, beer]);

    const handleStringData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value

        })
    }

    const handleNumberData = (e) => {
        setData({
            ...data,
            [e.target.name]: parseInt(e.target.value),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = {};
        if (!data.name) {
            errors.name = "Name is required";
        }
        if (!data.description) {
            errors.description = "description is required"
        }
        if (!data.abv) {
            errors.abv = "abv is required"
        }

        setErrors(errors)

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);


            try {
                dispatch(updateBeer(beerId, data))
                .then(() => {
                dispatch(LoadBeers())
                closeModal()
                })

            } catch(error) {
                console.error('Could not update your beer tap:', error)
            }


        }
    }



    return (
        <section id="edit-beer-container">
            <h1 id="edit-beer-header">Edit Tap</h1>
            <form onSubmit={handleSubmit} id="edit-beer-form">
                <div id="general-info">
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.name ? 'error' : ''}`}
                            type="string"
                            name="name"
                            placeholder="name"
                            value={data.name}
                            onChange={handleStringData} />
                            {errors.name && (
                                <p className='error-message'>{errors.name}*</p>
                            )}

                    </div>
                    <div id="form-group">
                        <textarea
                            className={`input-field ${errors.description ? 'error' : ''}`}
                            type="string"
                            name="description"
                            placeholder="description"
                            value={data.description}
                            onChange={handleStringData} />
                            {errors.description && (
                                <p className='error-message'>{errors.description}*</p>
                            )}
                    </div>
                    <div id="form-group">
                        <input
                            className={`input-field ${errors.abv ? 'error' : ''}`}
                            type="number"
                            placeholder="abv"
                            name="abv"
                            value={data.abv}
                            onChange={handleNumberData} />
                         {errors.abv && (
                                <p className='error-message'>{errors.abv}*</p>
                            )}
                    </div>
                </div>
                <button type="submit" disabled={validSubmit} id="edit-beer-btn" >Update Tap</button>
            </form>
        </section>
    )
}

export default UpdateBeerForm;
