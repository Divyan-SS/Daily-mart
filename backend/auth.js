module.exports = {
  authenticateUser: (username, password) => {
    // 👉 Dummy check: accept any user/pass
    // In real app: check DB here
    if (username && password) {
      return true; 
    } else {
      return false;
    }
  }
};
