class ApiClient {
  constructor() {
    (this.baserURL = `http://localhost:3000/api/v1/`),
      (this.defaultHeader = {
        "Content-type": "application/json",
        Accept: "application/json",
      });
  }

  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baserURL}${endpoint}`;
      const headers = { ...this.defaultHeader, ...options.headers };
      const config = {
        ...options,
        headers,
        credentials: "include",
      };
      const res = await fetch(url, config);
      const data = await res.json();
      console.log("url:", url);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  }

  async adminLogin(email, password) {
    return this.customFetch("admin/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async adminLogOut() {
    return this.customFetch("admin/logout", {
      method: "GET",
    });
  }

  async employeeLogin(email, password) {
    return this.customFetch("employee/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async employeeLogOut() {
    return await this.customFetch("employee/logout", {
      method: "GET",
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
