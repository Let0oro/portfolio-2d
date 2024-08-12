
export const flipPaper = (page = 1) => {

  let currentPage = page;
  
  const toggleClass = (elem, toggleClassName) => {
    if(elem.className.includes(toggleClassName)) {
      elem.className = elem.className.replace(' ' + toggleClassName, '');
    } else {
      elem.className += ' ' + toggleClassName;
    }
  }

  return (elem, page) => {
    if (page == currentPage) {
      currentPage+=2;
      toggleClass(elem, "left-side");
      toggleClass(elem.nextElementSibling, "left-side");
    } else if (page == currentPage - 1) {
      currentPage-=2;
      toggleClass(elem, "left-side");
      toggleClass(elem.previousElementSibling, "left-side");
    } else {
      currentPage = 1;
    }
    
  }
}
  
