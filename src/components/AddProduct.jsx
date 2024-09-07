import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../features/productSlice";

function AddProduct() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createProduct = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      dispatch(saveProduct({ product, price }));
      navigate("/");
      setLoading(false);
    },
    [dispatch, navigate, product, price]
  );

  return (
    <div>
      <form onSubmit={createProduct} className="box mt-5">
        <div className="field">
          <label className="label">Product</label>
          <div className="control">
            <input type="text" className="input" value={product} onChange={(e) => setProduct(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label className="label">Price</label>
          <div className="control">
            <input type="text" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className="field">
          {loading && <p>Loading...</p>}
          <button type="submit" className="button is-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
