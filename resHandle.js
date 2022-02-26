const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

// 資料格式錯誤
exports.errorHandle = function (res) {
  res.writeHead(400, headers)
  res.write(JSON.stringify({
    "status": "false",
    "message": "欄位未填寫正確，或無此 todo id"
  }))
  res.end()
}

// 成功
exports.successHandle = function (res) {
  res.writeHead(200, headers)
  res.write(JSON.stringify({
    "status": "success",
    "data": todos
  }))
  res.end()
}

// 404，無路由
exports.noPathHandle = function (res) {
  res.writeHead(404, headers)
  res.write(JSON.stringify({
    "status": "false",
    "message": "無此網站路由"
  }))
  res.end()
}

exports.optionsHandle = function (res) {
  res.writeHead(200, headers)
  res.end()
}
