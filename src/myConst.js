// urls
const baseUrl = "http://localhost:3000/api";
const loginUrl = `${baseUrl}/auth/login`;
const signUpUrl = `${baseUrl}/auth/add`;
const authenticateUrl = `${baseUrl}/auth/getUser`;
const addProjectUrl = `${baseUrl}/projects/add`;
const fetchProjects = `${baseUrl}/projects/fetch`;
const updateProject = `${baseUrl}/projects/update`;
const fetchImageUrl = `${baseUrl}/projects/fetch/images`;
const assetsBaseUrl = `http://localhost:3000`;

// methods for manage cooke

function setCookie(key, value, expiryDate) {
  const d = new Date();
  d.setTime(d.getTime() + expiryDate * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = key + "=" + value + ";" + expires;
}
function getCookie(key) {
  let name = key + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export default baseUrl;
export {
  loginUrl,
  signUpUrl,
  setCookie,
  getCookie,
  authenticateUrl,
  addProjectUrl,
  fetchProjects,
  updateProject,
  fetchImageUrl,
  assetsBaseUrl,
};
