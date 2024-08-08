import { PiCarSimpleBold } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { LuCircleDollarSign } from "react-icons/lu";
import { FaHeadphones } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { useMediaQuery } from "react-responsive";
import Header from "./Header";
import Floating from "./Floating";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [color, setColor] = useState([]);
  const [isYear, setYear] = useState([]);
  const [isMake, setMake] = useState([]);
  const [isModel, setModel] = useState([]);
  const [isFuelType, setFuelType] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [chooseQTY,setChooseQTY] = useState(0)
  const [QTY,setQTY] = useState(0)
  const [price,setPrice] = useState(0)
  const [indexOf, setIndexOf] = useState([])
  const [objStoreIt, setObjStoreIt] = useState({});
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  const handleQTY = (carId,event) => {
    const selectedValue = parseInt(event.target.value, 10);
    const newQuantity = chooseQTY + selectedValue; 
    setChooseQTY(newQuantity); 
    setQTY(parseInt(event.target.value, 10))
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [carId]: event.target.value,
    }));
  };


  const handleCart = (car) => {
    const priceOf = car.price*QTY
    setPrice(priceOf)
    setIndexOf(prev => [...prev, car.id]);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [car.id]: '',
    }));
  };

  useEffect(() => {
    localStorage.setItem('chooseQTY', JSON.stringify(chooseQTY));
    localStorage.setItem('price', JSON.stringify(price));
    localStorage.setItem('carDetails', JSON.stringify(objStoreIt));
    console.log(price);
    console.log(indexOf);
}, [chooseQTY,price,indexOf,objStoreIt]);


  useEffect(() => {
    fetchData();
  }, []);

  //    get the data
  const fetchData = async () => {
    try {
      const response = await fetch("https://freetestapi.com/api/v1/cars");

      if (!response.ok) {
        throw new Error("Network is not okay");
      }

      const jsonData = await response.json();
      setData(jsonData);

      setLoading(false);
    } catch (error) {
      console.error("Fetch data error: ", error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      // years
      const years = [...new Set(data.map((car) => car.year))];
      setYear(years);

      // color
      const colors = [...new Set(data.map((car) => car.color))];
      setColor(colors);

      // make
      const make = [...new Set(data.map((car) => car.make))];
      setMake(make);

      // model
      const model = [...new Set(data.map((car) => car.model))];
      setModel(model);

      // fuelType
      const fuelType = [...new Set(data.map((car) => car.fuelType))];
      setFuelType(fuelType);
    }
  }, [data]);

  //
  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "color":
        setSelectedColor(value);
        break;
      case "year":
        setSelectedYear(value);
        break;
      case "make":
        setSelectedMake(value);
        break;
      case "model":
        setSelectedModel(value);
        break;
      case "fuelType":
        setSelectedFuelType(value);
        break;
      default:
        break;
    }
    console.log(value);
  };
  //
  const btnClickIt = () => {
    const matchingItems = data.filter(
      (item) =>
        (!selectedColor || item.color === selectedColor) &&
        (!selectedYear || item.year === parseInt(selectedYear, 10)) &&
        (!selectedMake || item.make === selectedMake) &&
        (!selectedModel || item.model === selectedModel) &&
        (!selectedFuelType || item.fuelType === selectedFuelType)
    );
    setResult(matchingItems);
    setShowResults(true);
    console.log("Filtered Results:", matchingItems);
  };

  //
  const handleRestart = () => {
    setSelectedColor("");
    setSelectedYear("");
    setSelectedMake("");
    setSelectedModel("");
    setSelectedFuelType("");
    setResult([]);
    setShowResults(false);
    setChooseQTY(0)
  };

  const imageMap = {
    Red: "/src/assets/red.jpg",
    Black: "/src/assets/black.jpg",
    Blue: "/src/assets/blue.jpg",
    Gray: "/src/assets/gray.jpg",
    Green: "/src/assets/green.jpg",
    White: "/src/assets/white.jpg",
    Silver: "/src/assets/sliver.jpg",
  };

 const updateObjStore = (car) => {
    setObjStoreIt(prevStore => ({
        ...prevStore,
        [car.id]: {
            img: imageMap[car.color],
            make: car.make,
            model: car.model,
            year: car.year,
            color: car.color,
            fuelType: car.fuelType,
            price: car.price,
            Quantity:QTY,
            priceTotal:car.price*QTY
        }
    }));}

    useEffect(() => {
      console.log(price);
      console.log(indexOf);
      console.log(objStoreIt);
  }, [chooseQTY,price,indexOf,objStoreIt]);

    
  const is1090 = useMediaQuery({query:'(max-width:1090px)'})
  
  return (
    <>
    
      <Header />
      <Floating/>
      {/* First section */}
      
      <section className="section1">
        <p>KEEP MOVING FASTER AND IN COMFORT.</p>
         
      </section>

      {/* Second section */}
      <section className="searchBar">
        <div className={`carIcon ${is1090?'invisible':''}`}>
          <PiCarSimpleBold className="logoIcons" />
          <div className="carIconNote">
            <h3>Car Search</h3>
            <h6>Find your next car</h6>
          </div>
        </div>

        <div className="dropDownSearch">
          {/* condition */}
          <select name="color" value={selectedColor} onChange={handleChange}>
            <option className="Colors" value="" disabled>
              Colors
            </option>
            {color.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          {/* year */}
          <select
            id="Year"
            name="year"
            value={selectedYear}
            onChange={handleChange}
          >
            <option value="" disabled>
              Year
            </option>
            {isYear.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          {/* select a make */}
          <select
            id="Select a Make"
            name="make"
            value={selectedMake}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a Make
            </option>
            {isMake.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          {/* Select a Model */}
          <select
            id="Select a Model"
            name="model"
            value={selectedModel}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a Model
            </option>
            {isModel.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          {/* FuelType */}
          <select
            id="Fuel Type"
            name="fuelType"
            value={selectedFuelType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Fuel Type
            </option>
            {isFuelType.map((el, index) => (
              <option key={index} value={el}>
                {el}
              </option>
            ))}
          </select>

          {/* search */}
        </div>
        <div className="btns">
          <div className="btnSearch" onClick={btnClickIt}>
            <button>
              <IoSearch />
              <span></span>
              <span>cars</span>
            </button>
          </div>

          <div className="btnRestart" onClick={handleRestart}>
            <button>Restart</button>
          </div>
          </div>
      </section>

      {/* third section */}
      <section className={`section3 ${showResults ? "show-opacity" : ""}`}>
        <h3>Results {result.length}/{data.length}</h3>
        {result.length > 0 ? (
          <ul>
            {result.map((car, index) => (
              <li key={index}>
                {imageMap[car.color] ? (
                  <img src={imageMap[car.color]} alt={car.color} />
                ) : null}
                <div className="makeContainer">
                  <p>Make:</p>
                  <p>{car.make}</p>
                </div>

                <div className="modelContainer">
                  <p>Model:</p>
                  <p>{car.model}</p>
                </div>

                <div className="yearContainer">
                  <p>Year:</p>
                  <p>{car.year}</p>
                </div>

                <div className="colorContainer">
                  <p>Color:</p>
                  <p>{car.color}</p>
                </div>

                <div className="fuelType">
                  <p>Fuel Type:</p>
                  <p>{car.fuelType}</p>
                </div>

                <div className="priceContainer">
                  <p>Price:</p>
                  <p className="priceOf">{car.price}</p>
                </div>

                {/* <p>{price}</p> */}

                <div className="btnCart">
                  <button className="btnAddCart"onClick={()=>{
                    handleCart(car)
                    updateObjStore(car);
                    
                  
                  }}>Add to Cart</button>

                  <select id="QTY" name="QTY"  onChange={(e) => handleQTY(car.id, e)}
                  value={quantities[car.id] || ''}>
                    <option value="" disabled>
                      QTY
                    </option>
                    <option value="1" key="1">
                      1
                    </option>
                    <option value="2" key="2">
                      2
                    </option>
                    <option value="3" key="3">
                      3
                    </option>
                    <option value="4" key="4">
                      4
                    </option>
                    <option value="5" key="5">
                      5
                    </option>
                    <option value="6" key="6">
                      6
                    </option>
                    <option value="7" key="7">
                      7
                    </option>
                    <option value="8" key="8">
                      8
                    </option>
                    <option value="9" key="9">
                      9
                    </option>
                    <option value="10" key="10">
                      10
                    </option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="noResult">No results found.</p>
        )}
      </section>

      <section className="section4">
        <div className="forHeader">
            <h6>Lets make your find easier</h6>
            <h1>Welcome to QuickMoving</h1>
            <h3>Why Choose Us</h3>
        </div>
        <div className="whyChoose">
            <div className="us1">
                <LuCircleDollarSign className="icons"/>
                <div className="note">
                    <h4>Best Price Guaranteed</h4>
                    <p>We offer the lowest price on our products. If you find a lower price elsewhere, we will match it. Your satisfaction is our priority!</p>
                </div></div>

                <div className="us1">
                <FaHeadphones className="icons"/>
                <div className="note">
                    <h4>24/7 Customer Care</h4>
                    <p>Our support team is available around the clock to assist you. Contact us anytime for help with your needs or concerns. We&apos;re here to ensure your satisfaction!</p>
                </div>
            </div>

            <div className="us1">
                <FaHouse className="icons"/>
                <div className="note">
                    <h4>Home Pickups</h4>
                    <p>Enjoy the convenience of our home pickup service. Schedule a pickup at your preferred time, and we&apos;ll handle the rest. Effortless and reliable!</p>
                </div>
            </div>

            <div className="us1">
                <SlCalender className="icons"/>
                <div className="note">
                    <h4>Easy Bookings</h4>
                    <p>Book your service with just a few clicks. Our streamlined process makes scheduling quick and hassle-free.</p>
                </div>
            </div>
        
        </div>
      </section>
    </>
  );
};
export default HomePage;