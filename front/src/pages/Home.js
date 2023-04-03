const Home = () => {
  return (
    <div id="main">
      <div id="proverb">
        <h2>
          "To learn a language is to have one more window from which to look at
          the world."
        </h2>
        <h4>-Chinese Proverb</h4>
      </div>
      <div className="sections">
        <div className="section left">
          <div className="img">
            <img src="./img/img1.jpg" alt="img1"></img>
          </div>
          <div className="paraf">
            <p>
              Practice a language, explore new cultures, and make friends around
              the world for free!The best way to learn a language is to actually
              use it! <span className="l">Language</span>
              <span className="ch">Chat </span>helps you to connect with native
              speakers and chat with them for free.
            </p>
          </div>
        </div>
        <div className="section right">
          <div className="paraf">
            <p>
              Search for language exchange partners by native language, city,
              country and more. Whether it's across the world or across your
              town, you'll instantly find suitable partners to begin a
              conversation with.
            </p>
          </div>
          <div className="img">
            <img src="./img/img2.jpg" alt="img2"></img>
          </div>
        </div>
        <div className="section left">
          <div className="img">
            <img src="./img/img3.jpg" alt="img3"></img>
          </div>
          <div className="paraf">
            <p>
              Share an update or ask a question about language, culture, or
              travel for native speakers to see and comment on.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
