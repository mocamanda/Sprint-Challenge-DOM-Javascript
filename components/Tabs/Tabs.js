class TabItem {
  constructor(element) {
    this.element = element;
  }

  select() {
    this.element.classList.add("Tabs__item-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__item-selected");
  }
}

class TabLink {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', (event) => {
      event.tabData = this.element.dataset.tab;
    });
  }

  select() {
    this.element.classList.add("Tabs__link-selected");
  }

  deselect() {
    this.element.classList.remove("Tabs__link-selected");
  }
}

class Tabs {
  constructor(element, parent) {  // add parent
    this.element = element;
    this.tabs = parent; // attach parent to object
    // Attaches links with data-tab value as property
    this.tabLink = document.querySelector(`.Tabs__link[data-tab="${element.dataset.tab}"]`);
    this.tabLink = new TabLink(this.tabLink);
    // links of data-tab
    this.links = element.querySelectorAll(".Tabs__link");
    this.links = Array.from(this.links).reduce((obj, link) => {
      obj[link.dataset.tab] = new TabLink(link);
      return obj;
    }, {});

    // Attaches items with data-tab value as property
    this.tabItem = document.querySelector(`.Tabs__item[data-tab="${element.dataset.tab}"]`);
    this.tabItem = new TabItem(this.tabItem);
    // items of data-tab
    this.items = element.querySelectorAll(".Tabs__item");
    this.items = Array.from(this.items).reduce((obj, item) => {
      obj[item.dataset.tab] = new TabItem(item);
      return obj;
    }, {});

    // Listens for a click event in its children or self
    return document.querySelector(`.Tabs__item[data-tab="${data}"]`);
    this.element.addEventListener('click', (event) => {
      if (event.tabData) {
       this.updateActive(event.tabData);
       event.stopPropagation(); 
      }
    })

    this.activeData = element.querySelector(".Tabs__default");
    this.activeData = this.activeData ? this.activeData.dataset.tab : null;
    this.updateActive(this.activeData);
  }

  updateActive(data) {
    if (data === null) return;
    this.links[this.activeData].deselect();
    this.items[this.activeData].deselect();

    this.links[data].select();
    this.items[data].select();
    this.activeData = data;
  }

}

let tabs = document.querySelectorAll(".Tabs");
tabs = Array.from(tabs).map(tabs => new Tabs(tabs));
