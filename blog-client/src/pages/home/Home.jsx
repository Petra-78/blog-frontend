import { useContext, useState } from "react";
import codingImage from "../../assets/coding.jpg";
import Posts from "../../components/Posts/Posts";

export default function Home() {
  return (
    <div>
      <div>
        <h1>Welcome to From Scratch!</h1>
        <p>
          This blog is a collection of thoughts, experiences, and experiments of
          my journey. From web development projects to lessons learned along the
          way, you can find anything. It’s a mix of code, curiosity, and
          everyday reflections.
        </p>
      </div>
      <div>
        <img src={codingImage} alt="Coding on a computer" />
      </div>
      <div>
        <Posts />
      </div>
    </div>
  );
}
