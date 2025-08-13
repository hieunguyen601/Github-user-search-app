const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".search-box");
const userInfo = document.querySelector(".user-information");

function formatJoined(iso) {
    if (!iso) return "Joined —";
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleString("en-US", { month: "short" });
    const year = d.getFullYear();
    return `Joined ${day} ${month} ${year}`;
};

searchButton.addEventListener("click", async () => {
  try {
    userInfo.innerHTML = "";
    const inputHandler = searchInput.value.trim();
    const url = `https://api.github.com/users/${inputHandler}`;
    const response = await fetch(url);
    let data = await response.json();
    if (!response.ok) {
      userInfo.innerHTML = 'There is no this user!';
      searchInput.value = "";
      return;
    } else {
      userInfo.innerHTML += `
        <div class="avatar-container">
            <img class="profile-picture" src=${data.avatar_url}/>
        </div>

        <div class="profile-details">
            <div class="name-info">
                <h2 class="name">${data.name}</h2>
                <p class="joined-date">${formatJoined(data.created_at)}</p>
            </div>

                        
            <div class="username-bio">
                <p class="username">@${data.login}</p>
                <p class="bio">${data.bio}</p>
            </div>
            <div class="stats">
                <div class="stat-labels">
                    <p>Repos</p>
                    <p>Followers</p>
                    <p>Following</p>
                </div>
                <div class="stat-values">
                    <p>${data.public_repos}</p>
                    <p>${data.followers}</p>
                    <p>${data.following}</p>
                </div>
            </div>

            <div class="meta">
                <div class="meta-item">
                    <img src="./assets/icon-location.svg" class="location-icon" />
                    <p>${data.location || "Not Available"}</p>
                </div>

                <div class="meta-item">
                    <img src="./assets/icon-twitter.svg" class="twitter-icon" />
                    <p>${data.twitter_username || "Not Available"}</p>
                </div>

                <div class="meta-item">
                    <img src="./assets/icon-website.svg" class="search-icon" />
                    <p>${data.html_url || "Not Available"}</p>
                </div>

                <div class="meta-item">
                    <img src="./assets/icon-company.svg" class="building-icon" />
                    <p>${data.company || "Not Available"}</p>
                </div>
            </div>
        </div>

            `;
            searchInput.value = "";
    }

  } catch (error) {
    console.log(error);
  }
});


const changeBackground = document.querySelector('.background-mode');

changeBackground.addEventListener('click', () => {
    const bodyElement = document.body;
    const isLight = bodyElement.classList.toggle("light-background");
    changeBackground.textContent = isLight ? "Dark" : "Light";
})