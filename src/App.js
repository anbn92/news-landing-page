import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const API_KEY = "fbd2defd62f749b2879f9515c50b86f2";

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the news", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container">
      <h1 className="my-5 text-center display-4 modern-heading">Latest News</h1>
      {loading ? (
        <div className="text-center">
          <p>Loading news...</p>
        </div>
      ) : (
        <div className="row">
          {articles.map((article, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm modern-card">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    className="card-img-top "
                    alt={article.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {article.title.length > 100
                      ? article.title.slice(0, 100) + "..."
                      : article.title}
                  </h5>
                  <p className="card-text modern-text">
                    {article.description
                      ? article.description.length > 100
                        ? article.description.slice(0, 100) + "..."
                        : article.description
                      : "No description available."}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center">
                  <small className="text-muted modern-date">
                    <i className="bi bi-calendar"></i>
                    {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </small>
                  <a
                    href={article.url}
                    className="btn modern-btn btn-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
