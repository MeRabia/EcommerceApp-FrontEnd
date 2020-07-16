import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const ViewProduct = (props) => {
  const [viewProduct, setviewProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  // create a methode and run in use effect
  // we need to grap this product idea i from the road parameter when did component mount

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setviewProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);
  return (
    <Layout
      title={viewProduct && viewProduct.name}
      description={
        viewProduct &&
        viewProduct.description &&
        viewProduct.description.substring(0, 100)
      }
      className="container-fluid"
    >
      {/* for insert the information we can use card in place {JSON.stringify(viewProduct)} */}

      <div className="row">
        <div className="col-8">
          {viewProduct && viewProduct.description && (
            <Card product={viewProduct} showViewProductButton={false} />
          )}
        </div>

        <div className="col-4">
          <h4>Related Product</h4>
          {relatedProduct.map((p, i) => (
            <div className="mb-3">
              <Card key={i} product={p} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ViewProduct;
