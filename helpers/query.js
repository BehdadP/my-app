module.exports = async (conn, q, params) => new Promise(
  (resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(new Error('Query executation failed!'));
        return;
      }
      resolve(result);
    }
    conn.query(q, params, handler);
  });
