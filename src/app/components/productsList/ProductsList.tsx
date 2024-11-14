"use client";
import { fetchImages } from "@/api/fetchImages";
import ProductCard from "../productCard/ProductCard";
import styles from "./productList.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import {
  deleteImage,
  setFilter,
  setImages,
} from "@/store/features/imagesSlice";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductsList = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const {
    likedImages,
    dataImages,
    images: imagesInFilter,
    filteredImages,
  } = useAppSelector((state) => state.images);

  useEffect(() => {
    if (filteredImages === "favorites") {
      dispatch(setFilter("favorites"));
    } else {
      dispatch(setFilter("all"));
    }
  }, [dispatch, filteredImages, likedImages, dataImages]);

  function onClickMore() {
    setLoading(true); 
    fetchImages().then((res) => {
      dispatch(setImages([...imagesInFilter, ...res]));
      setLoading(false);
    });
  }

  function handleFilter(chosedFilter: "all" | "favorites") {
    dispatch(setFilter(chosedFilter));
  }

  function handleDelete(imageId: string) {
    dispatch(deleteImage(imageId));
  }

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.filterBtnsContain}>
          <button
            className={styles.filterBtn}
            onClick={() => handleFilter("favorites")}
          >
            Лайкнутые
          </button>
          <button
            className={styles.filterBtn}
            onClick={() => handleFilter("all")}
          >
            Все
          </button>
        </div>
        <Link href="/create-product">
          <button className={styles.createButton}>Создать</button>
        </Link>
      </div>

      <div className={styles.imagesContain}>
        {loading ? ( 
          <p className={styles.loader}>Загрузка...</p>
        ) : imagesInFilter.length === 0 ? (
          "Not found"
        ) : (
          imagesInFilter.map((image) => (
            <ProductCard
              key={image.id}
              image={image}
              onRemove={() => handleDelete(image.id)}
            />
          ))
        )}
      </div>
      <div className={styles.buttonsWrapper}>
        {filteredImages !== "favorites" &&
          !loading && (
            <button className={styles.button} onClick={onClickMore}>
              Больше
            </button>
          )}
      </div>
    </div>
  );
};

export default ProductsList;
