import React, { memo, useEffect, useState } from "react";
import styles from "./spinner.module.scss";

const Spinner = memo(() => {
  const [preloader, setPreloader] = useState("");
  // useEffect(()=> {
  //   if (typeof window !== "undefined") {
  //     const { sessionStorage} = window;
  //     setPreloader(sessionStorage.getItem("preloader"));
  //     }
  // })
  return (
    <div className={`${styles["fallback-spinner"]} ${styles["app-loader"]}`}>
      <>
        <div>
          <img
            className="fallback-logo"
            src="/preloaders.png"
            alt="logo"
          />
        </div>
        <div className={`${styles["loading"]}`}>
          <div className={`${styles["effect-1"]} ${styles["effects"]}`}></div>
          <div className={`${styles["effect-2"]} ${styles["effects"]}`}></div>
          <div className={`${styles["effect-3"]} ${styles["effects"]}`}></div>
        </div>
      </>
    </div>
  );
});

export default Spinner;
