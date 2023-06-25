/*
 * @Author: wyj
 * @Date: 2022-08-09 13:37:43
 * @LastEditTime: 2022-08-09 15:28:28
 * @LastEditors: wyj
 * @Description:
 */
let i = 0;
function showTips(type, message) {
  i++;
  const html = `<div class="tips ${type} tips-${i}">${message}</div>`;
  $(document.body).append(html);
  $(`.tips-${i}`).css({
    position: "absolute",
    top: -48,
    left: "50%",
    minWidth: "380px",
    transform: "translateX(-50%)",
    color: "#909399",
    background: "#edf2fc",
    border: "1px solid #ebeef5",
    padding: "0 20px",
    height: 48,
    lineHeight: "48px",
    zIndex: 999,
    border: "none",
    borderRadius: "4px",
    transition: "top 0.5s",
  });
  $(`.tips-${i}.success`).css({
    backgroundColor: "#f0f9eb",
    border: "1px solid #e1f3d8",
    color: "#67c23a",
  });
  $(`.tips-${i}.error`).css({
    backgroundColor: "#fef0f0",
    border: "1px solid #fde2e2",
    color: "#f56c6c",
  });
  setTimeout(() => {
    $(`.tips-${i}`).css({ top: (i - 1) * 68 + 20 });
  }, 10);
  setTimeout(() => {
    $(`.tips-${i}`).css({ top: -48 });
  }, 3000);
  setTimeout(() => {
    $(`.tips-${i}`).remove();
    i--;
  }, 4000);
}
