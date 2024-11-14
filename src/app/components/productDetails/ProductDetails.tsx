"use client";
import { usePathname } from "next/navigation";
import styles from "./productDetails.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/store";
import { BreedType } from "@/types/types";
import Image from "next/image";

const ProductDetails = () => {
  const pathname = usePathname();
  const [decodedId, setDecodedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

  const segments = pathname.split("/");
  const id = segments[segments.length - 1];

  useEffect(() => {
    if (id) {
      setDecodedId(decodeURIComponent(id));
    }
  }, [id]);

  const card = useAppSelector((state) =>
    state.images.images.find((img) => img.id === id)
  );

  if (!decodedId || !card) return <p>Loading...</p>;

  const breedInfo: BreedType = card?.breeds?.[0] || {
    name: "Нет данных",
    temperament: "Не известно",
    life_span: "Не известно",
  };

  return (
    <div className={styles.productDetail}>
      <h1 className={styles.title}>{breedInfo.name}</h1>
      <div className={styles.content}>
        <div className={styles.info}>
          <p>Темперамент: {breedInfo.temperament}</p>
          <p>Продолжительность жизни: {breedInfo.life_span}</p>
        </div>
        {loading && <div className={styles.loader}>Loading image...</div>}{" "}
        {/* Loader component */}
        <Image
          src={card.url}
          alt={breedInfo.name}
          width={280}
          height={280}
          className={styles.image}
          onLoadingComplete={() => setLoading(false)} // Hide loader when image loads
        />
      </div>

      <Link href="/">
        <button className={styles.backButton}>Back</button>
      </Link>
    </div>
  );
};

export default ProductDetails;
