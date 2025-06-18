class ApiClient {
  constructor() {
    (this.baserURL = `http://localhost:3000/api/v1/`),
      (this.defaultHeader = {
        "Content-type": "application/json",
        Accept: "application/json",
      });
  }

  async customFetch(endpoint, options = {}) {
    // console.log("opins",JSON.parse(options.body));
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
      console.log("data in admin customfetch", data);
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
  async createAdmin(email, password, name) {
    console.log({ email, password, name });
    return this.customFetch("admin/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
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

  async createEmployee(email, password, name) {
    return this.customFetch("employee/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });
  }
  async getEmployee() {
    return this.customFetch("employee/getemployee", {
      method: "GET",
    });
  }
  async employeeLogOut() {
    return await this.customFetch("employee/logout", {
      method: "GET",
    });
  }
  async createTask(data) {
    return this.customFetch(
      "task/create",

      {
        method: "POST",
        body: JSON.stringify({
          taskTitle: data.taskTitle,
          taskDescription: data.taskDescription,
          taskDate: data.date,
          category: data.category,
          assignedTo: data.assignTo,
        }),
      }
    );
  }
}

const apiClient = new ApiClient();
export default apiClient;
