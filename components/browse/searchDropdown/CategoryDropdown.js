import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { browseSearchActions } from "../../../store/browseSearchSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

export default function CategoryDropdown(props) {
  let dropdownRef = useRef();
  let dispatch = useDispatch();

  let categoriesResult = useSelector((state) => state.browseSearch.categories);
  let categoryInput = useSelector((state) => state.browseSearch.categoryInput);
  let isVisible = useSelector((state) => state.browseSearch.isCategoryVisible);
  let selectedCategory = useSelector(
    (state) => state.browseSearch.selectedCategory
  );

  let handleOnChange = (e) => {
    console.log(e.target.value);
    dispatch(browseSearchActions.setCategoryInput(e.target.value));
  };

  let handleOnClick = (e) => {
    dispatch(browseSearchActions.setIsCategoryVisible(true));
  };

  let handleOptionClick = (e) => {
    let categoryId = e.currentTarget.id;
    let name = categoriesResult.find((category) => category.id == categoryId)
      .name;
    dispatch(
      browseSearchActions.setSelectedCategory({
        id: categoryId,
        name: name,
      })
    );
    dispatch(browseSearchActions.setIsCategoryVisible(false));
  };

  useEffect(() => {
    let curTimeout = setTimeout(async () => {
      if (!categoryInput) return;

      let categories = [];

      try {
        let request = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/taxonomies?q=${categoryInput}&client_id=${process.env.NEXT_PUBLIC_MY_CLIENT_ID}&per_page=5`;
        let apiJsonResponse = await fetch(request);
        let categoriesData = await apiJsonResponse.json();

        let useData =
          categoriesData.taxonomies.length > 5
            ? categoriesData.taxonomies.slice(5)
            : categoriesData.taxonomies;

        categories = useData.map((category, index) => {
          return {
            id: category.id,
            name: category.name,
          };
        });
      } catch (e) {
        console.log(e);
      }
      dispatch(browseSearchActions.showCategories(categories));
    }, 100);

    return () => clearTimeout(curTimeout);
  }, [categoryInput]);

  useEffect(() => {
    let checkIfClickedOutside = (e) => {
      if (isVisible && dropdownRef && !dropdownRef.current.contains(e.target)) {
        dispatch(browseSearchActions.setIsCategoryVisible(false));
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () =>
      document.removeEventListener("mousedown", checkIfClickedOutside);
  }, [isVisible]);

  return (
    <Fragment>
      {!isVisible && (
        <li
          className="w-1/3 relative hover:bg-blueLight rounded-r-lg p-4 border-borderColor flex justify-between items-center cursor-pointer"
          onClick={handleOnClick}
          id="location"
        >
          <div className="flex">
            <div className="bg-red w-12 h-12 rounded-lg mr-4 flex items-center justify-center">
              <FontAwesomeIcon
                icon="fa-solid fa-tag"
                style={{
                  color: "white",
                  height: "25px",
                  width: "25px",
                }}
              />
            </div>
            <div className="">
              <p className="font-semibold">Category</p>
              <p className="text-sm leading-3 text-gray">
                {selectedCategory.name || "Any"}
              </p>
            </div>
          </div>
          <div>
            <FontAwesomeIcon
              icon="fa-solid fa-caret-down"
              style={{ color: "gray" }}
            />
          </div>
        </li>
      )}
      {isVisible && (
        <li
          className="w-1/3 relative p-4 rounded-lg border-r border-borderColor flex justify-between items-center cursor-pointer"
          id="location"
          ref={dropdownRef}
        >
          <div className="flex px-3 h-12  w-full bg-white2 items-center rounded-lg">
            <span className="text-gray mr-4">
              <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            </span>
            <div>
              <input
                className=" text-black bg-inherit text-base"
                type="text"
                placeholder="Search your category"
                onChange={handleOnChange}
                value={categoryInput}
              />
            </div>
          </div>
          {categoriesResult.length > 0 && (
            <div className="absolute top-full left-0 w-full z-[1000] drop-shadow-lg border-t border-borderColor rounded-l-lg overflow-hidden bg-white text-black cursor-pointer">
              <ul className="py-2 flex flex-col justify-center">
                {categoriesResult.map((result) => {
                  return (
                    <li
                      key={result.id}
                      id={result.id}
                      className="flex py-2 px-3 hover:text-black w-full hover:bg-white2"
                      onClick={handleOptionClick}
                    >
                      <div className="flex flex-col">
                        <p>{result.name}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </li>
      )}
    </Fragment>
  );
}
