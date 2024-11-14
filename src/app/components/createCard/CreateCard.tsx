"use client";
import { useAppDispatch } from "@/hooks/store";
import { addCard } from "@/store/features/imagesSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./createCard.module.css";

const CreateCard = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isAdded, setIsAdded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    temperament: "",
    life_span: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    temperament: "",
    life_span: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const textOnly = /^[A-Za-zА-Яа-я\s]*$/;
    if ((name === "name" || name === "temperament") && !textOnly.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only letters are allowed",
      }));
      return;
    }

    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "This field is required",
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addCard({
        id: Date.now().toString(),
        url: "https://cdn2.thecatapi.com/images/28r.jpg",
        breeds: [{ ...formData }],
      })
    );
    setIsAdded(true);
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <label className={styles.label}>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        <label className={styles.label}>
          Темперамент:
          <input
            type="text"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        {errors.temperament && (
          <p style={{ color: "red" }}>{errors.temperament}</p>
        )}

        <label className={styles.label}>
          Продолжительность жизни:
          <input
            type="text"
            name="life_span"
            value={formData.life_span}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </label>
        {errors.life_span && <p style={{ color: "red" }}>{errors.life_span}</p>}

        <button type="submit" className={styles.submitButton}>
          Добавить
        </button>

        <Link href="/">
          <button className={styles.backButton}>Назад</button>
        </Link>
        {isAdded && (
          <div className={styles.successMessage}>
            Карточка успешно добавлена.
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateCard;
