import {Page} from "../layouts/page";
import {Content} from "../layouts/content";
import {trpc} from "../lib/trpc";
import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export type Modle = {
    name: string,
    age: string,
    relation: string,
    gender: string
}

export default function Register() {

    const [role, setRole] = useState('');
    const [formValue, setFormValue] = useState({
        name: '',
        age: '',
        gender: '',
        userT: '',
        customerT: '',
    })
    const mutation = trpc.create.createPepole.useMutation()
    const handleSubmit = (e: any) => {
        e.preventDefault();

        mutation.mutate({
            name: formValue.name,
            age: formValue.age,
            gender: formValue.gender,
            roleTyps: role,
            customerT: formValue.customerT,
            userT: formValue.userT,
            family:modalData
        });
        setFormValue({
            ...formValue,
            name: '',
            age: '',
            gender: '',
            customerT: '',
            userT: ''
        })

    }

    const [modalData, setModalData] = useState<Modle[]>([]);


    const handleModalData = (data: Modle) => {
        setModalData([...modalData,data])

    };


    return (
        <Page title={"Register"}>

            <Content content={<div>
                <h3>REGISTER </h3>



                <section className={"bg-secondary p-5 w-50 bg-opacity-50 "}>
                    <form className={"form-control   p-2 bg-secondary bg-opacity-25 "}>
                        <select className={"form-control form-select mb-3"} onChange={(event) => {
                            setRole(event.target.value)
                        }}>
                            <option selected>Selecte Role</option>
                            <option>User</option>
                            <option>Customer</option>
                            <option>Employee</option>


                        </select>
                        {role === 'User' &&
                            <select className={"form-control form-select mb-3 "} value={formValue.userT}
                                    onChange={(event) => {
                                        setFormValue({...formValue, userT: event.target.value})
                                    }}>
                                <option selected>Selecte User Type</option>
                                <option>Admin</option>
                                <option>Supervisor</option>
                            </select>
                        }
                        {role === 'Customer' &&
                            <select className={"form-control form-select mb-3"} value={formValue.customerT}
                                    onChange={(event) => {
                                        setFormValue({...formValue, customerT: event.target.value})
                                    }}>
                                <option selected>Select Customer Type</option>
                                <option>Vip</option>
                                <option>Normal</option>
                                <option>Worst</option>

                            </select>
                        }

                        <input className={"form-control mb-3"} type={"text"} placeholder={"Name"} value={formValue.name}
                               onChange={(event) => {
                                   setFormValue({...formValue, name: event.target.value})
                               }}/>
                        <input className={"form-control mb-3"} type={"text"} placeholder={"Age"} value={formValue.age}
                               onChange={(event) => {
                                   setFormValue({...formValue, age: event.target.value})
                               }}/>

                        <div className={"d-flex"}>
                            <div className="form-check me-3">
                                <input
                                    className={'form-check-input'}
                                    type="radio"
                                    name="option"
                                    value='Male'
                                    checked={formValue.gender === 'Male'}
                                    onChange={(e) => {
                                        setFormValue({...formValue, gender: e.target.value})
                                    }}
                                />
                                <label className="form-check-label">
                                    Male
                                </label>
                            </div>
                            <div className="form-check me-3">
                                <input
                                    className={'form-check-input'}
                                    type="radio"
                                    name="option"
                                    value='Female'
                                    checked={formValue.gender === 'Female'}
                                    onChange={(e) => {
                                        setFormValue({...formValue, gender: e.target.value})
                                    }}
                                />
                                <label className="form-check-label">
                                    Female
                                </label>
                            </div>
                        </div>
                        <hr/>

                        <h5>Famliy Memberse Details</h5>

                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Age</th>
                                    <th scope="col">Gender</th>
                                    <th scope="col">Relation</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    modalData.map((input, index) =>
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{input.name}</td>
                                            <td>{input.age}</td>
                                            <td>{input.gender}</td>
                                            <td>{input.relation}</td>
                                        </tr>
                                    )
                                }


                                </tbody>
                            </table>

                        </div>
                        <div className={"mt-3 mb-3"}>
                            <FamilyDetails onModalData={handleModalData}/>
                        </div>
                        <button onClick={handleSubmit} className={"btn btn-success"}>Save</button>

                    </form>
                </section>


            </div>}/>


        </Page>
    );
}


// @ts-ignore
function FamilyDetails({onModalData}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        name: '',
        age: '',
        relation: '',
        gender: ''
    });
    const handleSubmit = (e: any) => {
        e.preventDefault();
        onModalData(formData);
        setFormData({
            name: '',
            age: '',
            relation: '',
            gender: ''
        })
        setShow(false);

    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + Add
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Family Memberse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className={"form-control"}>
                        <div className={"d-flex mb-3 w-100"}>
                            <div className={"w-25"}>
                                <label>Name </label>
                            </div>
                            <div className={"w-75"}>
                                <input className={"form-control"} type={"text"} onChange={(e) => {
                                    setFormData({...formData, name: e.target.value})
                                }} value={formData.name}/>
                            </div>
                        </div>
                        <div className={"d-flex mb-3 w-100"}>
                            <div className={"w-25"}>
                                <label>Age </label>
                            </div>
                            <div className={"w-75"}>
                                <input className={"form-control "} type={"text"} onChange={(e) => {
                                    setFormData({...formData, age: e.target.value})
                                }} value={formData.age}/>
                            </div>
                        </div>
                        <div className={"d-flex mb-3 w-100"}>
                            <div className={"w-25"}>
                                <label>Relation </label>
                            </div>
                            <div className={"w-75"}>
                                <select className={"form-select mb-3"} onChange={(e) => {
                                    setFormData({...formData, relation: e.target.value})
                                }} value={formData.relation}>
                                    <option>Father</option>
                                    <option>Mother</option>
                                    <option>Sister</option>
                                    <option>Brother</option>
                                </select>
                            </div>
                        </div>
                        <div className={"d-flex mb-3 w-100"}>
                            <div className={"w-25"}>
                                <label>Gender </label>
                            </div>
                            <div className={"w-75"}>
                                <input className={"me-1"} type={"radio"} name={"gender"} value={"Male"}
                                       checked={formData.gender === 'Male'} onChange={(e) => {
                                    setFormData({...formData, gender: e.target.value})
                                }}/>
                                <label className={"me-3"}>Male</label>
                                <input className={"me-1"} type={"radio"} name={"gender"} value={"Female"}
                                       checked={formData.gender === 'Female'} onChange={(e) => {
                                    setFormData({...formData, gender: e.target.value})
                                }}/>
                                <label>Female</label>
                            </div>
                        </div>


                    </form>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleSubmit} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


