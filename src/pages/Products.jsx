import { useState } from "react";
import closeIcon from "../../assets/close.png";
import editIcon from "../../assets/edit.png";
import filterIcon from "../../assets/filter.png";
import managerPhoto from "../../assets/manager.png";
import searchIcon from "../../assets/search.png";
import trashIcon from "../../assets/trash.png";
import styles from "./Products.module.css";

function toPersian(value) {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(value).replace(/[0-9]/g, (digit) => digits[digit]);
}

function formatPrice(price) {
  return toPersian(Math.round(price / 1000)) + " هزار تومان";
}

function Products() {
  const products = [
    { id: "90uf9g9h7895467g974", name: "تیشرت طرح انگولار", quantity: 293, price: 90000 },
    { id: "89dhf7g6h543210k321", name: "قهوه اسپرسو", quantity: 12, price: 320000 },
    { id: "76abc5d4e987654f210", name: "چای سبز", quantity: 40, price: 180000 },
    { id: "65xyz4c3b876543a109", name: "شیر بادام", quantity: 8, price: 95000 },
  ];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = products.filter((item) => item.name.includes(search));

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <div className={styles.searchWrap}>
          <img src={searchIcon} alt="" className={styles.searchIcon} />
          <input
            className={styles.search}
            type="text"
            placeholder="جستجو کالا"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.profile}>
          <img src={managerPhoto} alt="" className={styles.avatar} />
          <div className={styles.profileText}>
            <p className={styles.profileName}>میلاد عظمی</p>
            <p className={styles.profileRole}>مدیر</p>
          </div>
        </div>
      </div>

      <div className={styles.secondRow}>
        <div className={styles.titleWrap}>
          <img src={filterIcon} alt="" className={styles.filterIcon} />
          <h1>مدیریت کالا</h1>
        </div>
        <button className={styles.btn} onClick={() => setModal("add")}>
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
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{toPersian(item.quantity)}</td>
                <td>{formatPrice(item.price)}</td>
                <td>{item.id}</td>
                <td>
                  <div className={styles.ops}>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setSelected(item);
                        setModal("edit");
                      }}
                    >
                      <img src={editIcon} alt="ویرایش" className={styles.icon} />
                    </button>
                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={() => {
                        setSelected(item);
                        setModal("delete");
                      }}
                    >
                      <img src={trashIcon} alt="حذف" className={styles.icon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.pagination}>
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              type="button"
              className={page === num ? styles.pageActive : styles.pageBtn}
              onClick={() => setPage(num)}
            >
              {toPersian(num)}
            </button>
          ))}
        </div>
      </div>

      {modal === "add" && (
        <div className={styles.overlay} onClick={() => setModal("")}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>ایجاد محصول جدید</h2>
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setModal("");
              }}
            >
              <input className={styles.input} type="text" placeholder="نام کالا" />
              <input className={styles.input} type="number" placeholder="تعداد" />
              <input className={styles.input} type="number" placeholder="قیمت" />
              <button type="submit" className={styles.btn}>
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
            <form
              className={styles.form}
              onSubmit={(e) => {
                e.preventDefault();
                setModal("");
              }}
            >
              <input className={styles.input} type="text" defaultValue={selected.name} />
              <input className={styles.input} type="number" defaultValue={selected.quantity} />
              <input className={styles.input} type="number" defaultValue={selected.price} />
              <button type="submit" className={styles.btn}>
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
            <img src={closeIcon} alt="" className={styles.closeIcon} />
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
