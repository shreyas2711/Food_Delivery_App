import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MainSection.css';
import Dropdown2 from '../utils/Dropdown2';
import Button from 'react-bootstrap/Button';
import { GetMenuAction } from '../redux/actions/menuAction';
import { GetFoodSizeAction } from '../redux/actions/foodSizeAction';
import IncDecCounter from './IncDecCounter';
import { OrderAction } from '../redux/actions/orderAction';
import NavigationBar from './NavigationBar';

function MainSection() {
  const dispatch = useDispatch();
  const { menu, loading } = useSelector((state) => state.loadMenu);
  const { foodsize } = useSelector((state) => state.loadFoodSize);
  const [categories, setCategories] = useState([]);
  const [selectedOptionDropdown1, setSelectedOptionDropdown1] = useState(null);
  const [selectedOptionDropdown2, setSelectedOptionDropdown2] = useState({});
  const [quantity, setQuantity] = useState({}); // Separate state for quantity of each menu item

  console.log("menu:", menu);

  const foodsizearray = foodsize && foodsize.data && foodsize.data.rows ? foodsize.data.rows : [];

  useEffect(() => {
    dispatch(GetMenuAction());
    dispatch(GetFoodSizeAction());
  }, [dispatch]);

  useEffect(() => {
    console.log("foodsize:", foodsize);
  }, [foodsize]);

  useEffect(() => {
    if (menu && menu.data && menu.data.rows) {
      const uniqueCategories = [...new Set(menu.data.rows.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  }, [menu]);

  const handleDropdown1Change = (selectedOption) => {
    setSelectedOptionDropdown1(selectedOption);
    console.log("Selected Option 1:", selectedOption); // Add this line for debugging
  };

  useEffect(() => {
    console.log("Selected Option 1 in useEffect:", selectedOptionDropdown1); // Add this line for debugging
  }, [selectedOptionDropdown1]);

  const handleDropdown2Change = (itemId, selectedOption) => {
    setSelectedOptionDropdown2(prevState => ({
      ...prevState,
      [itemId]: selectedOption
    }));
  };

  const AddToCart = (item, price) => {
    const orderData = {
      item: item.item_name,
      quantity: quantity[item.menu_id],
      selectedOptionDropdown2: selectedOptionDropdown2[item.menu_id],
      price: price,
      img_food:item.food_img
    };
    // console.log("item_name:",orderData.item);
    dispatch(OrderAction(orderData));
  };

  return (
    <>
      <NavigationBar />
      <div className='main-container'>
        <div className="menu-container">
          {categories.map((category, index) => (
            <div className="cat-1" key={index}>
              <h1>{category}</h1>
              <hr />
              <div className="cards">
                {menu.data && menu.data.rows && menu.data.rows.map((item) => {
                  if (item.category === category) {
                    const price = selectedOptionDropdown2[item.menu_id]
                      ? foodsizearray.find(food => food.food_name === item.item_name && food.food_size === selectedOptionDropdown2[item.menu_id])?.food_price
                      : foodsizearray.find(food => food.food_name === item.item_name && food.food_size === 'Regular')?.food_price;
                    return (
                      <div className="menu-card" key={item.menu_id}>
                        <div className="card-img">
                          <img src={item.food_img} alt="" />
                        </div>
                        <div className="card-img-heading">
                          <span>{item.item_name}</span>
                        </div>
                        <div className="assign-quantity">
                          <div className="drop-1">
                            <IncDecCounter setQuantity={setQuantity} itemId={item.menu_id} />
                          </div>
                          <div className="drop-2">
                            <Dropdown2 selectedOption={selectedOptionDropdown2[item.menu_id] || "Regular"} onChange={(selectedOption) => handleDropdown2Change(item.menu_id, selectedOption)} />
                          </div>
                          <div className="price">
                            <span style={{ marginLeft: '10px', color: 'white' }}>{price}₹/-</span>
                          </div>
                        </div>
                        <hr />
                        <div className="add-to-cart">
                          <Button variant="secondary" onClick={() => AddToCart(item, price)}>Add to cart</Button>
                        </div>
                      </div>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainSection;
