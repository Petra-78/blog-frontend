import { useContext, useState } from "react";
import codingImage from "../../assets/coding.jpg";
import Posts from "../../components/Posts/Posts";
import { useAuth } from "../../context/authContext";
import styles from "./Home.module.css";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <div className={styles.text}>
          <h1 className={styles.title}>Welcome to From Scratch!</h1>
          <p className={styles.description}>
            This blog is a collection of thoughts, experiences, and experiments
            of my journey. From web development projects to lessons learned
            along the way, you can find anything. It’s a mix of code, curiosity,
            and everyday reflections.
          </p>
        </div>

        <div className={styles.imageWrapper}>
          <img
            src={codingImage}
            alt="Coding on a computer"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.posts}>
        <h2>Featured posts</h2>
        <Posts />
      </div>
    </div>
  );
}
