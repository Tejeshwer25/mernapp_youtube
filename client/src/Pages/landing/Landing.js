import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "../../Components/card/Card";
import styles from "./Landing.module.css";
import { UserContext } from "../../Context/UserContext";

function Landing() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { userDetail } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    async function getAPIData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=in&apiKey=bbd4a97c4e77492ea5e40af254ebf2f9`
        );
        const data = res.data;
        const articles = data.articles;
        setData(articles);
        console.log(articles);
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }

    if (userDetail.name) {
      navigate("/home");
    }

    getAPIData();
  }, [navigate, userDetail.name]);

  return (
    <>
      {loading ? (
        <div className={styles.loading}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className={styles.landing}>
          {error === "" ? (
            <>
              {data.map((article) => (
                <Card
                  link={article.url}
                  media={article.urlToImage}
                  title={article.title}
                  article={article.description}
                />
              ))}
            </>
          ) : (
            <p>{error}</p>
          )}
        </div>
      )}
    </>
  );
}

export default Landing;
