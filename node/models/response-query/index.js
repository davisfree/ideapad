const query = require("../query");

function responseQuery(response, sql, params) {
  query(sql, params)
    .then((results) => {
      response.json({
        status: "ok",
        data: results,
      });
    })
    .catch((error) => {
      response.json({
        status: "err",
        error: error,
      });
    });
}

module.exports = responseQuery;
