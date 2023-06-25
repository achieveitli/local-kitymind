/*
 * @Author: wyj
 * @Date: 2022-08-08 17:29:36
 * @LastEditTime: 2022-08-10 09:30:06
 * @LastEditors: wyj
 * @Description: 插入白板
 */
(function () {
  const html = `<button class="insert_white_board">插入白板</button>`;
  let allow = true;
  let id;
  $(document.body).append(html);
  $(".insert_white_board").css({
    position: "absolute",
    bottom: 40,
    right: 50,
    color: "#fff",
    background: "rgb(115, 161, 191)",
    padding: "8px 25px",
    zIndex: 999,
    border: "none",
    borderRadius: "4px",
    boxShadow: "0px 0px 3px 3px rgba(115, 161, 191,0.3)",
  });

  $(document).on("click", ".insert_white_board", function (event) {
    event.preventDefault();
    if (!allow) {
      return showTips("tips", "数据提交中,请勿重复点击");
    }
    allow = false;
    https: editor.minder.exportData("png").then(function (content) {
      let blob = dataURLtoBlob(content);
      const json = editor.minder.exportJson();
      const formData = new FormData();
      formData.append("file", blob);
      formData.append("bizType", 4);
      formData.append("foreignId", 0);
      formData.append("fileContent", JSON.stringify(json));
      if (id) {
        formData.append("id", id);
      }
      ajax(
        `${baseUrl}/cloudApi/apiPropagate/web/file/info/addWhiteFileInfo`,
        "post",
        formData,
        function (res) {
          if (res.state === "1") {
            insertWhiteBoard(res.data.filePath, res.data.id);
            showTips("success", res.code);
          } else {
            showTips("error", res.code);
          }
          allow = true;
        }
      );
    });
  });
  // 页面加载完成
  window.onload = function () {
    id = getParams("id");
    id && recoverData(id);
  };
})();

async function insertWhiteBoard(imageUrl, id) {
  await webBrowserObj.InsertWhiteBoard(imageUrl, id);
}

// 根据id获取数据，还原脑图
function recoverData(id) {
  ajax(
    `${baseUrl}/cloudApi/apiPropagate/web/file/info/query/${id}`,
    "get",
    undefined,
    function (res) {
      if (res.state === "1") {
        const json = JSON.parse(res.data.fileContent);
        editor.minder.importJson(json);
      } else {
        showTips("error", res.code);
      }
    }
  );
}

// 获取地址栏参数
function getParams(name) {
  if (!name) return null;
  let after = window.location.search;
  after = after.substring(1) || window.location.hash.split("?")[1];
  if (!after) return null;
  if (after.indexOf(name) === -1) return null;
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  let r = decodeURI(after).match(reg);
  if (!r) return null;
  return r[2];
}

//base64转换为图片blob
function dataURLtoBlob(dataUrl) {
  var arr = dataUrl.split(",");
  //注意base64的最后面中括号和引号是不转译的
  var _arr = arr[1].substring(0, arr[1].length - 2);
  var mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(_arr),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {
    type: mime,
  });
}
