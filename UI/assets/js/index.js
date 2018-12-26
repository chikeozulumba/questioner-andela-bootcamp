(function () {
  function togggleSidebar(e) {
    e.preventDefault();
    const sideBar = document.getElementById('sidebar');
    sideBar.classList.toggle('side-active');
    sideBar.classList.toggle('side-hidden');
  }
  const menu = document.getElementById('menu');
  menu.addEventListener('click', togggleSidebar, false);
}());
