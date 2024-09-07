import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, productSelector, updateProduct } from "../features/productSlice";

function EditProduct() {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Pastikan `useSelector` mengembalikan data yang benar
  const productData = useSelector((state) => productSelector.selectById(state, id));

  // Ambil data produk setelah komponen di-mount
  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  // Isi state dengan data produk yang ada ketika productData berubah
  useEffect(() => {
    if (productData) {
      setProduct(productData.product);
      setPrice(productData.price);
    }
  }, [productData]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, product, price }));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleUpdate} className="box mt-5">
        <div className="field">
          <label className="label" htmlFor="product">
            Product
          </label>
          <div className="control">
            <input type="text" id="product" name="product" className="input" value={product} onChange={(e) => setProduct(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label className="label" htmlFor="price">
            Price
          </label>
          <div className="control">
            <input type="text" id="price" name="price" className="input" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
        </div>
        <div className="field">
          <button type="submit" className="button is-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
