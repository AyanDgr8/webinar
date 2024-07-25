// /src/components/routes/Home/Register/Register.js


import React, { useState, useEffect } from 'react';
import './Register.css'; 

const Register = () => {
    const [alertMessage, setAlertMessage] = useState(null);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        date_time: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!validateForm()) return;

        // Disable the submit button to prevent multiple submissions
        e.target.querySelector('button[type="submit"]').disabled = true;

        // If validations pass, submit the form data
        const apiUrl = "https://multycomm-backend.onrender.com/user-register";
        try {
            // Prepare request data
            const requestData = { ...formData };

            // Submit the form data
            // await axios.post(apiUrl, requestData);

            console.log('Registration successful');
            setAlertMessage('User registered successfully!');
            handleSubmissionSuccess();
        } catch (error) {
            console.error('Error submitting form:', error);
            handleSubmissionError(error);
        }
    };

    // Function to validate form inputs
    const validateForm = () => {
        const { fullName, email, phone, date_time } = formData;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        // Check if any required field is empty
        if (!fullName || !phone || !email || !date_time) {
            setAlertMessage('Please fill in all the required fields');
            return false;
        }

        // Validate phone number
        if (!phoneRegex.test(phone)) {
            setAlertMessage('Please enter a valid phone number');
            return false;
        }

        // Validate email address
        if (!emailRegex.test(email)) {
            setAlertMessage('Please enter a valid email address');
            return false;
        }

        // If all validations pass, return true
        return true;
    };

    // Function to handle successful form submission
    const handleSubmissionSuccess = () => {
        // Reset form data
        resetForm();
    };

    // Function to handle form submission error
    const handleSubmissionError = (error) => {
        if (error.response && error.response.data && error.response.data.message) {
            setAlertMessage(error.response.data.message); 
        } else {
            setAlertMessage('An error occurred. Please try again later.'); 
        }
    };

    // Function to reset the form
    const resetForm = () => {
        setFormData({
            fullName: '',
            email: '',
            phone: '',
            date_time: '',
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        if (alertMessage) {
            // Show alert
            alert(alertMessage);

            // Clear alert message
            setAlertMessage(null);
        }
    }, [alertMessage]);

    return (
        <div className='webinar-page'>
            <section className='above-form'>
                <img 
                    src="/uploads/wallpaper.webp"
                    className='wall-bg'
                    alt="wall-bg"
                />
            </section>

            <form 
                id="form_container"
                className='form-register'
                action="https://multycomm-backend.onrender.com/user-register"
                method="post" 
                onSubmit={handleSubmit} 
                encType="multipart/form-data"
            >
                <div className='form-heading'>
                    <h1 className='form-line1'>Simplify Your Communication With MultyComm</h1>      
                    <h3 className='form-line2'>Fill out the form below and book your slot now!</h3>             
                </div>   

                <section className='main-form'>
                            
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="text" id="form6Example1" className="form-control inputs" 
                                name="fullName" value={formData.fullName} onChange={handleChange} 
                                placeholder='Full Name' required
                            />
                        </div>
                    </div>
            
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="email" id="form6Example2" className="form-control inputs" 
                                name="email" value={formData.email} onChange={handleChange}
                                placeholder='Email' required
                            />
                        </div>
                    </div>
            
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <input type="number" id="form6Example3" className="form-control inputs"     
                                name="phone" value={formData.phone} onChange={handleChange}
                                placeholder='Phone' required 
                            />
                        </div>
                    </div>
            
                    <div className="col">
                        <div data-mdb-input-init className="form-outline">
                            <select className="form-select inputs" name="date_time" value={formData.date_time} onChange={handleChange} required>
                                <option value="" disabled>Select a slot</option>
                                <option value="3rd August (Sat) - 2PM IST">3rd August (Sat) - 2PM IST</option>
                                <option value="8th August (Thu) - 4:30PM IST">8th August (Thu) - 4:30PM IST</option>
                            </select>
                        </div>
                    </div>

                </section>

                <button data-mdb-ripple-init type="submit" className="btn btn-primary btn-block mb-4 sbt-btn">
                    Register
                </button>

            </form>
        </div>
    );
};

export default Register;
