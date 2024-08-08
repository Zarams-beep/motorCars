import { useEffect, useState } from "react";
import { GiPadlock } from "react-icons/gi";
import { PiCarSimpleBold } from "react-icons/pi";
import { format, addDays } from "date-fns";
import { Link } from "react-router-dom";
import Modal from "react-modal";
const CheckOut = () => {
  const [carDetails, setCarDetails] = useState({});

  const updateCarDetails = (car) => {
    setCarDetails(prevCarDetails => ({
      ...prevCarDetails,
      [car.id]: car
    }));
  };
  const [QTY, setQTY] = useState(0);
  const [FullPrice, setFullPrice] = useState(0)

  useEffect(() => {
    const storedCarDetails =
      JSON.parse(localStorage.getItem("carDetails")) || {};

    setCarDetails(storedCarDetails);
    setQTY(JSON.parse(localStorage.getItem("chooseQTY")));
    setFullPrice(JSON.parse(localStorage.getItem("price")));
  }, []);

  // for dates
  const today = new Date();
  const formattedDate = format(today, "MMMM dd, yyyy");
  const futureDate = format(addDays(today, 10), "MMMM dd, yyyy");
  const futureDate5 = format(addDays(today, 5), "MMMM dd, yyyy");
  const futureDate3 = format(addDays(today, 3), "MMMM dd, yyyy");
  const price5 = 4.99;
  const price3 = 9.99;

  const [optionChange,setOptionChange] = useState(0)
  const handleShippingOptionChange = (event) => {
    setOptionChange(event.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModel = ()=>{
    setIsModalOpen(true)
  }

  const [fullname, setFullname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [houseAddress, setHouseAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [isModalOpen2, setIsModalOpen2] = useState(false)

  const validateInputs = () => {
    return fullname && phoneNumber && email && houseAddress && city && state;
  };

  const handleSubmit=()=>{
    if (validateInputs()) {
      setIsModalOpen(false)
      setIsModalOpen2(true)
    } else {
      alert('Please fill out all fields.');
    }
  }
  return (
    <>
      <main className="checkOut">
        <div className="part1">
          <div className="logo">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <PiCarSimpleBold className="logoIcons" />
              <p>Quick Moving</p>
            </Link>
          </div>

          <div className="checkoutMenu">
            <h6>Checkout</h6>
            <p>( {QTY} Items)</p>
          </div>

          <GiPadlock className="logoIcons icons2"/>
        </div>

        <h3 className="part2H3">Review Your Order</h3>
        <div className="part2">
          
          <div className="deliveryMenu">
            <div className="delivery1">
              <h3>Order date: {formattedDate}</h3>


              {Object.values(carDetails).map((car)=>(
                <div className="carDetails" key={car.id}>
                    <img src={car.img} alt="" />
                    
                    <div className="notes">
                      <h3>
                        {car.make} - {car.model} ({car.fuelType})
                      </h3>

                      <h3>
                        {car.year} - {car.color}
                      </h3>

                      <p className="price">Price: ${car.price}</p>
                      <p className="price">Total Price: ${car.priceTotal}</p>

                      <div className="changes">
                        <p className="qty">Quantity: {car.Quantity}</p>
                      </div>
                    </div>
                </div>
              ))}

            </div>
          </div>

          
          <div className="part3">
              <div className="delOptions">
                  <h4 className="h4-choose">Choose a delivery option:</h4>
                  <label>
                    <input
                      type="radio"
                      name="shippingOption"
                      value={0}
                      onChange={handleShippingOptionChange}
                    />
                    <div>
                      <h5 className="date">{futureDate}</h5>
                      <h5>FREE SHIPPING</h5>
                    </div>
                  </label>
                  <label>
                    <input type="radio" name="shippingOption" value={4.99} onChange={handleShippingOptionChange}/>
                    <div>
                      <h5 className="date">{futureDate5}</h5>
                      <h5>${price5} - Shipping</h5>
                    </div>
                  </label>
                  <label>
                    <input type="radio" name="shippingOption" value={9.99} onChange={handleShippingOptionChange}/>
                    <div>
                      <h5 className="date">{futureDate3}</h5>
                      <h5>${price3} - Shipping</h5>
                    </div>
                  </label>
                </div>

                <div className="orderSum">
                  <h3>Order Summary</h3>

                  <div className="smallPart">
                    <div><p>Items ({QTY}):</p>
                      <p>${FullPrice}</p>
                    </div>

                    <div>
                      <p>Shipping & Handling:</p>
                      <p>${optionChange}</p>
                    </div>
                    
                    <div>
                      <p>Total before tax:</p>
                      <p>${(FullPrice+(optionChange*100))/100}</p>
                    </div>
                    
                    <div>
                      <p>Estimated tax (10%):</p>
                      <p>${Math.round(Math.round(((FullPrice+(optionChange*100))/100)*0.10,2))}</p>
                    </div>
                    
                    <div>
                      <p>Order Total:</p>
                      <p>${((FullPrice+(optionChange*100))/100) + (Math.round(Math.round(((FullPrice+(optionChange*100))/100)*0.10,2)))}</p>
                    </div>
                    
                    <button onClick={openModel}>Place your order</button>

                    <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} className="modelStyle" contentLabel='Address Model'>
                    {
                        <>
                            <div className="model">
                            <div className="divModel">
                            <h2>Contact Address</h2>
                            <div className="contact">
                              <label htmlFor="name">
                                <input type="text" placeholder="Fullname"
                                onChange={(e) => setFullname(e.target.value)}/>
                              </label>

                              <label htmlFor="phone number">
                                <input type="text" placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}/>
                              </label>

                              <label htmlFor="email">
                                <input type="email" placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}/>
                              </label>

                              <label htmlFor="house address">
                                <input type="text" placeholder="House Address"
                                onChange={(e) => setHouseAddress(e.target.value)}/>
                              </label>

                              <label htmlFor="city">
                                <input type="text" placeholder="City"
                                onChange={(e) => setCity(e.target.value)}/>
                              </label>

                              <label htmlFor="state">
                                <input type="text" placeholder="State"
                                onChange={(e) => setState(e.target.value)}/>
                              </label>
                            </div>



                            <div className='btnContainer'>
                            <button style={{backgroundColor:'red'}} onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button onClick={handleSubmit}>
                                Submit
                            </button>
                            </div>
                            </div>
                            </div>
                        </>
                    }
                </Modal>

                
                <Modal isOpen={isModalOpen2} onRequestClose={() => setIsModalOpen(false)} className="modelStyle" contentLabel='Close Model'>
                    {
                        <>
                            <div className="divComplete">
                              <h2>Completed</h2>
                              <div className="btndiv">
                                <button><Link to='/' className="linking">Go back</Link></button>
                              </div>
                            </div>
                        </>
                    }
                </Modal>
                  </div>
                </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default CheckOut;
