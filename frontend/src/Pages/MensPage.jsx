import React, { useState, useEffect } from "react";
import { menData } from "../Data/mens";

import "./MensPage.css";
import MensItemPage from "./MensItemPage";
import { useParams } from "react-router-dom";
function MensPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    setSelectedType([]);
    setSelectedBrand([]);
    setSelectedModel([]);
    setSelectedRating([]);
    setSelectedDiscount([]);
  };
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(true); // State for category dropdown
  const toggleCategoryDropdown = () => {
    setIsCategoryDropdownOpen((prevState) => !prevState); // Toggle the category dropdown
  };

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    type: false,
    brand: false,
    model: false,
    rating: false,
    discount: false,
    sort: false,
  });
  const { itemName } = useParams();
  useEffect(() => {}, [itemName]);
  const handleMultiSelect = (value, setState, state) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const [DropdownOpen, setDropdownOpen] = useState({
    type: false,
    brand: false,
    price: false,
    rating: false,
    discount: false,
    sort: false,
  });

  const [filteredMenData, setFilteredMenData] = useState([]);
  useEffect(() => {
    const updatedFilteredData = menData.filter((item) => {
      return (
        (selectedCategory === "" || item.category === selectedCategory) &&
        (selectedType.length === 0 || selectedType.includes(item.type)) &&
        (selectedBrand.length === 0 || selectedBrand.includes(item.brand)) &&
        (selectedModel.length === 0 || selectedModel.includes(item.model)) &&
        (selectedRating.length === 0 || selectedRating.includes(item.rating)) &&
        (selectedDiscount.length === 0 ||
          selectedDiscount.includes(item.discount)) &&
        item.sprice >= priceRange[0] &&
        item.sprice <= priceRange[1]
      );
    });

    setFilteredMenData(updatedFilteredData); // Update the filtered data state
  }, [
    menData,
    selectedType,
    selectedBrand,
    selectedModel,
    selectedRating,
    selectedDiscount,
    priceRange,
  ]); // Re-run filter when any dependency changes

  const handleMinPriceChange = (e) => {
    const minPrice = Math.max(0, parseInt(e.target.value));
    setPriceRange([minPrice, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const maxPrice = Math.min(5000, parseInt(e.target.value));
    setPriceRange([priceRange[0], maxPrice]);
  };
  const toggleDropdown = (filter) => {
    setIsDropdownOpen((prevState) => ({
      type: filter === "type" ? !prevState.type : false,
      brand: filter === "brand" ? !prevState.brand : false,
      price: filter === "price" ? !prevState.price : false,
      rating: filter === "rating" ? !prevState.rating : false,
      discount: filter === "discount" ? !prevState.discount : false,
      sort: filter === "sort" ? !prevState.sort : false,
      model: filter === "model" ? !prevState.model : false,
    }));
  };

  const [sortedMenData, setSortedMenData] = useState(filteredMenData); // Initialize with original menData

  const handleSort = (sortType) => {
    let sortedData = [...filteredMenData]; // Copy the original data

    switch (sortType) {
      case "relevant":
        sortedData = [...filteredMenData];
        break;
      case "priceLowToHigh":
        sortedData.sort((a, b) => a.sprice - b.sprice);
        break;
      case "priceHighToLow":
        sortedData.sort((a, b) => b.sprice - a.sprice);
        break;
      case "discount":
        sortedData.sort((a, b) => b.discount - a.discount);
        break;
      case "rating":
        // Assuming relevance is determined by some property; adjust accordingly
        sortedData.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    setFilteredMenData(sortedData);
    setSortedMenData(sortedData); // Update state with sorted data
    setIsDropdownOpen({ sort: false }); // Close the dropdown after sorting
  };

  return (
    <div>
      <div className="page-container">
        <div className="navbar-filters">
          <div className="navbar-header">
            <div className="navbar-header-photo">
              <img src="/src/assets/MenWear/header.jpg" alt="Header Image" />
            </div>
            <div className="navbar-header-line">
              <h2>MODERN MEN'S FASHION</h2>
            </div>
          </div>
          <div className="navbar-start">
            <h1 className="filters-head">Filters</h1>

            {/* Type selection */}
            <div className="type-section">
              <label className="highlight">CATEGORIES</label>

              <button
                onClick={toggleCategoryDropdown}
                className="dropdown-toggle"
              >
                {isCategoryDropdownOpen ? (
                  <img
                    src="/src/assets/MenWear/arrowup.png"
                    alt="Up Arrow"
                    className="arrow-icon"
                  />
                ) : (
                  <img
                    src="/src/assets/MenWear/arrowdown.png"
                    alt="Down Arrow"
                    className="arrow-icon"
                  />
                )}
                Categories & Accessories
              </button>
              <div className="category-selection">
                {isCategoryDropdownOpen && (
                  <div className="dropdown-menu">
                    <div
                      className="category"
                      key="Winter Wear"
                      onClick={() => handleCategorySelect("Winter Wear")}
                    >
                      <label>{"Winter Wear"}</label>
                    </div>
                    <div
                      className="category"
                      key="Top Wear"
                      onClick={() => handleCategorySelect("Top Wear")}
                    >
                      <label>{"Top Wear"}</label>
                    </div>
                    <div
                      className="category"
                      key="Bottom Wear"
                      onClick={() => handleCategorySelect("Bottom Wear")}
                    >
                      <label>{"Bottom Wear"}</label>
                    </div>
                    <div
                      className="category"
                      key="Inner Wear"
                      onClick={() => handleCategorySelect("Inner Wear")}
                    >
                      <label>{"Inner Wear"}</label>
                    </div>
                    <div
                      className="category"
                      key="Ethnic Wear"
                      onClick={() => handleCategorySelect("Ethnic Wear")}
                    >
                      <label>{"Ethnic Wear"}</label>
                    </div>
                    <div
                      className="category"
                      key="Clothing Accessories"
                      onClick={() =>
                        handleCategorySelect("Clothing Accessories")
                      }
                    >
                      <label>{"Clothing Accessories"}</label>
                    </div>
                    <div
                      className="category"
                      key="Blazers & Waistcoats"
                      onClick={() =>
                        handleCategorySelect("Blazers & Waistcoats")
                      }
                    >
                      <label>{"Blazers & Waistcoats"}</label>
                    </div>
                    <div
                      className="category"
                      key="Co-ords"
                      onClick={() => handleCategorySelect("Co-ords")}
                    >
                      <label>{"Co-ords"}</label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Brand selection */}
            <div className="brand-selection">
              <label className="highlight">BRANDS</label>
              <div className="type">
                <input
                  type="checkbox"
                  id="nike"
                  value="Nike"
                  checked={selectedBrand.includes("Nike")}
                  onChange={() =>
                    handleMultiSelect("Nike", setSelectedBrand, selectedBrand)
                  }
                />
                <label htmlFor="nike">Nike</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  id="levis"
                  value="Levi's"
                  checked={selectedBrand.includes("Levi's")}
                  onChange={() =>
                    handleMultiSelect("Levi's", setSelectedBrand, selectedBrand)
                  }
                />
                <label htmlFor="levis">Levi's</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  id="adidas"
                  value="Adidas"
                  checked={selectedBrand.includes("Adidas")}
                  onChange={() =>
                    handleMultiSelect("Adidas", setSelectedBrand, selectedBrand)
                  }
                />
                <label htmlFor="adidas">Adidas</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  id="Ralph Lauren"
                  value="Ralph Lauren"
                  checked={selectedBrand.includes("Ralph Lauren")}
                  onChange={() =>
                    handleMultiSelect(
                      "Ralph Lauren",
                      setSelectedBrand,
                      selectedBrand
                    )
                  }
                />
                <label htmlFor="Ralph Lauren">Ralph Lauren</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  id="Under Armour"
                  value="Under Armour"
                  checked={selectedBrand.includes("Under Armour")}
                  onChange={() =>
                    handleMultiSelect(
                      "Under Armour",
                      setSelectedBrand,
                      selectedBrand
                    )
                  }
                />
                <label htmlFor="Under Armour">Under Armour</label>
              </div>
              <div className="type">
                <input
                  type="checkbox"
                  id="Tommy Hilfiger"
                  value="Tommy Hilfiger"
                  checked={selectedBrand.includes("Tommy Hilfiger")}
                  onChange={() =>
                    handleMultiSelect(
                      "Tommy Hilfiger",
                      setSelectedBrand,
                      selectedBrand
                    )
                  }
                />
                <label htmlFor="Tommy Hilfiger">Tommy Hilfiger</label>
              </div>
            </div>

            {/* Price Range */}
            <div className="price-selector">
              <label className="highlight">PRICE RANGE</label>
              <br />
              <div className="price-range">
                <div className="price">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    placeholder="Min Price"
                  />
                </div>
                <p>To</p>
                <div className="price">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    placeholder="Max Price"
                  />
                </div>
              </div>
              <div className="price-const-range">
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </div>
            </div>
            <div className="model-selection">
              <button
                onClick={() => toggleDropdown("model")}
                className="dropdown-toggle"
              >
                MODEL
                {isDropdownOpen.model ? (
                  <img
                    src="/src/assets/MenWear/arrowup.png"
                    alt="Up Arrow"
                    className="arrow-icon"
                  />
                ) : (
                  <img
                    src="/src/assets/MenWear/arrowdown.png"
                    alt="Down Arrow"
                    className="arrow-icon"
                  />
                )}
              </button>
              {isDropdownOpen.model && (
                <div className="dropdown-menu">
                  {["Sporty Tee", "ClassicFit", "511 Slim Fit"].map((model) => (
                    <div className="type" key={model}>
                      <input
                        type="checkbox"
                        id={model}
                        value={model}
                        checked={selectedModel.includes(model)}
                        onChange={() =>
                          handleMultiSelect(
                            model,
                            setSelectedModel,
                            selectedModel
                          )
                        }
                      />
                      <label htmlFor={model}>{model}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rating selection */}
            <div className="rating-selection">
              <button
                onClick={() => toggleDropdown("rating")}
                className="dropdown-toggle"
              >
                RATING
                {isDropdownOpen.rating ? (
                  <img
                    src="/src/assets/MenWear/arrowup.png"
                    alt="Up Arrow"
                    className="arrow-icon"
                  />
                ) : (
                  <img
                    src="/src/assets/MenWear/arrowdown.png"
                    alt="Down Arrow"
                    className="arrow-icon"
                  />
                )}
              </button>
              {isDropdownOpen.rating && (
                <div className="dropdown-menu">
                  {["5", "4", "3", "2"].map((rating) => (
                    <div className="type" key={rating}>
                      <input
                        type="checkbox"
                        id={`rating-${rating}`}
                        value={rating}
                        checked={selectedRating.includes(rating)}
                        onChange={() =>
                          handleMultiSelect(
                            rating,
                            setSelectedRating,
                            selectedRating
                          )
                        }
                      />
                      <label htmlFor={`rating-${rating}`}>
                        {rating} Stars & Above
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Discount selection */}
            <div className="discount-selection">
              <button
                onClick={() => toggleDropdown("discount")}
                className="dropdown-toggle"
              >
                DISCOUNT
                {isDropdownOpen.discount ? (
                  <img
                    src="/src/assets/MenWear/arrowup.png"
                    alt="Up Arrow"
                    className="arrow-icon"
                  />
                ) : (
                  <img
                    src="/src/assets/MenWear/arrowdown.png"
                    alt="Down Arrow"
                    className="arrow-icon"
                  />
                )}
              </button>
              {isDropdownOpen.discount && (
                <div className="dropdown-menu">
                  {["60%", "40%", "30%"].map((discount) => (
                    <div className="type" key={discount}>
                      <input
                        type="checkbox"
                        id={`discount-${discount}`}
                        value={discount}
                        checked={selectedDiscount.includes(discount)}
                        onChange={() =>
                          handleMultiSelect(
                            discount,
                            setSelectedDiscount,
                            selectedDiscount
                          )
                        }
                      />
                      <label htmlFor={`discount-${discount}`}>
                        {discount} & Above
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Type selection */}
            <div className="discount-selection">
              <button
                onClick={() => toggleDropdown("type")}
                className="dropdown-toggle"
              >
                {" "}
                TYPE
                {isDropdownOpen.type ? (
                  <img
                    src="/src/assets/MenWear/arrowup.png"
                    alt="Up Arrow"
                    className="arrow-icon"
                  />
                ) : (
                  <img
                    src="/src/assets/MenWear/arrowdown.png"
                    alt="Down Arrow"
                    className="arrow-icon"
                  />
                )}
              </button>

              {isDropdownOpen.type && (
                <div className="dropdown-menu">
                  {[
                    "Mens Plain Tshirts",
                    "Dress Shirt",
                    "Jeans",
                    "Hoodie",
                    "Blazer",
                    "Jacket",
                  ].map((type) => (
                    <div className="type" key={type}>
                      <input
                        type="checkbox"
                        id={type}
                        value={type}
                        checked={selectedType.includes(type)}
                        onChange={() =>
                          handleMultiSelect(type, setSelectedType, selectedType)
                        }
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <div className="navbar-filters-mobile">
            <div className="navbar-start-mobile">
              <div className="sort-by-selection-mobile">
                <label className="highlight-mobile">SORT BY</label>
                <div className="for-margin">
                  <button
                    onClick={() => toggleDropdown("sort")}
                    className="dropdown-toggle-mobile"
                  >
                    Sort
                  </button>
                </div>
                {isDropdownOpen.sort && (
                  <div className="dropdown-menu-mobile">
                    <div
                      className="type-mobile"
                      onClick={() => handleSort("relevant")}
                    >
                      <label>Relevance</label>
                    </div>
                    <div
                      className="type-mobile"
                      onClick={() => handleSort("priceLowToHigh")}
                    >
                      <label>Price: Low to High</label>
                    </div>
                    <div
                      className="type-mobile"
                      onClick={() => handleSort("priceHighToLow")}
                    >
                      <label>Price: High to Low</label>
                    </div>
                    <div
                      className="type-mobile"
                      onClick={() => handleSort("discount")}
                    >
                      <label>Discount</label>
                    </div>
                    <div
                      className="type-mobile"
                      onClick={() => handleSort("rating")}
                    >
                      <label>Ratings</label>
                    </div>
                  </div>
                )}
              </div>

              {/* Type selection */}
              <div className="type-selection-mobile ">
                <label className="highlight-mobile">CATEGORIES</label>
                <div className="for-margin">
                  <button
                    onClick={() => toggleDropdown("type")}
                    className="dropdown-toggle-mobile"
                  >
                    Type
                  </button>
                </div>
                {isDropdownOpen.type && (
                  <div className="dropdown-menu-mobile">
                    {[
                      "Mens Plain Tshirts",
                      "Dress Shirt",
                      "Jeans",
                      "Hoodie",
                      "Blazer",
                      "Jacket",
                    ].map((type) => (
                      <div className="type-mobile" key={type}>
                        <input
                          type="checkbox"
                          id={type}
                          value={type}
                          checked={selectedType.includes(type)}
                          onChange={() => {
                            handleMultiSelect(
                              type,
                              setSelectedType,
                              selectedType
                            );
                            handleSort("relevant");
                          }}
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Brand selection */}
              <div className="brand-selection-mobile">
                <label className="highlight-mobile">BRAND</label>
                <div className="for-margin">
                  <button
                    onClick={() => toggleDropdown("brand")}
                    className="dropdown-toggle-mobile"
                  >
                    Brand
                  </button>
                </div>
                {isDropdownOpen.brand && (
                  <div className="dropdown-menu-mobile">
                    {[
                      "Nike",
                      "Adidas",
                      "Levi’s",
                      "Tommy Hilfiger",
                      "Under Armour",
                      "Ralph Lauren",
                    ].map((brand) => (
                      <div className="type-mobile" key={brand}>
                        <input
                          type="checkbox"
                          id={brand}
                          value={brand}
                          checked={selectedBrand.includes(brand)}
                          onChange={() =>
                            handleMultiSelect(
                              brand,
                              setSelectedBrand,
                              selectedBrand
                            )
                          }
                        />
                        <label htmlFor={brand}>{brand}</label>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price range selection with dropdown */}
              <div className="price-selection-mobile">
                <label className="highlight-mobile">PRICE RANGE</label>
                <div className="for-margin">
                  <button
                    onClick={() => toggleDropdown("price")}
                    className="dropdown-toggle-mobile"
                  >
                    Price
                  </button>
                </div>
                {isDropdownOpen.price && (
                  <div className="dropdown-menu-mobile">
                    <div className="price-range-mobile">
                      <div className="price-mobile">
                        <input
                          type="number"
                          min="0"
                          max="5000"
                          value={priceRange[0]}
                          onChange={handleMinPriceChange}
                          placeholder="Min Price"
                        />
                      </div>
                      <p>To</p>
                      <div className="price-mobile">
                        <input
                          type="number"
                          min="0"
                          max="5000"
                          value={priceRange[1]}
                          onChange={handleMaxPriceChange}
                          placeholder="Max Price"
                        />
                      </div>
                    </div>
                    <div className="price-const-range-mobile">
                      Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </div>
                  </div>
                )}
              </div>

              {/* Rating selection */}
              <div className="rating-selection-mobile">
                <label className="highlight-mobile">USER RATING</label>
                <div className="for-margin">
                  {" "}
                  <button
                    onClick={() => toggleDropdown("rating")}
                    className="dropdown-toggle-mobile"
                  >
                    Ratings
                  </button>
                </div>
                {isDropdownOpen.rating && (
                  <div className="dropdown-menu-mobile">
                    {["5", "4", "3", "2"].map((rating) => (
                      <div className="type-mobile" key={rating}>
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          value={rating}
                          checked={selectedRating.includes(rating)}
                          onChange={() =>
                            handleMultiSelect(
                              rating,
                              setSelectedRating,
                              selectedRating
                            )
                          }
                        />
                        <label htmlFor={`rating-${rating}`}>
                          {rating} Stars & Above
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Discount selection */}
              <div className="discount-selection-mobile">
                <label className="highlight-mobile">DISCOUNT</label>
                <div className="for-margin">
                  {" "}
                  <button
                    onClick={() => toggleDropdown("discount")}
                    className="dropdown-toggle-mobile"
                  >
                    Discount
                  </button>
                </div>
                {isDropdownOpen.discount && (
                  <div className="dropdown-menu-mobile">
                    {["60%", "40%", "30%"].map((discount) => (
                      <div className="type-mobile" key={discount}>
                        <input
                          type="checkbox"
                          id={`discount-${discount}`}
                          value={discount}
                          checked={selectedDiscount.includes(discount)}
                          onChange={() =>
                            handleMultiSelect(
                              discount,
                              setSelectedDiscount,
                              selectedDiscount
                            )
                          }
                        />
                        <label htmlFor={`discount-${discount}`}>
                          {discount} & Above
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="product-display"
            onClick={() => {
              setIsDropdownOpen({
                type: false,
                brand: false,
                price: false,
                rating: false,
                discount: false,
                sort: false,
              });
            }}
          >
            <div className="navbar-header-mobile">
              <div className="navbar-header-photo-mobile">
                <img src="/src/assets/MenWear/header.jpg" alt="Header Image" />
              </div>
              <div className="navbar-header-line-mobile">
                <h2>MODERN MEN'S FASHION</h2>
              </div>
            </div>
            <h1 className="main-content-head">CLOTHING & ACCESSORIES</h1>
            <div className="product-display-item">
              {filteredMenData && filteredMenData.length > 0 ? (
                filteredMenData.map((item) => (
                  <MensItemPage
                    key={item.id}
                    id={item.id}
                    product={item.product}
                    images={item.images}
                    type={item.type}
                    brand={item.brand}
                    name={item.name}
                    model={item.model}
                    cprice={item.cprice}
                    discount={item.discount}
                    rating={item.rating}
                    sprice={item.sprice}
                    MOQ={item.MOQ}
                    ratingsCount={item.ratingsCount}
                    reviewsCount={item.reviewsCount}
                    sizes={item.sizes}
                    deliveryDate={item.deliveryDate}
                    category={item.category}
                    description={item.description}
                  />
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MensPage;
