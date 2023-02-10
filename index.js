let notificationsUnreadCounter = document.querySelector(".notifications__num");
let notificationsList = document.querySelector(".notifications__list");
let btnMarkAllRead = document.querySelector(".btn-mark-all-read");

function updateStatusAll() {
  notificationsUnreadCounter.textContent = 0;
  for (let child of notificationsList.children) {
    if (child.dataset.status === "unread") {
      updateStatusForScreenReader(child, "unread");
      addUnreadMark(child);
      notificationsUnreadCounter.textContent =
        Number(notificationsUnreadCounter.textContent) + 1;
    } else {
      updateStatusForScreenReader(child, "read");
      updateReadStyle(child);
      removeUnreadMark(child);
    }
  }
}

function updateStatusForScreenReader(elt, status) {
  let para = elt.querySelector(".notification__content p:first-child");
  para.firstElementChild.textContent = `Status: ${status}`;
}

function updateReadStyle(elt) {
  elt.style.backgroundColor = "white";
}

function addUnreadMark(elt) {
  let para = elt.querySelector(".notification__content p:first-child");
  let unreadMark = document.createElement("span");
  unreadMark.classList.add("notification__status-mark");
  unreadMark.setAttribute("aria-hidden", true);
  para.append(unreadMark);
}

function removeUnreadMark(elt) {
  let unreadMark = elt.querySelector(".notification__status-mark");
  if (unreadMark) {
    unreadMark.outerHTML = "";
  }
}

updateStatusAll();

btnMarkAllRead.addEventListener("click", function () {
  for (let child of notificationsList.children) {
    child.dataset.status = "read";
  }
  updateStatusAll();
});
