import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { createProduct, getProducts, updateProduct } from "../api.js";
import closeIcon from "../assets/close.png";
import editIcon from "../assets/edit.png";
import filterIcon from "../assets/filter.png";
import managerPhoto from "../assets/manager.png";
import searchIcon from "../assets/search.png";
import trashIcon from "../assets/trash.png";
import styles from "./Products.module.css";

function Products() {
  const token = localStorage.getItem("token");
  let username = localStorage.getItem("username") || "";
  if (!username && token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      username = payload.username || "";
    } catch {
      username = "";
    }
  }

  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  const productsQuery = useQuery({
    queryKey: ["products", page, search],
    queryFn: () => getProducts(page, search),
  });

  const products = productsQuery.data?.data || [];
  const totalPages = productsQuery.data?.totalPages || 1;

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setModal("");
    },
    onError: (err) => {
      if (err.status === 401) {
        setError("برای افزودن محصول باید وارد شده باشید.");
        return;
      }
      setError("افزودن محصول انجام نشد.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setModal("");
    },
    onError: (err) => {
      if (err.status === 401) {
        setError("برای ویرایش محصول باید وارد شده باشید.");
        return;
      }
      setError("ویرایش محصول انجام نشد.");
    },
  });

  function openAdd() {
    setName("");
    setQuantity("");
    setPrice("");
    setError("");
    setModal("add");
  }

  function openEdit(item) {
    setSelected(item);
    setName(item.name);
    setQuantity(item.quantity);
    setPrice(item.price);
    setError("");
    setModal("edit");
  }

  function handleAdd(e) {
    e.preventDefault();
    setError("");
    createMutation.mutate({
      name,
      quantity: Number(quantity),
      price: Number(price),
    });
  }

  function handleEdit(e) {
    e.preventDefault();
    setError("");
    updateMutation.mutate({
      id: selected.id,
      product: {
        name,
        quantity: Number(quantity),
        price: Number(price),
      },
    });
  }

  const pages = [];
  for (let i = 1; i <= Math.max(totalPages, 1); i++) {
    pages.push(i);
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <div className={styles.searchWrap}>
          <img src={searchIcon} className={styles.searchIcon} />
          <input
            className={styles.search}
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.profile}>
          <img src={managerPhoto} className={styles.avatar} />
          <div className={styles.profileText}>
            <p className={styles.profileName}>{username}</p>
            <p className={styles.profileRole}>مدیر</p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.titleWrap}>
          <img src={filterIcon} className={styles.filterIcon} />
          <h1>مدیریت کالا</h1>
        </div>
        <button className={styles.btn} onClick={openAdd}>
          افزودن محصول
        </button>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsQuery.isLoading ? (
              <tr>
                <td colSpan="5">در حال بارگذاری...</td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan="5">محصولی پیدا نشد</td>
              </tr>
            ) : (
              products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price} تومان</td>
                  <td>{item.id}</td>
                  <td>
                    <div className={styles.ops}>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => openEdit(item)}
                      >
                        <img src={editIcon} alt="edit" className={styles.icon} />
                      </button>
                      <button
                        type="button"
                        className={styles.iconBtn}
                        onClick={() => {
                          setSelected(item);
                          setModal("delete");
                        }}
                      >
                        <img src={trashIcon} alt="delete" className={styles.icon} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {pages.map((num) => (
            <button
              key={num}
              type="button"
              className={page === num ? styles.pageActive : styles.pageBtn}
              onClick={() => setPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {modal === "add" && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>ایجاد محصول جدید</h2>
            <form className={styles.form} onSubmit={handleAdd}>
              <input
                className={styles.input}
                type="text"
                placeholder="نام کالا"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="number"
                placeholder="تعداد"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="number"
                placeholder="قیمت"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              {error ? <p className={styles.error}>{error}</p> : null}
              <button type="submit" className={styles.btn} disabled={createMutation.isPending}>
                ایجاد
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.gray}`}
                onClick={() => setModal("")}
              >
                انصراف
              </button>
            </form>
          </div>
        </div>
      )}

      {modal === "edit" && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>ویرایش محصول</h2>
            <form className={styles.form} onSubmit={handleEdit}>
              <input
                className={styles.input}
                type="text"
                placeholder="نام کالا"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="number"
                placeholder="تعداد"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="number"
                placeholder="قیمت"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              {error ? <p className={styles.error}>{error}</p> : null}
              <button type="submit" className={styles.btn} disabled={updateMutation.isPending}>
                ذخیره تغییرات
              </button>
              <button
                type="button"
                className={`${styles.btn} ${styles.gray}`}
                onClick={() => setModal("")}
              >
                انصراف
              </button>
            </form>
          </div>
        </div>
      )}

      {modal === "delete" && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.deleteModal} onClick={(e) => e.stopPropagation()}>
            <img src={closeIcon} className={styles.closeIcon} />
            <p className={styles.deleteText}>آیا از حذف این محصول مطمئن هستید؟</p>
            <div className={styles.deleteActions}>
              <button className={`${styles.btn} ${styles.red}`} onClick={() => setModal("")}>
                حذف
              </button>
              <button className={`${styles.btn} ${styles.gray}`} onClick={() => setModal("")}>
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
