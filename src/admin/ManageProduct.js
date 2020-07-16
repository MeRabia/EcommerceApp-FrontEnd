import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
  //store the data in the state
  const [products, setProducts] = useState([]);

  const { user, token } = isAuthenticated();

  // get all the product from api
  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    // whene the component mount i will execute
    loadProducts();
  }, []);

  // delete product methode
  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadProducts();
      }
    });
  };
  /*   submit = () => {
      confirmAlert({
        title: "Confirm to submit",
        message: "Are you sure to do this.",
        buttons: [
          {
            label: "Yes",
            onClick: () => alert("Click Yes", destroy(p._id)),
          },
          {
            label: "No",
            onClick: () => alert("Click No"),
          },
        ],
      });
    }; */
  return (
    <Layout
      title="Manage Products"
      description="Perform Create/Read/Update/Delete on products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">
            You Have in Total{products.length} products
          </h2>
          <hr />
          <ul className="list-group">
            {products.map((p, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <strong>{p.name}</strong>
                <Link to={`/admin/product/update/${p._id}`}>
                  <span className="badge badge-warning badge-pill ">
                    Update
                  </span>
                </Link>
                <Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                        >
                            
                    Delete
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <br />
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
