import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';


const List = ({ url }) => {


    const [list, setList] = useState([]);



    const fetchList = async () => {

        const response = await axios.get(`${url}api/food/list`)


        if (response.data.success) {

            setList(response.data.data)

        }
        else {

            toast.error("Error found")

        }

    }



    const removeFood = async (foodId) => {


        const response = await axios.post(
            `${url}api/food/remove`,
            { id: foodId }
        );



        if (response.data.success) {


            toast.success(response.data.message);


            fetchList();


        }
        else {


            toast.error("Error");


        }


    }





    const confirmRemove = (id) => {


        toast(
            <div className="delete-toast">

                <p>
                    Are you sure you want to delete this food?
                </p>


                <div className="delete-toast-btn">


                    <button
                        className="yes-btn"
                        onClick={() => {

                            removeFood(id);

                            toast.dismiss();

                        }}
                    >

                        Yes

                    </button>



                    <button
                        className="no-btn"
                        onClick={() => toast.dismiss()}
                    >

                        No

                    </button>


                </div>


            </div>,


            {
                autoClose: false,
                closeOnClick: false,
                draggable: false
            }

        )


    }





    useEffect(() => {

        fetchList()

    }, [])



    return (

        <div className='list add flex-col'>


            <p>All Food List</p>


            <div className="list-table">


                <div className="list-table-format title">

                    <b>Image</b>

                    <b>Name</b>

                    <b>Category</b>

                    <b>Price</b>

                    <b>Action</b>

                </div>




                {

                    list.map((item, index) => {


                        return (

                            <div
                                key={index}
                                className='list-table-format'
                            >


                                <img
                                    src={`${url}images/` + item.image}
                                    alt=""
                                />


                                <p>
                                    {item.name}
                                </p>


                                <p>
                                    {item.category}
                                </p>


                                <p>
                                    ${item.price}
                                </p>



                                <p
                                    onClick={() => confirmRemove(item._id)}
                                    className='curser'
                                >

                                    X

                                </p>


                            </div>

                        )


                    })

                }



            </div>


        </div>

    );

};


export default List;
